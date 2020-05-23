---
id: other
title: Other notes about flow
---

Some other notes about flow:

## React types

Prefer to use `React.Node` notation instead of `React$Node` notation. In theory, they are the same, but there are bugs with the latter version. See <a rel="noopener noreferrer" target="_blank" href="https://github.com/facebook/flow/issues/8121">this issue</a>

## Object spread and read-only-ness

When you spread objects, the properties looses `read-only-ness`

```js
type A = {| +readOnlyKey: string |}
type B = {| ...A, +otherKey: string |}

function test(x: B) {
  x.readOnlyKey = 'overwrite'; // no error ?
  x.otherKey = 'overwrite'; // no error ??
}
```

To keep `read-only-ness`, you have to use `$ReadOnly<>` for the new object.

```js
type A = {| +readOnlyKey: string |}
type C = $ReadOnly<{| ...A, otherKey: string |}>

function test2(x: C) {
  x.readOnlyKey = 'overwrite'; // error 
  x.otherKey = 'overwrite'; // error
}
```

## Using object as type enum

You can create enum types based on objects: 

```js
const myObject = {a: 'lol', b: 'rofl'};

type Keys = $Keys<typeof myObject>;
  
const key1: Keys = 'a'; // No error
const key2: Keys = 'c'; // Error: Cannot assign `'c'` to `key2` because property `c` is missing in object literal [1]
```

You can do the same for the values: 

```js
const myObject = {a: 'lol', b: 'rofl'};

type Values = $Values<typeof myObject>
  
const value1: Values = 'lol'; // No error
const value2: Values = 'hmm'; // No error 🤔
```

This might not be what we expected, `hmm` is certainly not a value of `myObject`. But we can make it work correctly with one little change: 

```js
const myObject = Object.freeze({a: 'lol', b: 'rofl'});

type Values = $Values<typeof myObject>
  
const value1: Values = 'lol'; // No error
const value2: Values = 'hmm'; // Error: Cannot assign `'hmm'` to `value2` because string [1] is incompatible with enum [2]
```

Now that is better!
