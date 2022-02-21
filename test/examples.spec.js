import Binliner from "../dist";

describe("Binliner", () => {
  it('decision tree', () => {
    // first is required (1)
    // second is optional (10, 11)
    // third is dependent on second (100, 111)
    // fourth changes behaviour (1000: 8, 1110: 14, 1001: 9, 1111: 15)
    let first = () => 1;
    let second = () => 0;
    let third = () => 0;
    let fourth = () => 1;
    let run = (action) => console.log(String(action));

    let valid = true;
    if (!first()) valid = false;
    if ((second()) !== (third())) valid = false;
    if (valid && fourth()) run('line 18');
    if (valid && !fourth()) run('line 19');
    run('line 20');

    let values = [first(), second(), third(), fourth()];
    let bin = new Binliner({size: 4, validation: [8, 9, 14, 15]}, ...values);
    let results = ['this', 'that'];
    if (bin.isValid()) run(results[bin.get(3)]);
    run('line 30');
  });
});
