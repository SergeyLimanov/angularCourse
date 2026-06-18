import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from "../../../../interface/course.interface";
import { CoursesService } from "../../../../services/courses.service";
import { MenuItem } from "primeng/api";
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

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
  course$!: Observable<Course | undefined>;

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('CourseAddComponent ngOnInit');

    this.coursesMenu = [
      { icon: ' pi pi-home' },
      { label: 'Курсы' , routerLink: ['/courses']},
    ];

    console.log('ADD COURSE')

    const courseId = this.route.snapshot.paramMap.get('id');

    if (courseId) {
      this.course$ = this.coursesService.getCourseById(Number(courseId));
      this.course$.subscribe(course => {
        if (course) {
          this.newCourse = { ...course };
          this.description = this.newCourse.description;
          this.duration = this.newCourse.duration;
          this.creationDate = this.newCourse.creationDate;
          this.coursesMenu.push({ label: this.newCourse.title });
        }
      });
    }
  }

  save(): void {
    if (this.newCourse.id) {
      this.coursesService.update(this.newCourse);
    } else {
      this.coursesService.create(this.newCourse);
    }
    this.router.navigateByUrl("/courses");
  }

  cancel(): void {
    this.formClosed.emit();
    this.router.navigate(['/courses']);
  }
}

