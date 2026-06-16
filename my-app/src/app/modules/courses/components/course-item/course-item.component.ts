import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Course} from "../../../../interface/course.interface";

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrl: './course-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush // Презентационный компонент
})
export class CourseItemComponent {
  @Input() course!: Course;
  @Output() editCourseEvent = new EventEmitter<Course>();
  @Output() deleteCourseEvent = new EventEmitter<Course>();

  public editCourse(): void {
    this.editCourseEvent.emit(this.course);
  }

  public deleteCourse(): void {
    this.deleteCourseEvent.emit(this.course);
  }
}
