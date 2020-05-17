---
id: flow
title: Static type checking with Flow
---


Why do we need static type checking in javascript? With static type checking you can find bugs as you code as opposed to having to run your code in order to find the same bugs. If you are not using static type checking and you are writing react, you hopefully using `prop-types`. This gives you an error in your console when running the code. With flow, you will get this error before running your code. This allows you to code faster 🙂.

Or take the following example: 

```js
 function calculator(a, b, operator) {
   if (operator === '-') {
     return a - b;
   }
   // handle other operators
 }
```

You want to add a possibility to return the absolute value. You decide that it is time to refactor the function to take a single object as argument instead: 

```js
 function calculator({ a, b, operator, absolute = false }) {
   if (operator === '-') {
     const sum = a - b;
     return absolute ? Math.abs(sum) : sum;
   }
   // handle other operators
 }
```

Now you would have to find all places in your code where this function is used and change them. Flow makes this job easier. You would type it like this:

```js
type CalculatorInput = {
  +a: number,
  +b: number,
  +operator: '-' | '+' | '*' | '/',
  +absolute?: boolean,
}
 function calculator({ a, b, operator, absolute = false }: CalculatorInput): number {
   if (operator === '-') {
     const sum = a - b;
     return absolute ? Math.abs(sum) : sum;
   }
   // handle other operators
 }
```