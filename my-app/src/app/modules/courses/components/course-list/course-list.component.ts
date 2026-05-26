import {
  AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef,
  Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges
} from '@angular/core';
import { ConfirmationService, MenuItem } from "primeng/api";
import {Course} from "../../../../interface/course.interface";
import {CoursesService} from "../../../../services/courses.service";
import {FilterPipe} from "../../../../shared/pipes/filter.pipe";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss'
})
export class CourseListComponent implements OnChanges, OnInit, DoCheck, AfterContentInit,
  AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
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
    // Получаем данные курсов при инициализации компонента
    this.coursesService.getCourses().subscribe(
      data => {
        this.courses = data;
        console.log('Courses:', this.courses); // Для проверки, можно удалить
      },
      error => {
        console.error('Error fetching courses', error);
      }
    );
    this.filterCourses = this.courses;
  }

  //Вызывается при изменении входных свойств компонента
  ngOnChanges(changes: SimpleChanges): void {}

  ngDoCheck(): void {}

  ngAfterContentInit(): void {}

  ngAfterContentChecked(): void {}

  ngAfterViewInit(): void {}

  ngAfterViewChecked(): void {}

  ngOnDestroy(): void {}

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
        this.coursesService.getCourses().subscribe(
          data => {
            this.courses = data;
            this.filterCourses = this.courses;
          }
        );
      },
      reject: () => {},
    });
  }

  public searchClick(): void {
    console.log(this.searchField);
    this.filterCourses = this.filterPipe.transform(this.courses, this.searchField);

  }

  public clearFilter(): void {
    this.searchField = "";
    this.filterCourses = this.filterPipe.transform(this.courses, this.searchField);
    this.cdr.detectChanges();
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  public loadMore(): void {
    console.log("load more");
  }

}
