# @sepiariver/binliner-js

Binary sequence validator for JavaScript

Requires @babel/core 7+

## Installation

```cli
npm install @sepiariver/binliner-js
```

## Usage

See [test/examples.spec.js](test/examples.spec.js) for usage examples.

### What is a binary sequence?

It is a series of bits, each of which has a value of either 0 or 1. It is typically used for data transmission, compression or storage, but also can be used for error detection and correction, among other uses. By encapsulating arbitrary boolean conditions using the implicit ordering of numerically-indexed Arrays, Binliner can faciliate complex control flows in a more compact yet still transparent/readable way.

For trivial control flows, Binliner is probably ill-suited, but it can be helpful in more complex cases. It also allows re-use of the condition state.

### Binliner is not

Binliner is not a garbage-collection utility, despite the name. Since it validates a binary sequence against configured rules, it can be said to catch errors aka "garbage".

## Testing

1. Clone this repo
2. `npm install`
3. `npm run test`

## Contributing

Submit pull requests to [https://github.com/sepiariver/binliner/pulls]
