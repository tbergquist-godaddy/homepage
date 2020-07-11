---
id: javascript
title: Javascript
---

Some javascript notes 🙂

## NaN

NaN is a predefined global variable in Javascript. NaN has one special feature, __it does not compare to any other value, including itself__

This means that you can create your own version of the global `isNaN` function like this:

```js
function myIsNaN(x) {
  return x !== x;
}

myIsNaN(2) // => false
myIsNaN(NaN) // => true
myIsNaN(5 - {}) // => true
```

Ensuring you can detect NaN this way was one of the [original reasons](https://stackoverflow.com/questions/1565164/what-is-the-rationale-for-all-comparisons-returning-false-for-ieee754-nan-values/1573715#1573715) for making `NaN === NaN` return false! This was decided before JavaScript even existed. This is a purely historical anecdote, but interesting nonetheless.

## Wrapper objects

Primitive strings in javascript are not objects. For this reason, you cannot mutate a string in javascript. 

```js
let a = '123';
a[0] // => '1'
a[0] = '2' // => '2'
a // => '123'
```

So how come they have properties? Whenever you try to refer to a string property, javascript converts it to a temporary (wrapper) object and performs the operations. 

```js
let a = 'test';
a.len = 4; // new String(a) is done, and that temporary objects property len is set to 4
let t = a.len; // a.len is undefined since the temporary object is discarded
console.log(t); // => undefined
```

String, Number, Boolean and Object have similar wrapper functions.

Also not that the wrapper object does not mutate the string, but it returns a new one. 

```js
let a = 'test';
a.replace('t', 'f') // => 'fest'
console.log(a) // => 'test'
```

## Variable scope and hoisting

Most of `C`-like programming languages has block scope, meaning the variables are not defined outside of the block where they where defined. However javascript does not, javascript has `function scope`, meaning variables are defined within the function where they where defined. 

Javascript also has hoisting of variables, meaning that variables are moved up to the top of their scope and can be used before they are defined. 

```js
function test () {
  console.log(a);
  var a = '5';
  console.log(a);
}
test();
// => undefined
// => '5'
```

Note that the function first logs undefined, then 5. Why?

This is actually converted to 

```js
function test() {
  var a;
  console.log(a);
  a = '5';
  console.log(a);
}
```

So if you are using `var` to declare variables, defining the variables at the top of the scope makes the code easier to understand. 

### let and const

Modern javascript brings in `let` and `const`. These behave differently than `var`. Let and const are `block scoped` rather than functions scoped. 

```js
let x = 1;

if (x === 1) {
  let x = 2;

  console.log(x); // => 2
}

console.log(x); // => 1

```

while using var

```js
var x = 1;

if (x === 1) {
  var x = 2;

  console.log(x); // => 2
}

console.log(x); // => 2
```

So using `let` and `const` instead of `var` makes your code easier to understand and reduce the risk of potential bugs.

### Scope chain

If a variable is not defined within a scope, javascript will look for the variable up the scope chain.

```js
var scope = 'global';
function test() {
  console.log(scope); // => 'global'
}
function test2() {
  console.log(scoped); // => ReferenceError scoped is not defined
}
```
