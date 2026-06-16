import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit,Output} from '@angular/core';
import { ConfirmationService, MenuItem } from "primeng/api";
import {Course} from "../../../../interface/course.interface";
import {CoursesService} from "../../../../services/courses.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss',
  changeDetection: ChangeDetectionStrategy.Default // По умолчанию для «умного» компонента
})
export class CourseListComponent implements OnInit {
  public courses: Course[] = [];
  searchField: string = "";
  filterCourses: Course[] =[];
  items: MenuItem[] = [];

  constructor(private cdr: ChangeDetectorRef,
              private coursesService: CoursesService,
              private confirmationService: ConfirmationService,
              private router: Router) { }

  public ngOnInit(): void {

    this.items = [
      { icon: 'pi pi-home' },
      { label: 'Курсы' }
    ];
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


  public openAddCourseForm(): void {
    console.log('press ADD')
    this.router.navigate(['/courses/new']);
  }

  public openEditCourseForm(course: Course): void {
    this.router.navigate([`/courses/${course.id}`]);
  }

  public selectCourse(course: Course): void {
    this.openEditCourseForm(course);
  }

  public deleteCourse(course: Course): void {
    this.confirmationService.confirm({
      message: `Вы уверены, что хотите удалить курс ${course.title}?`,
      header: 'Удалить курс?',
      acceptLabel: 'Удалить',
      rejectLabel: 'Отмена',
      accept: () => {
        this.coursesService.remove(course.id);
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

  protected readonly Output = Output;

}
