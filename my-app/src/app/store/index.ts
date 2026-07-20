import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromCourses from '../store/courses/reducers/courses-reducer.reducer';

export interface State {
  [fromCourses.coursesReducerFeatureKey]: fromCourses.CoursesState;
}

export const reducers: ActionReducerMap<State> = {
  [fromCourses.coursesReducerFeatureKey]: fromCourses.coursesReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
