import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from "../../../../interface/course.interface";
import { CoursesService } from "../../../../services/courses.service";
import { MenuItem } from "primeng/api";
import { Router, ActivatedRoute } from '@angular/router';

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
    title: '',
    description: this.description,
    duration: this.duration,
    creationDate: this.creationDate,
    topRated: false,
  };
  coursesMenu: MenuItem[] = [];

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

   ngOnInit(): void {
     console.log('CourseAddComponent ngOnInit');

     this.coursesMenu = [
      { label: 'Курсы' },
    ];

    console.log('ADD COURSE')

    const courseId = this.route.snapshot.paramMap.get('id');
    console.log('Course ID from route:', courseId);

    if (courseId) {
      const course = this.coursesService.getCourseById(Number(courseId));
      console.log('Course fetched by ID:', course);
      if (course) {
        this.newCourse = { ...course };
        this.description = this.newCourse.description;
        this.duration = this.newCourse.duration;
        this.creationDate = this.newCourse.creationDate;
      }
    }
  }

  // Логика сохранения курса
  save(): void {
    if (this.newCourse.id) {
      // Обновление существующего курса
      this.coursesService.update(this.newCourse);
    } else {
      // Добавление нового курса
      this.coursesService.create(this.newCourse);
    }
    this.router.navigateByUrl("/courses");
  }

  cancel(): void {
    this.formClosed.emit(); // Закрытие формы без сохранения
    this.router.navigate(['/courses']); // Перенаправление на страницу курсов
  }
}
