import { coursesReducer, initialState } from './courses-reducer.reducer';

describe('CoursesReducer Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = coursesReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
