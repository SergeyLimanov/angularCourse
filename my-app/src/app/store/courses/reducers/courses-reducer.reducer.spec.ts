import { coursesReducer, initialState, State } from './courses-reducer.reducer';
import * as CoursesActions from '../actions/courses-actions.actions';
import { Course } from '../../../interface/course.interface';

describe('coursesReducer', () => {
  const mockCourses: Course[] = [
    { id: 1, title: 'Course 1', description: 'Desc 1', duration: 60, creationDate: new Date('2024-01-01') },
    { id: 2, title: 'Course 2', description: 'Desc 2', duration: 120, creationDate: new Date('2024-02-01') },
  ];

  it('should return the initial state', () => {
    const action = { type: 'NOOP' } as any;
    const state = coursesReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should set loading=true and update pagination on getCourses', () => {
    const action = CoursesActions.getCourses({ start: 0, count: 5 });
    const state = coursesReducer(initialState, action);
    expect(state.loading).toBeTrue();
    expect(state.currentPage).toBe(0);
    expect(state.pageSize).toBe(5);
  });

  it('should set courses, filteredCourses, totalCourses and loading=false on getCoursesSuccess', () => {
    const action = CoursesActions.getCoursesSuccess({ courses: mockCourses, total: 10 });
    const state = coursesReducer(initialState, action);
    expect(state.courses).toEqual(mockCourses);
    expect(state.filteredCourses).toEqual(mockCourses);
    expect(state.totalCourses).toBe(10);
    expect(state.loading).toBeFalse();
  });

  it('should set error and loading=false on getCoursesFailure', () => {
    const action = CoursesActions.getCoursesFailure({ error: 'Test error' });
    const state = coursesReducer(initialState, action);
    expect(state.error).toEqual('Test error');
    expect(state.loading).toBeFalse();
  });

  it('should set loading=true on searchCourses', () => {
    const action = CoursesActions.searchCourses({ input: 'test' });
    const state = coursesReducer(initialState, action);
    expect(state.loading).toBeTrue();
  });

  it('should set filteredCourses and loading=false on searchCoursesSuccess', () => {
    const action = CoursesActions.searchCoursesSuccess({ data: mockCourses });
    const state = coursesReducer(initialState, action);
    expect(state.filteredCourses).toEqual(mockCourses);
    expect(state.loading).toBeFalse();
  });

  it('should set error and loading=false on searchCoursesFailure', () => {
    const action = CoursesActions.searchCoursesFailure({ error: 'Search error' });
    const state = coursesReducer(initialState, action);
    expect(state.error).toEqual('Search error');
    expect(state.loading).toBeFalse();
  });

  it('should set loading=true on addCourse', () => {
    const action = CoursesActions.addCourse({ course: mockCourses[0] });
    const state = coursesReducer(initialState, action);
    expect(state.loading).toBeTrue();
  });

  it('should add course to courses and filteredCourses on addCourseSuccess', () => {
    const action = CoursesActions.addCourseSuccess({ course: mockCourses[0] });
    const state = coursesReducer(initialState, action);
    expect(state.courses.length).toBe(1);
    expect(state.courses[0]).toEqual(mockCourses[0]);
    expect(state.filteredCourses.length).toBe(1);
    expect(state.loading).toBeFalse();
  });

  it('should set error and loading=false on addCourseFailure', () => {
    const action = CoursesActions.addCourseFailure({ error: 'Add error' });
    const state = coursesReducer(initialState, action);
    expect(state.error).toEqual('Add error');
    expect(state.loading).toBeFalse();
  });

  it('should set loading=true on editCourse', () => {
    const action = CoursesActions.editCourse({ course: mockCourses[0] });
    const state = coursesReducer(initialState, action);
    expect(state.loading).toBeTrue();
  });

  it('should update course in courses and filteredCourses on editCourseSuccess', () => {
    const existingState = { ...initialState, courses: mockCourses, filteredCourses: mockCourses };
    const updatedCourse = { ...mockCourses[0], title: 'Updated Title' };
    const action = CoursesActions.editCourseSuccess({ course: updatedCourse });
    const state = coursesReducer(existingState, action);
    expect(state.courses[0].title).toEqual('Updated Title');
    expect(state.filteredCourses[0].title).toEqual('Updated Title');
    expect(state.loading).toBeFalse();
  });

  it('should set error and loading=false on editCourseFailure', () => {
    const action = CoursesActions.editCourseFailure({ error: 'Edit error' });
    const state = coursesReducer(initialState, action);
    expect(state.error).toEqual('Edit error');
    expect(state.loading).toBeFalse();
  });

  it('should set loading=true on deleteCourse', () => {
    const action = CoursesActions.deleteCourse({ id: 1 });
    const state = coursesReducer(initialState, action);
    expect(state.loading).toBeTrue();
  });

  it('should remove course from courses and filteredCourses on deleteCourseSuccess', () => {
    const existingState = { ...initialState, courses: mockCourses, filteredCourses: mockCourses };
    const action = CoursesActions.deleteCourseSuccess({ id: 1 });
    const state = coursesReducer(existingState, action);
    expect(state.courses.length).toBe(1);
    expect(state.courses.find(c => c.id === 1)).toBeUndefined();
    expect(state.filteredCourses.length).toBe(1);
    expect(state.loading).toBeFalse();
  });

  it('should set error and loading=false on deleteCourseFailure', () => {
    const action = CoursesActions.deleteCourseFailure({ error: 'Delete error' });
    const state = coursesReducer(initialState, action);
    expect(state.error).toEqual('Delete error');
    expect(state.loading).toBeFalse();
  });
});
