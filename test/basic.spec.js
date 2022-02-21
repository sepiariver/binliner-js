import Binliner from "../dist";

describe("Binliner", () => {
  it('does basic validation', () => {
    const bin = new Binliner({
      size: 2,
      validation: [1, 2]
    });
    expect(String(bin)).toEqual('00');
    expect(bin.isValid()).toBeFalsy();
    bin.set(0, 1);
    expect(String(bin)).toEqual('10');
    expect(bin.isValid()).toBeTruthy();
    bin.set(1, 1);
    expect(String(bin)).toEqual('11');
    expect(bin.isValid()).toBeFalsy();
    expect(bin.get(1)).toBe(1);
    expect(bin.get(1, 'string')).toBe('1');
    bin.set(0, 0);
    expect(String(bin)).toEqual('01');
    expect(bin.isValid()).toBeTruthy();
  });

  it('set is chainable', () => {
    const bin = new Binliner({
      size: 3,
      validation: [5]
    });
    expect(String(bin)).toEqual('000');
    expect(bin.isValid()).toBeFalsy();
    bin.set(0, 1).set(1, 0).set(2, 1);
    expect(String(bin)).toEqual('101');
    expect(bin.isValid()).toBeTruthy();
    bin.set(0, 1).set(1, 1).set(2, 1);
    expect(String(bin)).toEqual('111');
    expect(bin.isValid()).toBeFalsy();
  });

  it('instantiates without a config', () => {
    let bin = new Binliner(null, 0, '', false);
    expect(String(bin)).toEqual('000');
    expect(bin.isValid()).toBeFalsy();
    bin = new Binliner(null, {}, [], true, 1);
    expect(String(bin)).toEqual('1111');
    expect(bin.isValid()).toBeTruthy(); // default validates all 1's
  });

  it('does basic validation with arguments of different types', () => {
    const config = {
      size: 2,
      validation: [1, 2]
    };
    let bin= new Binliner(config, false, false);
    expect(String(bin)).toEqual('00');
    expect(bin.isValid()).toBeFalsy();
    bin = new Binliner(config, {}, null);
    expect(String(bin)).toEqual('10');
    expect(bin.isValid()).toBeTruthy();
    bin = new Binliner(config, 'true', 'false');
    expect(String(bin)).toEqual('11');
    expect(bin.isValid()).toBeFalsy();
    bin = new Binliner(config, undefined, []);
    expect(String(bin)).toEqual('01');
    expect(bin.isValid()).toBeTruthy();
  });

  it('validates against a number with arguments of different types', () => {
    const config = {
      size: 2,
      validation: 1
    };
    let bin = new Binliner(config, false, false);
    expect(String(bin)).toEqual('00');
    expect(bin.isValid()).toBeFalsy(); // parseInt(bin, 2) !== 1
    bin = new Binliner(config, {}, null);
    expect(String(bin)).toEqual('10');
    expect(bin.isValid()).toBeFalsy();
    bin = new Binliner(config, 'true', 'false');
    expect(String(bin)).toEqual('11');
    expect(bin.isValid()).toBeFalsy();
    bin = new Binliner(config, undefined, []);
    expect(String(bin)).toEqual('01');
    expect(bin.isValid()).toBeTruthy();
  });

  it('validates against a string with arguments of different types', () => {
    const config = {
      size: 2,
      validation: '11'
    };
    let bin = new Binliner(config, false, false);
    expect(String(bin)).toEqual('00');
    expect(bin.isValid()).toBeFalsy();
    bin = new Binliner(config, {}, null);
    expect(String(bin)).toEqual('10');
    expect(bin.isValid()).toBeFalsy();
    bin = new Binliner(config, 'true', 'false');
    expect(String(bin)).toEqual('11');
    expect(bin.isValid()).toBeTruthy();
    bin = new Binliner(config, undefined, []);
    expect(String(bin)).toEqual('01');
    expect(bin.isValid()).toBeFalsy();
  });

  it('validates against a function', () => {
    const config = {
      size: 2,
      validation: (input) => {
        return ((input * 1) > 2)
      },
    };
    let bin = new Binliner(config, false, false);
    expect(String(bin)).toEqual('00');
    expect(bin.isValid()).toBeFalsy();
    bin = new Binliner(config, {}, null);
    expect(String(bin)).toEqual('10');
    expect(bin.isValid()).toBeFalsy();
    bin = new Binliner(config, 'true', 'false');
    expect(String(bin)).toEqual('11');
    expect(bin.isValid()).toBeTruthy();
    bin = new Binliner(config, undefined, []);
    expect(String(bin)).toEqual('01');
    expect(bin.isValid()).toBeFalsy();
  });

  it('validates against an array of different types', () => {
    const config = {
      size: 2,
      validation: ['11', 2],
    };
    let bin = new Binliner(config, false, false);
    expect(String(bin)).toEqual('00');
    expect(bin.isValid()).toBeFalsy();
    bin = new Binliner(config, {}, null);
    expect(String(bin)).toEqual('10'); // parseInt(bin, 2) === 2
    expect(bin.isValid()).toBeTruthy();
    bin = new Binliner(config, 'true', 'false');
    expect(String(bin)).toEqual('11');
    expect(bin.isValid()).toBeTruthy();
    bin = new Binliner(config, undefined, []);
    expect(String(bin)).toEqual('01');
    expect(bin.isValid()).toBeFalsy();
  });

  it('works with size different from argument length', () => {
    const config = {
      size: 5,
      validation: '11010'
    };
    let bin = new Binliner(config, true, true);
    expect(String(bin)).toEqual('11000');
    expect(bin.isValid()).toBeFalsy();
    bin = new Binliner(config, true, true, 0, 1);
    expect(String(bin)).toEqual('11010');
    expect(bin.isValid()).toBeTruthy();
  });

  it('throws', () => {
    const config = {
      size: 2,
      validation: ['11', 2],
    };
    let bin = new Binliner(config, false, false);
    expect(String(bin)).toEqual('00');
    const testFunc = () => {
      bin.set(3, 1);
    }
    expect(testFunc).toThrow('Illegal position: 3');
  });
});
