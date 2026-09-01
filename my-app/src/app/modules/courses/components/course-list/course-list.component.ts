import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import {combineLatestWith, debounceTime, filter, Observable, of, Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from '../../../../interface/course.interface';
import * as CoursesActions from '../../../../store/courses/actions/courses-actions.actions';
import { State } from '../../../../store/courses/reducers/courses-reducer.reducer';
import {
  selectAllCourses,
  selectLoading,
  selectCoursesError,
  selectTotalCourses,
  selectCurrentPage,
  selectPageSize
} from '../../../../store/courses/selectors/courses-selectors.selectors';
import {Router} from "@angular/router";
import {ConfirmationService, MenuItem} from "primeng/api";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseListComponent implements OnInit {
  public courses$: Observable<Course[]> = of([]);  // Инициализация как пустой массив
  public loading$: Observable<boolean>;
  public error$: Observable<any>;
  public searchField: string = '';
  public items: MenuItem[] = [];
  private searchSubject: Subject<string> = new Subject<string>();
  public totalCourses$: Observable<number>;
  public currentPage$: Observable<number>;
  public pageSize$: Observable<number>;

  public showLoadMore$: Observable<boolean>;  // Добавьте это свойство
  public hasCourses$: Observable<boolean> ;

  constructor(
    private store: Store<State>,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {
    this.courses$ = this.store.select(selectAllCourses).pipe(
      map(courses => courses || [])
    );
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectCoursesError);
    this.totalCourses$ = this.store.select(selectTotalCourses);
    this.currentPage$ = this.store.select(selectCurrentPage);
    this.pageSize$ = this.store.select(selectPageSize);
    this.hasCourses$ = this.courses$.pipe(
      map(courses => (courses && courses.length > 0))
    );
    // Создание observable для вычисления, нужно ли показывать кнопку загрузки
    this.showLoadMore$ = this.totalCourses$.pipe(
      combineLatestWith(this.currentPage$, this.pageSize$),
      map(([totalCourses, currentPage, pageSize]) => {
        return totalCourses > (currentPage || 0) * (pageSize || 0);
      })
    );
  }

  ngOnInit(): void {
    this.items = [
      { icon: 'pi pi-home' },
      { label: 'Курсы' }
    ];

    console.log(this.hasCourses$)
    this.searchSubject.pipe(
      debounceTime(300),
      filter(searchTerm => searchTerm.length >= 3 || searchTerm.length === 0)
    ).subscribe(searchTerm => {
      this.searchField = searchTerm;
      this.store.dispatch(CoursesActions.searchCourses({ input: searchTerm }));
    });

    this.store.dispatch(CoursesActions.getCourses({ start: 0, count: 5 }));
  }

  onSearch(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value;
    this.searchSubject.next(searchTerm);
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
        this.store.dispatch(CoursesActions.deleteCourse({ id: course.id }));
      },
      reject: () => { }
    });
  }

  clearFilter(): void {
    this.searchField = '';
    this.store.dispatch(CoursesActions.getCourses({ start: 0, count: 5 }));
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  loadMore(): void {
    this.store.dispatch(CoursesActions.getCourses({ start: 0, count: 5 }));
  }
}
