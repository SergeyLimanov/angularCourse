import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CoursesActions from '../actions/courses-actions.actions';
import { CoursesService } from '../../../services/courses.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService
  ) {}


  getCourses$=createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.getCourses),
      switchMap(() =>
        this.coursesService.getCourses(0, 5)
          .pipe(
            map(response => CoursesActions.getCoursesSuccess({ courses: response.courses, total: response.total })),
            catchError(error => of(CoursesActions.getCoursesFailure({ error })))
          ))));

  searchCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.searchCourses),
      switchMap(({ input }) =>
        this.coursesService.getCourses(0, 5, input)  // Параметры поиска и пагинации
          .pipe(
            map(response => CoursesActions.searchCoursesSuccess({ data: response.courses })),
            catchError(error => of(CoursesActions.searchCoursesFailure({ error })))
          )
      )
    )
  );

  addCourse$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.addCourse),
    switchMap(({ course }) => this.coursesService.create(course).pipe(
      map(newCourse => CoursesActions.addCourseSuccess({ course: newCourse })),
      catchError(error => of(CoursesActions.addCourseFailure({ error })))
    ))
  ));

  editCourse$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.editCourse),
    switchMap(({ course }) => this.coursesService.update(course).pipe(
      map(updatedCourse => CoursesActions.editCourseSuccess({ course: updatedCourse })),
      catchError(error => of(CoursesActions.editCourseFailure({ error })))
    ))
  ));

  deleteCourse$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.deleteCourse),
    switchMap(({ id }) => this.coursesService.remove(id).pipe(
      map(() => CoursesActions.deleteCourseSuccess({ id })),
      catchError(error => of(CoursesActions.deleteCourseFailure({ error })))
    ))
  ));


}
