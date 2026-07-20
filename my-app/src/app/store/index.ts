import { isDevMode } from '@angular/core';
import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import * as fromCourses from '../store/courses/reducers/courses-reducer.reducer';

export interface State {
  [fromCourses.coursesReducerFeatureKey]: fromCourses.State;
}


export const reducers: ActionReducerMap<State> = {
  [fromCourses.coursesReducerFeatureKey]: fromCourses.reducer,
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
