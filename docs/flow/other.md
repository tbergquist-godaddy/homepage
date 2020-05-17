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
