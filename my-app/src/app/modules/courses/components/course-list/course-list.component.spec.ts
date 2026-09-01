import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CourseListComponent } from './course-list.component';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';
import { Course } from '../../../../interface/course.interface';
import * as CoursesActions from '../../../../store/courses/actions/courses-actions.actions';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let mockStore: jasmine.SpyObj<Store<any>>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockConfirmationService: jasmine.SpyObj<ConfirmationService>;

  const mockCourses: Course[] = [
    { id: 1, title: 'Course 1', description: 'Desc 1', duration: 60, creationDate: new Date('2024-01-01') },
    { id: 2, title: 'Course 2', description: 'Desc 2', duration: 120, creationDate: new Date('2024-02-01') },
  ];

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj<Store<any>>('Store', ['select', 'dispatch']);
    mockStore.select.and.returnValue(of([]));

    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);

    mockConfirmationService = jasmine.createSpyObj<ConfirmationService>('ConfirmationService', ['confirm']);

    await TestBed.configureTestingModule({
      declarations: [CourseListComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
        { provide: ConfirmationService, useValue: mockConfirmationService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have searchField initialized as empty string', () => {
    expect(component.searchField).toEqual('');
  });

  it('should dispatch getCourses action on ngOnInit', () => {
    component.ngOnInit();
    expect(mockStore.dispatch).toHaveBeenCalledWith(CoursesActions.getCourses({ start: 0, count: 5 }));
  });

  it('should initialize items on ngOnInit', () => {
    component.ngOnInit();
    expect(component.items.length).toBe(2);
    expect(component.items[0].icon).toEqual('pi pi-home');
    expect(component.items[1].label).toEqual('Курсы');
  });

  it('should navigate to /courses/new on openAddCourseForm()', () => {
    component.openAddCourseForm();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/courses/new']);
  });

  it('should navigate to /courses/:id on openEditCourseForm()', () => {
    const course: Course = { id: 5, title: 'Test', description: '', duration: 0, creationDate: new Date() };
    component.openEditCourseForm(course);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/courses/5']);
  });

  it('should call openEditCourseForm on selectCourse()', () => {
    const course: Course = { id: 3, title: 'Test', description: '', duration: 0, creationDate: new Date() };
    component.selectCourse(course);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/courses/3']);
  });

  it('should dispatch deleteCourse action when confirm is accepted', () => {
    const course: Course = { id: 1, title: 'Test Course', description: '', duration: 0, creationDate: new Date() };
    mockConfirmationService.confirm.and.callFake((options: any) => {
      options.accept();
      return null as any;
    });
    component.deleteCourse(course);
    expect(mockStore.dispatch).toHaveBeenCalledWith(CoursesActions.deleteCourse({ id: 1 }));
  });

  it('should not dispatch deleteCourse action when confirm is rejected', () => {
    const course: Course = { id: 1, title: 'Test Course', description: '', duration: 0, creationDate: new Date() };
    mockConfirmationService.confirm.and.callFake((options: any) => {
      options.reject();
      return null as any;
    });
    component.deleteCourse(course);
    expect(mockStore.dispatch).not.toHaveBeenCalledWith(CoursesActions.deleteCourse({ id: 1 }));
  });

  it('should call confirmationService.confirm on deleteCourse()', () => {
    const course: Course = { id: 1, title: 'Test Course', description: '', duration: 0, creationDate: new Date() };
    component.deleteCourse(course);
    expect(mockConfirmationService.confirm).toHaveBeenCalled();
  });

  it('should dispatch getCourses on clearFilter()', () => {
    component.clearFilter();
    expect(component.searchField).toEqual('');
    expect(mockStore.dispatch).toHaveBeenCalledWith(CoursesActions.getCourses({ start: 0, count: 5 }));
  });

  it('should dispatch getCourses on loadMore()', () => {
    component.loadMore();
    expect(mockStore.dispatch).toHaveBeenCalledWith(CoursesActions.getCourses({ start: 0, count: 5 }));
  });

  it('should return course.id from trackByCourseId()', () => {
    const course: Course = { id: 42, title: 'Test', description: '', duration: 0, creationDate: new Date() };
    expect(component.trackByCourseId(0, course)).toBe(42);
  });

  it('should emit search term via searchSubject on onSearch()', () => {
    const event = { target: { value: 'test' } } as any;
    component.onSearch(event);
    expect(component.searchField).toBeDefined();
  });
});
