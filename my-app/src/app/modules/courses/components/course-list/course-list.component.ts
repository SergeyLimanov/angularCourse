import {
  AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef,
  Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges
} from '@angular/core';
import { ConfirmationService, MenuItem } from "primeng/api";
import {Course} from "../../../../interface/course.interface";
import {CoursesService} from "../../../../services/courses.service";
import {FilterPipe} from "../../../../shared/pipes/filter.pipe";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss',
  changeDetection: ChangeDetectionStrategy.Default // По умолчанию для «умного» компонента
})
export class CourseListComponent {
  public courses: Course[] = [];
  searchField: string = "";
  filterCourses: Course[] =[];
  items: MenuItem[] = [];
  private filterPipe = new FilterPipe();


  constructor(private cdr: ChangeDetectorRef,
              private coursesService: CoursesService,
              private confirmationService: ConfirmationService) { }

//Вызывается после инициализации компонента.
  public ngOnInit(): void {
    this.items = [
      { icon: 'pi pi-home' }, // Добавление иконки домика
      { label: 'Курсы' }
    ];
    // Загрузка курсов
    this.coursesService.getCourses().subscribe(
      data => {
        this.courses = data;
        this.filterCourses = this.courses;
        this.cdr.markForCheck();
      },
      error => {
        console.error('Error fetching courses', error);
      }
    );
  }


  public selectCourse(course: Course): void {
    console.log(course)
  }

  public deleteCourse(course: Course): void {
    this.confirmationService.confirm({
      message: `Вы уверены, что хотите удалить курс ${course.title}?`,
      header: 'Удалить курс?',
      acceptLabel: 'Удалить',
      rejectLabel: 'Отмена',
      accept: () => {
        this.coursesService.remove(course.id);
        // Локальное удаление курса
        this.courses = this.courses.filter(c => c.id !== course.id);
        this.filterCourses = this.courses.filter(course =>
          course.title.toLowerCase().includes(this.searchField.toLowerCase())
        );
        this.cdr.detectChanges();
      },
      reject: () => {},
    });
  }


  public searchClick(): void {
    console.log(this.searchField);
    // Применяем фильтр по названию курса
    this.filterCourses = this.courses.filter(course =>
      course.title.toLowerCase().includes(this.searchField.toLowerCase())
    );
  }

  public clearFilter(): void {
    this.searchField = "";
    this.filterCourses = this.courses;
    this.cdr.detectChanges();
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  public loadMore(): void {
    console.log("load more");
  }

}
