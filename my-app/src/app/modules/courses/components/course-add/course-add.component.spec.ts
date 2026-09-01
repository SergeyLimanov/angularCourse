import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CourseAddComponent } from './course-add.component';
import { CoursesService } from '../../../../services/courses.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';
import { Course } from '../../../../interface/course.interface';

describe('CourseAddComponent', () => {
  let component: CourseAddComponent;
  let fixture: ComponentFixture<CourseAddComponent>;
  let mockCoursesService: jasmine.SpyObj<CoursesService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  const mockCourse: Course = {
    id: 1,
    title: 'Test Course',
    description: 'Test Description',
    duration: 120,
    creationDate: new Date('2024-01-15'),
    topRated: false,
    authors: [{ id: '1', name: 'Author 1' }],
  };

  beforeEach(async () => {
    mockCoursesService = jasmine.createSpyObj<CoursesService>('CoursesService', [
      'getCourseById',
      'getAllCourses',
      'create',
      'update',
    ]);
    mockCoursesService.getCourseById.and.returnValue(of(mockCourse));
    mockCoursesService.getAllCourses.and.returnValue(of([mockCourse]));
    mockCoursesService.create.and.returnValue(of(mockCourse));
    mockCoursesService.update.and.returnValue(of(mockCourse));

    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);

    mockActivatedRoute = {
      params: of({ id: '0' }),
      paramMap: of({
        get: () => null,
      }),
    };

    await TestBed.configureTestingModule({
      declarations: [CourseAddComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: CoursesService, useValue: mockCoursesService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        FormBuilder,
        ChangeDetectorRef,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseAddComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with title, description, duration, creationDate, authors controls', () => {
    expect(component.courseAddForm.contains('title')).toBeTrue();
    expect(component.courseAddForm.contains('description')).toBeTrue();
    expect(component.courseAddForm.contains('duration')).toBeTrue();
    expect(component.courseAddForm.contains('creationDate')).toBeTrue();
    expect(component.courseAddForm.contains('authors')).toBeTrue();
  });

  it('should have empty initial values for a new course', () => {
    expect(component.courseAddForm.get('title')?.value).toEqual('');
    expect(component.courseAddForm.get('description')?.value).toEqual('');
    expect(component.courseAddForm.get('duration')?.value).toEqual('');
    expect(component.courseAddForm.get('creationDate')?.value).toEqual('');
    expect(component.courseAddForm.get('authors')?.value).toEqual([]);
  });

  it('should have title control with required and maxLength(50) validators', () => {
    const titleControl = component.courseAddForm.get('title');
    expect(titleControl?.hasError('required')).toBeTrue();
    titleControl?.setValue('a'.repeat(51));
    expect(titleControl?.hasError('maxlength')).toBeTrue();
    titleControl?.setValue('Valid Title');
    expect(titleControl?.valid).toBeTrue();
  });

  it('should have description control with required and maxLength(500) validators', () => {
    const descControl = component.courseAddForm.get('description');
    expect(descControl?.hasError('required')).toBeTrue();
    descControl?.setValue('a'.repeat(501));
    expect(descControl?.hasError('maxlength')).toBeTrue();
    descControl?.setValue('Valid Description');
    expect(descControl?.valid).toBeTrue();
  });

  it('should have duration control with required and pattern validators', () => {
    const durationControl = component.courseAddForm.get('duration');
    expect(durationControl?.hasError('required')).toBeTrue();
    durationControl?.setValue('abc');
    expect(durationControl?.hasError('pattern')).toBeTrue();
    durationControl?.setValue('120');
    expect(durationControl?.valid).toBeTrue();
  });

  it('should have creationDate control with required validator', () => {
    const dateControl = component.courseAddForm.get('creationDate');
    expect(dateControl?.hasError('required')).toBeTrue();
    dateControl?.setValue(new Date('2024-01-15'));
    expect(dateControl?.valid).toBeTrue();
  });

  it('should have authors control with required validator', () => {
    const authorsControl = component.courseAddForm.get('authors');
    expect(authorsControl?.hasError('required')).toBeTrue();
    authorsControl?.setValue([{ id: '1', name: 'Author 1' }]);
    expect(authorsControl?.valid).toBeTrue();
  });

  it('should return title FormControl from getter', () => {
    expect(component.title).toBe(component.courseAddForm.get('title') as any);
  });

  it('should return description FormControl from getter', () => {
    expect(component.description).toBe(component.courseAddForm.get('description') as any);
  });

  it('should return duration FormControl from getter', () => {
    expect(component.duration).toBe(component.courseAddForm.get('duration') as any);
  });

  it('should return creationDate FormControl from getter', () => {
    expect(component.creationDate).toBe(component.courseAddForm.get('creationDate') as any);
  });

  it('should return authors FormControl from getter', () => {
    expect(component.authors).toBe(component.courseAddForm.get('authors') as any);
  });

  it('should call router.navigate on cancel()', () => {
    component.cancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/courses']);
  });

  it('should call coursesService.create on save() for new course', () => {
    component.course.id = 0;
    component.courseAddForm.patchValue({
      title: 'New Course',
      description: 'New Description',
      duration: '60',
      creationDate: new Date('2024-06-01'),
      authors: [{ id: '1', name: 'Author 1' }],
    });

    component.save();

    expect(mockCoursesService.getAllCourses).toHaveBeenCalled();
    expect(mockCoursesService.create).toHaveBeenCalled();
  });

  it('should call coursesService.update on save() for existing course', () => {
    component.course.id = 5;
    component.courseAddForm.patchValue({
      title: 'Updated Course',
      description: 'Updated Description',
      duration: '90',
      creationDate: new Date('2024-06-01'),
      authors: [{ id: '1', name: 'Author 1' }],
    });

    component.save();

    expect(mockCoursesService.update).toHaveBeenCalled();
  });

  it('should set isEditing to false for new course (no id)', () => {
    expect(component.isEditing).toBeFalse();
  });

  it('should have titleHeader "Добавление курса" initially', () => {
    expect(component.titleHeader).toEqual('Добавление курса');
  });

  it('should initialize coursesMenu on ngOnInit', () => {
    expect(component.coursesMenu.length).toBeGreaterThan(0);
    expect(component.coursesMenu[0].icon).toEqual('pi pi-home');
  });

  it('should generate unique id correctly', () => {
    component.course.id = 0;
    component.courseAddForm.patchValue({
      title: 'New',
      description: 'Desc',
      duration: '30',
      creationDate: new Date('2024-06-01'),
      authors: [{ id: '1', name: 'Author 1' }],
    });

    component.save();

    expect(mockCoursesService.create).toHaveBeenCalled();
    const createdCourse = mockCoursesService.create.calls.mostRecent().args[0];
    expect(createdCourse.id).toBeGreaterThan(0);
  });
});
