![node](https://github.com/sepiariver/binliner-js/actions/workflows/node.js.yml/badge.svg)

# @sepiariver/binliner-js

Binary sequence validator for JavaScript

Requires @babel/core 7+

## About

### What is it?

Binliner is like a factory for [state machines](https://en.wikipedia.org/wiki/Finite-state_machine). Given the parameter `config.size`, an instance is endowed with a finite number of possible states, which may be configured as valid, to the exclusion of all other states, using the `config.validation` parameter.

The `isValid()` method returns a boolean: whether the current state is one of those configured as valid, like an [Acceptor](https://en.wikipedia.org/wiki/Finite-state_machine#Acceptors). The instance can be coerced into a `string` or `number` returning the respective representation of the state, like a [Classifier](https://en.wikipedia.org/wiki/Finite-state_machine#Classifiers). This output can be mapped to another set of values that serve a particular business case—the implementation on the whole then acting like a [Moore machine](https://en.wikipedia.org/wiki/Moore_machine).

By passing a function to `config.validation`, Binliner's deterministic behaviour can be side-stepped, introducing side-effects or any other custom validation logic required. At that point, Binliner's utility might be brought into question, although it does seem to help elucidate complex conditional logic.

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

const config = {
    size: 4,
    validation: ['1010', '1011', '1111']
}
const binliner = new Binliner(
    config,
    ofAge,
    needsRetest,
    validLicense,
    passedTest
);

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

See [test/examples.spec.js](test/examples.spec.js) for more.

## Testing

1. Clone this repo
2. `npm install`
3. `npm run test`

## Contributing

Submit pull requests to [https://github.com/sepiariver/binliner-js/pulls]
