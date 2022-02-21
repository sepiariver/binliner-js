import Binliner from "../dist";
import equal from 'fast-deep-equal';

describe("Binliner", () => {
  it('handles verbose control flows transparently', () => {
    const messages = {
      'verbose': [],
      'binliner': [],
    }
    const doThing = (ns, thing) => messages[ns].push(String(thing));

    const verboseFlow = (first, second, third, fourth) => {
      let valid;
      let ns = 'verbose';
      if (!first) {
        valid = false; // first is required
        return valid;
      }
      if (!second && third) {
        valid = false; // third depends on second
        return valid;
      }
      if (second && !third) {
        valid = false; // third depends on second
        return valid;
      }
      if (second && third) {
        valid = true;
        doThing(ns, 'second and third are both true, continue');
      }
      if (!second && !third) {
        valid = true;
        doThing(ns, 'second and third are both false, continue');
      }
      if (fourth) {
        doThing(ns, 'fourth is true, return foo = bar');
        return {
          valid,
          foo: 'bar'
        };
      } else {
        doThing(ns, 'fourth is false, return foo = baz');
        return {
          valid,
          foo: 'baz'
        };
      }
    };

    const binLinerFlow = (first, second, third, fourth) => {
      let valid;
      let ns = 'binliner';
      const bin = new Binliner({ // Represent conditions as binary stream: 1000, 1001, etc.
        validation: [8, 9, 14, 15] // Arbitrary validation rules
      }, first, second, third, fourth);
      if (!bin.isValid()) {
        valid = false; // capture all invalid cases
        return valid;
      }
      if (Number(bin) > 10) { // 1110: 14, 1111: 15
        doThing(ns, 'second and third are both true, continue');
      } else {                // 1000: 8, 1001: 9
        doThing(ns, 'second and third are both false, continue');
      }
      if (bin.get(3) === 0) { // 1000: 8, 1110: 14
        doThing(ns, 'fourth is false, return foo = baz');
        return {
          valid,
          foo: 'baz'
        };
      } else {                // 1001: 9, 1111: 15
        doThing(ns, 'fourth is true, return foo = bar');
        return {
          valid,
          foo: 'bar'
        };
      }
    }

    /**
     * Truth table:
     * first | second | third | fourth | valid | foo
     * 1  | 0   | 0  | 0   | true  | baz
     * 1  | 0   | 0  | 1   | true  | bar
     * 1  | 1   | 1  | 0   | true  | baz
     * 1  | 1   | 1  | 1   | true  | bar
     * 
     * Any other conditions are invalid.
     */
    expect(verboseFlow(false, true, true, true)).toBeFalsy();
    expect(verboseFlow(true, true, false, true)).toBeFalsy();
    expect(verboseFlow(true, false, true, true)).toBeFalsy();
    expect(verboseFlow(true, true, true, true)).toBeTruthy();
    expect(verboseFlow(true, false, false, false)).toBeTruthy();

    expect(binLinerFlow(false, true, true, true)).toBeFalsy();
    expect(binLinerFlow(true, true, false, true)).toBeFalsy();
    expect(binLinerFlow(true, false, true, true)).toBeFalsy();
    expect(binLinerFlow(true, true, true, true)).toBeTruthy();
    expect(binLinerFlow(true, false, false, false)).toBeTruthy();
    expect(equal(messages['verbose'], messages['binliner'])).toBeTruthy();
  });
});
