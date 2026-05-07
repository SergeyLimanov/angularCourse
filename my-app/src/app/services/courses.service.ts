import {Injectable, Input} from '@angular/core';
import {Course} from "../interface/course.interface";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  @Input() public course: Course = {} as Course;

  private courses: Course[] = [];

  constructor() { }

  getList(): Course[] {
    return this.courses;
  }

  create(course: Course): void {
    this.courses.push(course);
  }

  getById(id: number): Course | undefined {
    return this.courses.find(course => course.id === id);
  }

  update(course: Course): void {
    const index = this.courses.findIndex(c => c.id === course.id);
    if (index !== -1) {
      this.courses[index] = course;
    }
  }

  remove(id: number): void {
    this.courses = this.courses.filter(course => course.id !== id);
  }
}
