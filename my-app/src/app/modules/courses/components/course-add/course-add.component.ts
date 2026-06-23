import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Course } from '../../../../interface/course.interface';
import { CoursesService } from '../../../../services/courses.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable, of } from 'rxjs';
import {switchMap} from "rxjs/operators";
import {Author} from "../../../../interface/author";

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseAddComponent implements OnInit {
  @Output() formClosed = new EventEmitter<void>();

  public course: Course = {
    id: 0,
    title: '',
    description: '',
    duration: 0,
    creationDate: new Date(),
    topRated: false,
  };

  public coursesMenu: MenuItem[] = [];
  public isEditing: boolean = false;
  public course$: Observable<Course | null> = of(null);
  public titleHeader: string = "Добавление курса";

  public courseAddForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    duration: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    creationDate: ['', [Validators.required]],
    authors: [[], [Validators.required]]
  });
  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.route.params.subscribe(params => this.course.id = params['id']);
  }

  ngOnInit(): void {
    console.log('CourseAddComponent ngOnInit');
    // Инициализация меню
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
        // Если курс найден, инициализируем форму с данными курса
        this.courseAddForm.patchValue({
          title: course.title,
          description: course.description,
          duration: course.duration,
          creationDate: new Date(this.course.creationDate),
          authors: course.authors
        });
        console.log(course.title)
        console.log(course.authors)

        // Обновляем меню
        this.coursesMenu = [
          { icon: 'pi pi-home' },
          { label: 'Курсы', routerLink: ['/courses'] },
          { label: course.title }
        ];

        console.log('Course data loaded for editing:', course);
      } else {
        // Если курс не найден, инициализируем пустую форму для нового курса
        this.courseAddForm.reset({
          title: '',
          description: '',
          duration: '',
          creationDate: '',
          authors: []
        });

        console.log('No course data found, ready to add new course.');
      }
    });

    // Обновление детектирования изменений
    this.cdr.markForCheck();
  }


  public get title(): FormControl {
    return this.courseAddForm.get('title') as FormControl;
  }

  public get description(): FormControl {
    return this.courseAddForm.get('description') as FormControl;
  }

  public get duration(): FormControl {
    return this.courseAddForm.get('duration') as FormControl;
  }

  public get creationDate(): FormControl {
    return this.courseAddForm.get('creationDate') as FormControl;
  }

  public get authors(): FormControl {
    return this.courseAddForm.get('authors') as FormControl;
  }

  cancel(): void {
    this.router.navigate(['/courses']);
  }

  save(): void {
    // Получение данных из формы
    const courseFormValue = this.courseAddForm.value;

    // Подготовка данных курса
    const course: Course = {
      id: this.course.id,
      title: courseFormValue.title,
      description: courseFormValue.description,
      duration: courseFormValue.duration,
      creationDate: courseFormValue.creationDate,
      authors: courseFormValue.authors
    };

    // Проверка, редактируем ли мы существующий курс или создаем новый
    if (this.course.id > 0) {
      // Обновление существующего курса
      this.coursesService.update(course).subscribe(
        () => {
          console.log('Course updated successfully');
          this.router.navigate(['/courses']);
        },
        error => {
          console.error('Error updating course:', error);
        }
      );
    } else {
      // Создание нового курса
      this.coursesService.getAllCourses().subscribe(courses => {
        const existingIds = courses.map(c => c.id);
        course.id = this.generateUniqueId(existingIds);

        this.coursesService.create(course).subscribe(
          () => {
            console.log('Course created successfully');
            this.router.navigate(['/courses']);
          },
          error => {
            console.error('Error creating course:', error);
          }
        );
      });
    }
  }


  private generateUniqueId(existingIds: number[]): number {
    if (existingIds.length === 0) {
      return 1;
    }
    return Math.max(...existingIds) + 1;
  }

  private createAuthorGroup(author: Author): FormGroup {
    return this.fb.group({
      id: [author.id],
      name: [author.name]
    });
  }

  protected readonly FormControl = FormControl;
}

