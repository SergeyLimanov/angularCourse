import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;

  beforeEach(() => {
    pipe = new OrderByPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return original value if not an array', () => {
    expect(pipe.transform(null as any, 'name')).toEqual(null as any);
    expect(pipe.transform(undefined as any, 'name')).toEqual(undefined as any);
    expect(pipe.transform({} as any, 'name')).toEqual({} as any);
  });

  it('should sort array ascending by field', () => {
    const data = [{ id: 3 }, { id: 1 }, { id: 2 }];
    const result = pipe.transform(data, 'id', 'asc');
    expect(result[0].id).toBe(1);
    expect(result[1].id).toBe(2);
    expect(result[2].id).toBe(3);
  });

  it('should sort array descending by field', () => {
    const data = [{ id: 1 }, { id: 3 }, { id: 2 }];
    const result = pipe.transform(data, 'id', 'desc');
    expect(result[0].id).toBe(3);
    expect(result[1].id).toBe(2);
    expect(result[2].id).toBe(1);
  });

  it('should default to ascending order', () => {
    const data = [{ id: 3 }, { id: 1 }, { id: 2 }];
    const result = pipe.transform(data, 'id');
    expect(result[0].id).toBe(1);
  });

  it('should sort by string field', () => {
    const data = [{ name: 'Charlie' }, { name: 'Alice' }, { name: 'Bob' }];
    const result = pipe.transform(data, 'name', 'asc');
    expect(result[0].name).toBe('Alice');
    expect(result[1].name).toBe('Bob');
    expect(result[2].name).toBe('Charlie');
  });

  it('should handle equal values', () => {
    const data = [{ id: 1, name: 'A' }, { id: 1, name: 'B' }];
    const result = pipe.transform(data, 'id', 'asc');
    expect(result.length).toBe(2);
  });
});
