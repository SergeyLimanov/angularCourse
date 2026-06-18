import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { Course } from '../interface/course.interface';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  getCourses(start: number, count: number): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl + `/courses?_start=${start}&_limit=${count}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching courses', error);
          return throwError(() => new Error('Error fetching courses'));
        })
      );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  create(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  update(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
