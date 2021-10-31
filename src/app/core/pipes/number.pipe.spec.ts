import { NumberPipe } from '../pipes/number.pipe';

describe('NumberPipe', () => {
  let sut: NumberPipe;

  beforeEach(() => {
    sut = new NumberPipe();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  describe('transform', () => {
    it('should transform number to default localString', () => {
      expect(sut.transform(1000)).toEqual('1.000');
    });

    it('should transform number to en localString', () => {
      expect(sut.transform(1000, 'en')).toEqual('1,000');
    });
  });
});
