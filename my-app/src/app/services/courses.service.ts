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

  // Метод для получения всех курсов
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses`)
      .pipe(
        catchError(error => {
          console.error('Error fetching courses', error);
          return throwError(() => new Error('Error fetching courses'));
        })
      );
  }

  // Метод для получения курсов с параметрами поиска
  getCourses(start: number, count: number, searchTerm?: string): Observable<Course[]> {
    let url = `${this.apiUrl}/courses?_start=${start}&_limit=${count}`;
    if (searchTerm) {
      url += `&q=${searchTerm}`; // Параметр поиска
    }
    return this.http.get<Course[]>(url)
      .pipe(
        catchError(error => {
          console.error('Error fetching courses', error);
          return throwError(() => new Error('Error fetching courses'));
        })
      );
  }
  // Создание нового курса
  create(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/courses`, course);
  }

  // Обновление существующего курса
  update(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/courses/${course.id}`, course);
  }

  // Получение курса по ID
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/courses/${id}`);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/courses/${id}`);
  }
}
