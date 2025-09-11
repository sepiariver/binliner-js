![node](https://github.com/sepiariver/binliner-js/actions/workflows/node.js.yml/badge.svg)

# @sepiariver/binliner-js

Binary sequence validator for JavaScript.

## Breaking Changes in v2.0.0

- Binliner is now an extension of the native `Array` class. This means that all `Array` methods are available on Binliner instances.
- The `size` property has been removed. The standard `length` property of the Array class is used instead. The length can be set by passing a number as the first argument to the constructor (just like `new Array(number)`).
- Removed support for passing a config object to the constructor. The constructor now only accepts values representing the binary sequence (they are coerced into Boolean when evaluating). Use `setValidation()` to set validation rules.
- The `value` property has been removed. Use `String(instance)` or `Number(instance)` to get the string or number representation of the binary sequence.
- The `juggle()` method no longer takes an input value, only a `type` argument. It operates on the instance's current state.
- The `isValid()` method no longer takes an input value. It operates on the instance's current state.
- The `get()` method no longer accepts a second argument to specify the return type. It always returns a Boolean.

## About

### What is it?

Binliner extends the native `Array` class to encapsulate a sequence of binary flags (boolean values) that can be validated against a set of rules. The rules are configured as either an `Array` of strings or numbers, a single string or number, or a function that returns a boolean. The sequence can be manipulated using the inherited `Array` methods, as well as the `set()` and `get()` methods provided by Binliner.

The `isValid()` method returns a boolean: whether the current state is one of those configured as valid.

The instance can be coerced into a `string` or `number` returning the respective representation of the state:

- `string`: a binary string the same length as the instance's length
- `number`: the base-10 integer value of the binary string

By passing a function to `setValidation()`, Binliner's deterministic behaviour can be side-stepped, introducing side-effects or any other custom validation logic required. At that point, Binliner's utility might be brought into question, although it can help organize or clarify complex decision trees.

### What it is not

Binliner is not a garbage-collection utility, despite the name. It "lines up" binary flags in a sequence, and since it validates the sequence against configured rules, it can be said to catch errors aka "catch garbage" like a binliner :)

### What is a binary sequence?

It is a series of bits, each of which has a value of either 0 or 1. It is typically used for data transmission, compression or storage, but also can be used for error detection and correction, among other uses. By encapsulating arbitrary boolean conditions using the implicit ordering of numerically-indexed Arrays, Binliner can faciliate complex control flows in a more compact yet still transparent/readable way.

For trivial control flows, Binliner is probably ill-suited, but it can be helpful in more complex cases. It also allows re-use of the condition state.

## Installation

```cli
npm install @sepiariver/binliner-js
```

## Usage

### Example

> If Bob's age is less than 21, reject. If his age is 21 to 65, check his license, and reject if invalid. If he is over 65 and has a valid license, re-test. If he fails the test, or lacks a valid license, reject.

Note: this example is not intended to condone ageism

```js
import Binliner from 'binliner-js';

let bob = {
    // define bob
};
const ofAge = (bob.age > 20);               // Postiion 0 in the sequence
const needsRetest = (bob.age > 65);         // Position 1
const validLicense = (bob.license.valid);   // Position 2
const passedTest = (bob.test.results > 60); // Position 3

/**
 * Truth table
 * ofAge | needsRetest | validLicense | passedTest
 * 1 | 0 | 1 | 0 // of age, valid license, test result irrelevant
 * 1 | 0 | 1 | 1 // of age, valid license, test result irrelevant
 * 1 | 1 | 1 | 1 // of age, valid license, passed test
 *
 * ALL OTHER STATES ARE INVALID 
 */

const valid = ['1010', '1011', '1111'];
const binliner = new Binliner(
    ofAge,
    needsRetest,
    validLicense,
    passedTest
); // Instantiate like an Array

binliner.setValidation(valid); // Set valid states

if (!binliner.isValid()) {
    // Reject
    throw 'Invalid state!';
}
// Just for convenience you can reason about parseInt(binliner.value, 2);
if (Number(binliner) < 12) {
    // Accept
    return true;
}
// The only remaining valid state is '1111'
return handlePassedRetest(bob);
```

## Testing

1. Clone this repo
2. `npm install`
3. `npm run test`

## Contributing

Submit pull requests to [https://github.com/sepiariver/binliner-js/pulls]
