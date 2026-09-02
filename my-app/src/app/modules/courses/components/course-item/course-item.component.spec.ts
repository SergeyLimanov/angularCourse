import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { CourseItemComponent } from './course-item.component';
import { DurationPipe } from '../../../../shared/pipes/duration.pipe';
import { Course } from '../../../../interface/course.interface';

registerLocaleData(localeRu);

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;

  const mockCourse: Course = {
    id: 1,
    title: 'Test Course',
    description: 'Test Description',
    duration: 120,
    creationDate: new Date('2024-01-15'),
    topRated: true,
    authors: [{ id: '1', name: 'Author 1' }],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseItemComponent, DurationPipe],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    component.course = mockCourse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a course Input', () => {
    expect(component.course).toEqual(mockCourse);
  });

  it('should have editCourseEvent EventEmitter', () => {
    expect(component.editCourseEvent).toBeDefined();
    expect(component.editCourseEvent.emit).toBeDefined();
  });

  it('should have deleteCourseEvent EventEmitter', () => {
    expect(component.deleteCourseEvent).toBeDefined();
    expect(component.deleteCourseEvent.emit).toBeDefined();
  });

  it('should emit editCourseEvent with course when editCourse() is called', () => {
    spyOn(component.editCourseEvent, 'emit');
    component.editCourse();
    expect(component.editCourseEvent.emit).toHaveBeenCalledWith(mockCourse);
  });

  it('should emit deleteCourseEvent with course when deleteCourse() is called', () => {
    spyOn(component.deleteCourseEvent, 'emit');
    component.deleteCourse();
    expect(component.deleteCourseEvent.emit).toHaveBeenCalledWith(mockCourse);
  });

  it('should emit the correct course data on edit', () => {
    let emittedCourse: Course | undefined;
    component.editCourseEvent.subscribe((course) => (emittedCourse = course));
    component.editCourse();
    expect(emittedCourse).toEqual(mockCourse);
    expect(emittedCourse?.id).toBe(1);
    expect(emittedCourse?.title).toBe('Test Course');
  });

  it('should emit the correct course data on delete', () => {
    let emittedCourse: Course | undefined;
    component.deleteCourseEvent.subscribe((course) => (emittedCourse = course));
    component.deleteCourse();
    expect(emittedCourse).toEqual(mockCourse);
    expect(emittedCourse?.id).toBe(1);
  });
});
