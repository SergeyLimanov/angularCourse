import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromCourses  from '../reducers/courses-reducer.reducer';
import {State} from "../reducers/courses-reducer.reducer";

// Создание feature selector для получения части состояния курсов
const getCoursesFeatureState =
  createFeatureSelector<fromCourses.State>(fromCourses.coursesReducerFeatureKey);

export const selectTotalCourses = createSelector(
  getCoursesFeatureState,
  (state) => state.totalCourses
);

export const selectCurrentPage = createSelector(
  getCoursesFeatureState,
  (state) => state.currentPage
);

export const selectPageSize = createSelector(
  getCoursesFeatureState,
  (state) => state.pageSize
);
// Селектор для получения списка всех курсов
export const selectAllCourses = createSelector(
  getCoursesFeatureState,
  (state) => state.courses
);

// Селектор для получения ошибки при загрузке курсов
export const selectCoursesError = createSelector(
  getCoursesFeatureState,
  (state) => state.error
);

// Селектор для получения состояния загрузки курсов
export const selectLoading = createSelector(
  getCoursesFeatureState,
  (state) => state.loading
);
