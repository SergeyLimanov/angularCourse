import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { Course } from '../interface/course.interface';
import {catchError, map} from "rxjs/operators";
import {Author} from "../interface/author";

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

  public getCoursesList(limit = 4, page = 1): Observable<Course[]> {
    return this.http.get<Array<Course>>(`${this.apiUrl}/courses?_page=${page}&_limit=${limit}`)
  }


  // Метод для получения курсов с параметрами поиска
  public searchCourses(string: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses/?q=${string}`)
  }



  getCourses(start: number = 0, count: number = 10, searchTerm?: string): Observable<{ courses: Course[], total: number }> {
    let url = `${this.apiUrl}/courses?_start=${start}&_limit=${count}`;
    if (searchTerm) {
      url += `&q=${searchTerm}`; // Параметр поиска
    }
    return this.http.get<Course[]>(url, { observe: 'response' })
      .pipe(
        map(response => {
          const total = response.headers.get('X-Total-Count');
          return {
            courses: response.body || [],
            total: total ? +total : 0  // Проверка и использование значения по умолчанию
          };
        }),
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

  getAuthors(): Observable<Array<Author>> {
    console.log(this.http.get<Array<Author>>(`${this.apiUrl}/authors`))
    return this.http.get<Array<Author>>(`${this.apiUrl}/authors`)
  }

}
