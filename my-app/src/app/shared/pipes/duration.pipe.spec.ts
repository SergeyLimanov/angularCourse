import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  let pipe: DurationPipe;

  beforeEach(() => {
    pipe = new DurationPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return minutes only for duration less than 60', () => {
    expect(pipe.transform(30)).toEqual('30минут');
  });

  it('should return hours and minutes for duration >= 60', () => {
    expect(pipe.transform(90)).toEqual('1час(а) 30минут');
  });

  it('should return 0 minutes for 0 duration', () => {
    expect(pipe.transform(0)).toEqual('0минут');
  });

  it('should handle exactly 60 minutes', () => {
    expect(pipe.transform(60)).toEqual('1час(а) 0минут');
  });

  it('should handle 120 minutes', () => {
    expect(pipe.transform(120)).toEqual('2час(а) 0минут');
  });

  it('should handle 125 minutes', () => {
    expect(pipe.transform(125)).toEqual('2час(а) 5минут');
  });

  it('should handle large duration', () => {
    expect(pipe.transform(600)).toEqual('10час(а) 0минут');
  });
});
