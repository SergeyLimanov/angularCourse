import { createAction, props } from '@ngrx/store';
import {Course} from "../../../interface/course.interface";

export const getCourses = createAction('[Courses] Load Courses');
export const getCoursesSuccess = createAction('[Courses] Load Courses Success', props<{ courses: Course[] }>());
export const getCoursesFailure = createAction('[Courses] Load Courses Failure', props<{ error: any }>());

export const searchCourses = createAction('[Courses] Search Courses', props<{ input: string }>());
export const searchCoursesSuccess = createAction('[Courses] Search Courses Success', props<{ data: Course[] }>());
export const searchCoursesFailure = createAction('[Courses] Search Courses Failure', props<{ error: any }>());


export const addCourse = createAction('[Courses] Add Course', props<{ course: Course }>());
export const addCourseSuccess = createAction('[Courses] Add Course Success', props<{ course: Course }>());
export const addCourseFailure = createAction('[Courses] Add Course Failure', props<{ error: any }>());

export const editCourse = createAction('[Courses] Edit Course', props<{ course: Course }>());
export const editCourseSuccess = createAction('[Courses] Edit Course Success', props<{ course: Course }>());
export const editCourseFailure = createAction('[Courses] Edit Course Failure', props<{ error: any }>());

export const deleteCourse = createAction('[Courses] Delete Course', props<{ id: number }>());
export const deleteCourseSuccess = createAction('[Courses] Delete Course Success', props<{ id: number }>());
export const deleteCourseFailure = createAction('[Courses] Delete Course Failure', props<{ error: any }>());

