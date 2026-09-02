import {
  selectAllCourses,
  selectCoursesError,
  selectLoading,
  selectTotalCourses,
  selectCurrentPage,
  selectPageSize
} from './courses-selectors.selectors';
import { State, coursesReducerFeatureKey } from '../reducers/courses-reducer.reducer';

 describe('CoursesSelectors Selectors', () => {
  const mockState: { [coursesReducerFeatureKey]: State } = {
    [coursesReducerFeatureKey]: {
      courses: [{ id: 1, title: 'Test', description: '', duration: 60, creationDate: new Date('2024-01-01') }],
      filteredCourses: [],
      loading: true,
      error: 'Test error',
      totalCourses: 10,
      currentPage: 2,
      pageSize: 5,
    }
  };

  it('should select all courses', () => {
    const result = selectAllCourses(mockState as any);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe(1);
  });

  it('should select loading state', () => {
    const result = selectLoading(mockState as any);
    expect(result).toBeTrue();
  });

  it('should select error state', () => {
    const result = selectCoursesError(mockState as any);
    expect(result).toEqual('Test error');
  });

  it('should select total courses', () => {
    const result = selectTotalCourses(mockState as any);
    expect(result).toBe(10);
  });

  it('should select current page', () => {
    const result = selectCurrentPage(mockState as any);
    expect(result).toBe(2);
  });

  it('should select page size', () => {
    const result = selectPageSize(mockState as any);
    expect(result).toBe(5);
  });
});
