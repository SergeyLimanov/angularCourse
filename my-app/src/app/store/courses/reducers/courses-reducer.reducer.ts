import { createReducer, on } from '@ngrx/store';
import * as CoursesActions from '../actions/courses-actions.actions';
import {Course} from "../../../interface/course.interface";

export const coursesReducerFeatureKey = 'coursesStates';

export interface CoursesState {
  courses: Course[];
  filteredCourses: Course[];
  loading: boolean;
  error: any;
}

export const initialState: CoursesState = {
  courses: [],
  filteredCourses: [],
  loading: false,
  error: null
};

export const coursesReducer = createReducer(
  initialState,
  on(CoursesActions.getCourses, state => ({ ...state, loading: true })),
  on(CoursesActions.getCoursesSuccess, (state, { courses }) => ({...state, courses, filteredCourses: courses, loading: false})),
  on(CoursesActions.getCoursesFailure, (state, { error }) => ({...state, error, loading: false})),

  on(CoursesActions.searchCourses, state => ({ ...state, loading: true })),
  on(CoursesActions.searchCoursesSuccess, (state, { data }) => ({...state, filteredCourses: data, loading: false})),
  on(CoursesActions.searchCoursesFailure, (state, { error }) => ({...state, error, loading: false})),

  on(CoursesActions.addCourse, state => ({ ...state, loading: true })),
  on(CoursesActions.addCourseSuccess, (state, { course }) => ({...state, courses: [...state.courses, course], filteredCourses: [...state.filteredCourses, course], loading: false})),
  on(CoursesActions.addCourseFailure, (state, { error }) => ({...state, error, loading: false})),

  on(CoursesActions.editCourse, state => ({ ...state, loading: true })),
  on(CoursesActions.editCourseSuccess, (state, { course }) => ({...state, courses: state.courses.map(c => c.id === course.id ? course : c), filteredCourses: state.filteredCourses.map(c => c.id === course.id ? course : c), loading: false})),
  on(CoursesActions.editCourseFailure, (state, { error }) => ({...state, error, loading: false})),

  on(CoursesActions.deleteCourse, state => ({ ...state, loading: true })),
  on(CoursesActions.deleteCourseSuccess, (state, { id }) => ({...state, courses: state.courses.filter(c => c.id !== id), filteredCourses: state.filteredCourses.filter(c => c.id !== id), loading: false})),
  on(CoursesActions.deleteCourseFailure, (state, { error }) => ({...state, error, loading: false}))
);
