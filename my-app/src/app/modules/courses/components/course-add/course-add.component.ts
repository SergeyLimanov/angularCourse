import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Course } from '../../../../interface/course.interface';
import { CoursesService } from '../../../../services/courses.service';
import { MenuItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default //не заполнялись данные с онпуш
})
export class CourseAddComponent implements OnInit {
  @Output() formClosed = new EventEmitter<void>();

  newCourse: Course = {
    id: 0,
    title: '',
    description: '',
    duration: 0,
    creationDate: new Date(),
    topRated: false,
  };
  coursesMenu: MenuItem[] = [];
  isEditing: boolean = false;
  course$: Observable<Course | null> = of(null);

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('CourseAddComponent ngOnInit');

    this.coursesMenu = [
      { icon: 'pi pi-home' },
      { label: 'Курсы', routerLink: ['/courses'] },
    ];

    this.course$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          const numericId = +id;
          if (!isNaN(numericId)) {
            this.isEditing = true;
            console.log(`Editing course with ID: ${numericId}`);
            return this.coursesService.getCourseById(numericId);
          } else {
            console.error('Invalid course ID:', id);
            return of(null);
          }
        } else {
          this.isEditing = false;
          console.log('Adding new course');
          return of(null);
        }
      })
    );

    this.course$.subscribe(course => {
      if (course) {
        this.newCourse = { ...course };
        this.newCourse.creationDate = new Date(this.newCourse.creationDate);
        console.log('New Course Object:', this.newCourse);
        // Создание нового массива для обновления. с .push() не сработало
        this.coursesMenu = [
          { icon: 'pi pi-home' },
          { label: 'Курсы', routerLink: ['/courses'] },
          { label: this.newCourse.title }
        ];
        console.log('Updated Courses Menu:', this.coursesMenu);
      } else {
        this.newCourse = {
          id: 0,
          title: '',
          description: '',
          duration: 0,
          creationDate: new Date(),
          topRated: false
        };
        console.log('No course data found, ready to add new course.');
      }
    });
    this.cdr.markForCheck();
  }

  private generateUniqueId(existingIds: number[]): number {
    if (existingIds.length === 0) {
      return 1; // Начать с 1, если нет существующих ID
    }
    return Math.max(...existingIds) + 1;
  }

  save(): void {
    if (this.newCourse.id) {
      console.log('Updating course:', this.newCourse);
      this.coursesService.update(this.newCourse).subscribe(() => {
        console.log('Course updated successfully');
        this.router.navigate(['/courses']);
      }, error => {
        console.error('Error updating course:', error);
      });
    } else {
      this.coursesService.getAllCourses().subscribe(courses => {
        const existingIds = courses.map(course => course.id);
        this.newCourse.id = this.generateUniqueId(existingIds);

        console.log('Creating new course with ID:', this.newCourse.id);
        this.coursesService.create(this.newCourse).subscribe(() => {
          console.log('Course created successfully');
          this.router.navigate(['/courses']);
        }, error => {
          console.error('Error creating course:', error);
        });
      });
    }
  }

  cancel(): void {
    console.log('Form cancelled');
    this.formClosed.emit();
    this.router.navigate(['/courses']);
  }
}
