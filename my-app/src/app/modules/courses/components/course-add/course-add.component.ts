import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Course } from "../../../../interface/course.interface";
import { CoursesService } from "../../../../services/courses.service";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseAddComponent implements OnInit {
  @Input() courseToEdit: Course | null = null;
  @Output() formClosed = new EventEmitter<void>();

  description: string = '';
  duration: number = 0;
  creationDate: Date = new Date();
   newCourse: Course = {
    id: 0,
    title: "",
    description: this.description,
    duration: this.duration,
    creationDate: this.creationDate,
    topRated: false,
   };
  coursesMenu: MenuItem[] = [];

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    console.log('courseToEdit:', this.courseToEdit);
    this.coursesMenu = [
      { label: 'Курсы',  },
    ];
  }

  // Логика сохранения курса
  save(): void {
    if (this.courseToEdit) {
      // Логика для обновления существующего курса
    } else {
      // Логика для добавления нового курса
    }
    console.log('Course saved:', this.newCourse);
    console.log('Курс сохранён с продолжительностью:', this.duration);
    this.formClosed.emit(); // Закрытие формы после сохранения

  }

  cancel(): void {
    this.formClosed.emit(); // Закрытие формы без сохранения
  }

}
