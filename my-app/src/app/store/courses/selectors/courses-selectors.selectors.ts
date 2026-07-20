import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from '../../index'; // Ваш корневой state
import {coursesReducerFeatureKey, CoursesState} from '../reducers/courses-reducer.reducer';

// Создание feature selector для получения части состояния курсов
const getCoursesFeatureState =
  createFeatureSelector<State, CoursesState>(coursesReducerFeatureKey);

// Селектор для получения списка всех курсов
export const selectAllCourses = createSelector(
  getCoursesFeatureState,
  (state: CoursesState) => state.courses
);

// Селектор для получения ошибки при загрузке курсов
export const selectCoursesError = createSelector(
  getCoursesFeatureState,
  (state: CoursesState) => state.error
);

// Селектор для получения состояния загрузки курсов
export const selectLoading = createSelector(
  getCoursesFeatureState,
  (state: CoursesState) => state.loading
);
