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

## Type conversion

Javascript will perform type conversion when doing operations. This means that

```js
3 + '3' // => '33', number is converted to string, and string concatenation is performed
3 + true // => 4, since true is converted to 1, and 3 + 1 is performed
3 - '3' // => 0, '3' is converted to 3.
```

For objects it is a bit more complex, but conversion will happen in the following order.

- If the object has a `toString()` method, this will be called and converted to a string.
- If the object does not have a `toString` method, js will call `valueOf`
- If the object has none of the above methods, javascript will throw an Error.

This means that you can have some unexpected comparisons like this: 

```js
var a = {toString: function() {return '3'}}
a == '3' // => true
a === '3' // => false, you should always use `strict equals`
```


## Invocation expressions and This

An _invocation expression_ is javascript syntax for calling a function or method. Every invocation expression includes a pair of parenthesis and an expression before the open parenthesis. If that expression is a property access expression (`A property access expression evaluates to the value of an object property or an array element`) then it is known as _method invocation_. In method invocation, the object or array that is the subject of the property access becomes the subject of `this`. Consider this example: 

```js
var name = 'John Doe';
var family = {
  name: 'Washington',
  getName: function () {
    return this.name;
  }
}

// family is the subject of the property access, hence this = family.
family.getName(); // => 'Washington'
var getName = family.getName;
// This is the same as window.getName(), so window is the subject of the property access, hence this = window
getName(); // => 'Jon Doe'
```

## All numbers are floating point numbers

In javascript all numbers are floating point numbers, so doing division on two integers actually returns a floating point number. `5 / 2 = 2.5`;

For the same reason, working with decimals in javascript is a bit unpredictable. `0.1 + 0.2 === 0.3 // => false`. Note that this is not specific for javascript only. You should therefore considers something like [decimal.js](https://www.npmjs.com/package/decimal.js) when working decimals.

