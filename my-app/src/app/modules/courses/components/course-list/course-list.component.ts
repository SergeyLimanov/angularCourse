import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem } from "primeng/api";
import { Course } from "../../../../interface/course.interface";
import { CoursesService } from "../../../../services/courses.service";
import { Router } from "@angular/router";
import {debounceTime, filter, Subject} from "rxjs";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush //Переделала для оптимизации
})
export class CourseListComponent implements OnInit {
  public courses: Course[] = [];
  public filterCourses: Course[] = [];
  public searchField: string = "";
  public items: MenuItem[] = [];
  private start: number = 0;
  private count: number = 5;
  private totalCourses: number = 0; // Общее количество курсов
  public hasMoreCourses: boolean = true; // Для проверки наличия дополнительных курсов
  private searchSubject: Subject<string> = new Subject<string>();

  constructor(
    private cdr: ChangeDetectorRef,
    private coursesService: CoursesService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.items = [
      { icon: 'pi pi-home' },
      { label: 'Курсы' }
    ];
    // Подписка на изменения в поле поиска
    this.searchSubject.pipe(
      debounceTime(300), // Задержка для предотвращения частых запросов
      filter(searchTerm => searchTerm.length >= 3 || searchTerm.length === 0), // Фильтрация ввода
      switchMap(searchTerm => {
        this.start = 0; // Сброс start при новом поиске
        this.courses = []; // Очищаем текущий список курсов
        return this.coursesService.getCourses(this.start, this.count, searchTerm);
      })
    ).subscribe(data => {
      console.log('Загружено курсов:', data.length);
      if (data.length < this.count) { this.hasMoreCourses = false; }
      const newCourses = data.filter(course =>
        !this.courses.some(existingCourse => existingCourse.id === course.id)
      );

      this.courses = [...this.courses, ...newCourses];
      this.filterCourses = this.courses.filter(course =>
        course.title.toLowerCase().includes(this.searchField.toLowerCase()) ||
        course.description.toLowerCase().includes(this.searchField.toLowerCase())
      );
      this.start += this.count;
      console.log('Обновленный список курсов:', this.courses);
      this.cdr.markForCheck();
    }, error => {
      console.error('Error fetching courses', error);
    });
    this.loadCourses();
  }

  onSearch(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value;
    this.searchField = searchTerm;
    this.searchSubject.next(searchTerm);
  }

  loadCourses(): void {
    console.log('Начало загрузки курсов с start:', this.start);

    this.coursesService.getCourses(this.start, this.count, this.searchField).subscribe(data => {
      console.log('Загружено курсов:', data.length);

      if (data.length < this.count) {this.hasMoreCourses = false;}
      const newCourses = data.filter(course =>
        !this.courses.some(existingCourse => existingCourse.id === course.id)
      );

      this.courses = [...this.courses, ...newCourses];
      this.filterCourses = this.courses.filter(course =>
        course.title.toLowerCase().includes(this.searchField.toLowerCase()) ||
        course.description.toLowerCase().includes(this.searchField.toLowerCase())
      );
      this.start += this.count;
      console.log('Обновленный список курсов:', this.courses);
      this.cdr.markForCheck();
    }, error => {
      console.error('Error fetching courses', error);
    });
  }


  openAddCourseForm(): void {
    this.router.navigate(['/courses/new']);
  }

  openEditCourseForm(course: Course): void {
    this.router.navigate([`/courses/${course.id}`]);
  }

  selectCourse(course: Course): void {
    this.openEditCourseForm(course);
  }

  deleteCourse(course: Course): void {
    this.confirmationService.confirm({
      message: `Вы уверены, что хотите удалить курс ${course.title}?`,
      header: 'Удалить курс?',
      acceptLabel: 'Удалить',
      rejectLabel: 'Отмена',
      accept: () => {
        this.coursesService.remove(course.id).subscribe(() => {
          this.courses = this.courses.filter(c => c.id !== course.id);
          this.filterCourses = this.courses.filter(course =>
            course.title.toLowerCase().includes(this.searchField.toLowerCase())
          );
          this.cdr.detectChanges();
        });
      },
      reject: () => { },
    });
  }

  searchClick(): void {
    this.start = 0; // Сброс start при новом поиске
    this.courses = []; // Очищаем текущий список курсов
    this.loadCourses(); // Загружаем курсы с учетом нового поискового запроса
  }

  clearFilter(): void {
    this.searchField = "";
    this.start = 0; // Сброс start
    this.courses = []; // Очищаем текущий список курсов
    this.loadCourses(); // Загружаем курсы без фильтра
    this.cdr.detectChanges();
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  loadMore(): void {
    if (this.hasMoreCourses) {
      this.loadCourses();
    }
  }
}
