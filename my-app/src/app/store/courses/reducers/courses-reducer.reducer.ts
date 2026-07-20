import { createReducer, on } from '@ngrx/store';
import {Course} from "../../../interface/course.interface";
import * as fromCoursesActions from '../actions/courses-actions.actions';

export const coursesReducerFeatureKey = 'coursesStates';

export interface State {
  isLoading: boolean;
  courses: Course[];
  allCourses: Course[];
  courseId: number | null;
}


export const initialState: State = {
  isLoading: false,
  courses: [],
  allCourses: [],
  courseId: null
};


export const reducer = createReducer(
  initialState,
  on(fromCoursesActions.getCourses, fromCoursesActions.searchCourses, fromCoursesActions.editCourse, fromCoursesActions.deleteCourse, fromCoursesActions.addCourse, (state) => ({ ...state, isLoading: true })),
  on(fromCoursesActions.getCoursesSuccess, fromCoursesActions.searchCoursesSuccess, (state, { data }) => ({ ...state, courses: [...data], isLoading: false })),
  on(fromCoursesActions.getCoursesFailure, fromCoursesActions.searchCoursesFailure, fromCoursesActions.deleteCourseFailure, fromCoursesActions.addCourseFailure, fromCoursesActions.editCourseFailure, fromCoursesActions.deleteCourseFailure, (state) => ({ ...state, isLoading: false })),
  on(fromCoursesActions.deleteCourseSuccess, (state, { courseId }) => ({...initialState})),
  on(fromCoursesActions.addCourseSuccess, (state, { course }) => ({...state, allCourses: [...state.courses, course], isLoading: false})),
  on(fromCoursesActions.editCourseSuccess, (state, { course }) => ({...state, courses: state.courses.map(c => c.id === course.id ? course : c), isLoading: false})),
  on(fromCoursesActions.clearCourses, (state) => ({ ...initialState })),
);

export function authReducerFeatureKey<T>(authReducerFeatureKey: any) {
  throw new Error('Function not implemented.');
}

