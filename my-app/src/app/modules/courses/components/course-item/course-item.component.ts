import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { Course } from "../../../../interface/course.interface";

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // Используем OnPush стратегию для «глупого» компонента
})
export class CourseItemComponent {
  @Input() public course: Course = {} as Course;
  @Output() public editCourseEvent: EventEmitter<Course> = new EventEmitter<Course>();
  @Output() public deleteCourseEvent: EventEmitter<Course> = new EventEmitter<Course>();

  public editCourse(): void {
    this.editCourseEvent.emit(this.course);
  }

  public deleteCourse(): void {
    this.deleteCourseEvent.emit(this.course);
  }
}
