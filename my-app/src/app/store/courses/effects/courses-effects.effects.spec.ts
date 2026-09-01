import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';

import { CoursesEffects } from './courses-effects.effects';
import { CoursesService } from '../../../services/courses.service';
import * as CoursesActions from '../actions/courses-actions.actions';
import { Course } from '../../../interface/course.interface';

describe('CoursesEffects', () => {
  let actions$: Observable<any>;
  let effects: CoursesEffects;
  let mockCoursesService: jasmine.SpyObj<CoursesService>;

  const mockCourses: Course[] = [
    { id: 1, title: 'Course 1', description: 'Desc 1', duration: 60, creationDate: new Date('2024-01-01') },
    { id: 2, title: 'Course 2', description: 'Desc 2', duration: 120, creationDate: new Date('2024-02-01') },
  ];

  beforeEach(() => {
    mockCoursesService = jasmine.createSpyObj<CoursesService>('CoursesService', [
      'getCourses',
      'create',
      'update',
      'remove',
    ]);

    TestBed.configureTestingModule({
      providers: [
        CoursesEffects,
        provideMockActions(() => actions$),
        { provide: CoursesService, useValue: mockCoursesService },
      ],
    });

    effects = TestBed.inject(CoursesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should dispatch getCoursesSuccess on getCourses action', () => {
    const action = CoursesActions.getCourses({ start: 0, count: 5 });
    const completion = CoursesActions.getCoursesSuccess({ courses: mockCourses, total: 2 });

    actions$ = hot('-a', { a: action });
    const response = cold('-b|', { b: { courses: mockCourses, total: 2 } });
    mockCoursesService.getCourses.and.returnValue(response);

    const expected = cold('--b', { b: completion });
    expect(effects.getCourses$).toBeObservable(expected);
    expect(mockCoursesService.getCourses).toHaveBeenCalledWith(0, 5);
  });

  it('should dispatch getCoursesFailure on getCourses error', () => {
    const action = CoursesActions.getCourses({ start: 0, count: 5 });
    const error = 'Network error';
    const completion = CoursesActions.getCoursesFailure({ error });

    actions$ = hot('-a', { a: action });
    const response = cold('-#|', {}, error);
    mockCoursesService.getCourses.and.returnValue(response);

    const expected = cold('--b', { b: completion });
    expect(effects.getCourses$).toBeObservable(expected);
  });

  it('should dispatch searchCoursesSuccess on searchCourses action', () => {
    const action = CoursesActions.searchCourses({ input: 'test' });
    const completion = CoursesActions.searchCoursesSuccess({ data: mockCourses });

    actions$ = hot('-a', { a: action });
    const response = cold('-b|', { b: { courses: mockCourses, total: 2 } });
    mockCoursesService.getCourses.and.returnValue(response);

    const expected = cold('--b', { b: completion });
    expect(effects.searchCourses$).toBeObservable(expected);
    expect(mockCoursesService.getCourses).toHaveBeenCalledWith(0, 5, 'test');
  });

  it('should dispatch searchCoursesFailure on searchCourses error', () => {
    const action = CoursesActions.searchCourses({ input: 'test' });
    const error = 'Search error';
    const completion = CoursesActions.searchCoursesFailure({ error });

    actions$ = hot('-a', { a: action });
    const response = cold('-#|', {}, error);
    mockCoursesService.getCourses.and.returnValue(response);

    const expected = cold('--b', { b: completion });
    expect(effects.searchCourses$).toBeObservable(expected);
  });

  it('should dispatch addCourseSuccess on addCourse action', () => {
    const newCourse: Course = { id: 3, title: 'New', description: 'New Desc', duration: 30, creationDate: new Date() };
    const action = CoursesActions.addCourse({ course: newCourse });
    const completion = CoursesActions.addCourseSuccess({ course: newCourse });

    actions$ = hot('-a', { a: action });
    const response = cold('-b|', { b: newCourse });
    mockCoursesService.create.and.returnValue(response);

    const expected = cold('--b', { b: completion });
    expect(effects.addCourse$).toBeObservable(expected);
    expect(mockCoursesService.create).toHaveBeenCalledWith(newCourse);
  });

  it('should dispatch addCourseFailure on addCourse error', () => {
    const newCourse: Course = { id: 3, title: 'New', description: 'New Desc', duration: 30, creationDate: new Date() };
    const action = CoursesActions.addCourse({ course: newCourse });
    const error = 'Create error';
    const completion = CoursesActions.addCourseFailure({ error });

    actions$ = hot('-a', { a: action });
    const response = cold('-#|', {}, error);
    mockCoursesService.create.and.returnValue(response);

    const expected = cold('--b', { b: completion });
    expect(effects.addCourse$).toBeObservable(expected);
  });

  it('should dispatch editCourseSuccess on editCourse action', () => {
    const course: Course = { id: 1, title: 'Updated', description: 'Updated Desc', duration: 90, creationDate: new Date() };
    const action = CoursesActions.editCourse({ course });
    const completion = CoursesActions.editCourseSuccess({ course });

    actions$ = hot('-a', { a: action });
    const response = cold('-b|', { b: course });
    mockCoursesService.update.and.returnValue(response);

    const expected = cold('--b', { b: completion });
    expect(effects.editCourse$).toBeObservable(expected);
    expect(mockCoursesService.update).toHaveBeenCalledWith(course);
  });

  it('should dispatch editCourseFailure on editCourse error', () => {
    const course: Course = { id: 1, title: 'Updated', description: 'Updated Desc', duration: 90, creationDate: new Date() };
    const action = CoursesActions.editCourse({ course });
    const error = 'Update error';
    const completion = CoursesActions.editCourseFailure({ error });

    actions$ = hot('-a', { a: action });
    const response = cold('-#|', {}, error);
    mockCoursesService.update.and.returnValue(response);

    const expected = cold('--b', { b: completion });
    expect(effects.editCourse$).toBeObservable(expected);
  });

  it('should dispatch deleteCourseSuccess on deleteCourse action', () => {
    const action = CoursesActions.deleteCourse({ id: 1 });
    const completion = CoursesActions.deleteCourseSuccess({ id: 1 });

    actions$ = hot('-a', { a: action });
    const response = cold('-b|', { b: null });
    mockCoursesService.remove.and.returnValue(response);

    const expected = cold('--b', { b: completion });
    expect(effects.deleteCourse$).toBeObservable(expected);
    expect(mockCoursesService.remove).toHaveBeenCalledWith(1);
  });

  it('should dispatch deleteCourseFailure on deleteCourse error', () => {
    const action = CoursesActions.deleteCourse({ id: 1 });
    const error = 'Delete error';
    const completion = CoursesActions.deleteCourseFailure({ error });

    actions$ = hot('-a', { a: action });
    const response = cold('-#|', {}, error);
    mockCoursesService.remove.and.returnValue(response);

    const expected = cold('--b', { b: completion });
    expect(effects.deleteCourse$).toBeObservable(expected);
  });
});
