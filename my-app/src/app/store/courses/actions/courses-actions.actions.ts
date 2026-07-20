import { props, createAction } from '@ngrx/store';
import {Course} from "../../../interface/course.interface";


export const getCourses = createAction(
  '[Courses] Get Courses',
  props<{ limit?: number }>()
);

export const getCoursesSuccess = createAction(
  '[Courses] Get Courses Success',
  props<{ data: Course[] }>()
);

export const getCoursesFailure = createAction(
  '[Courses] Get Courses Failure',
  props<{ error: any }>()
);

export const searchCourses = createAction(
  '[Courses] Search Courses',
  props<{ input: string }>()
);

export const searchCoursesSuccess = createAction(
  '[Courses] Search Courses Success',
  props<{ data: Course[] }>()
);

export const searchCoursesFailure = createAction(
  '[Courses] Search Courses Failure',
  props<{ error: any }>()
);

export const deleteCourse = createAction(
  '[Courses] Delete Courses',
  props<{ courseId: number }>()
);

export const deleteCourseSuccess = createAction(
  '[Courses] Delete Courses Success',
  props<{ courseId: number }>()
);

export const deleteCourseFailure = createAction(
  '[Courses] Delete Courses Failure',
  props<{ error: any }>()
);

export const addCourse = createAction(
  '[Courses] Add Courses',
  props<{ course: Course }>()
);

export const addCourseSuccess = createAction(
  '[Courses] Add Courses Success',
  props<{ course: Course }>()
);

export const addCourseFailure = createAction(
  '[Courses] Add Courses Failure',
  props<{ error: any }>()
);
export const editCourse = createAction(
  '[Courses] Edit Courses',
  props<{ course: Course }>()
);

export const editCourseSuccess = createAction(
  '[Courses] Edit Courses Success',
  props<{ course: Course }>()
);

export const editCourseFailure = createAction(
  '[Courses] Edit Courses Failure',
  props<{ error: any }>()
);
export const clearCourses = createAction(
  '[Courses] Clear Courses State'
);
