---
id: types-first
title: Types first
---

By default, flow doesn't require too much typing. Flow will infer your types, meaning that if you have a code like 

```js
function myInput(a) {
  return `${a}!`
}

myInput('ok');
```

flow will infer that `a` is string and that the return type of `myInput` is string. When you have code that loads other modules, these types also needs to be inferred. This consumes time and memory, sometimes causing your IDE to go into 🛫mode. 

When you activate types first, you will need to add a lot more typing, but it greatly increases the speed and lowers the memory consumption of your typechecks. You can activate it like this:

```
experimental.types_first=true
experimental.well_formed_exports=true
```

Now, how much more typing is it? These are some examples of what needs to be typed and what does not need to be:

```jsx
export function TestDiv(): React.Element<'div'> {
  return <div>test</div>;
}

export function VoidFunction() {
  // Void functions doesn't need to be typed
}
// Some simple values doesn't need typing either
export const myObject = {
  a: 'a',
  b: 123,
  c: { d: 1 },
};
export const myString = 'lol';
export const myNumber = 123;
export const myBool = true;

// Graphql queries
export const query: GraphQLTaggedNode = graphql`
  query typesFirstQuery @relay_test_operation {
    ... on RootQuery {
      __typename
    }
  }
`;

// both parameter and return type needs to be typed
export function increase(input: number): number {
  return input + 1;
}

// Note that the class itself does not need to be typed
export class MyClass {
  // value must be typed
  value: string;
  constructor() {
    this.value = 'lol';
  }

  // Class functions must be typed
  classFunction(): string {
    return this.value;
  }

  // Arrow functions must be typed
  arrowFunction: () => string = () => {
    return this.value;
  };
}
```

If you have problems typing your exports, flow can try to help you(though manual is recommended). You can run this command: 

```
yarn flow autofix exports --in-place --force <path_to_your_file>
```

I would recommend that you use types first for any new projects, but what if you want to turn it on for an existing project? Flow has an adoption strategy, so you don't have to type it all at once. For gradual migration add this to your `.flowconfig`

```
experimental.types_first=false
experimental.well_formed_exports=true
experimental.well_formed_exports.whitelist=<PROJECT_ROOT>/src/folder1
experimental.well_formed_exports.whitelist=<PROJECT_ROOT>/src/folder2
```