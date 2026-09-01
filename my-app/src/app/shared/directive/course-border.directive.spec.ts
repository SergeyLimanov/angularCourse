import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CourseBorderDirective } from './course-border.directive';
import { Course } from '../../interface/course.interface';

@Component({
  template: `<div appCourseBorder [course]="course">
    <div class="p-card">Card content</div>
  </div>`,
})
class TestHostComponent {
  course: Course = {} as Course;
}

describe('CourseBorderDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseBorderDirective, TestHostComponent],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should set green border for fresh course (within 14 days)', () => {
    const recentDate = new Date();
    recentDate.setDate(recentDate.getDate() - 5);

    component.course = {
      id: 1,
      title: 'Test',
      description: '',
      duration: 60,
      creationDate: recentDate,
    };

    fixture.detectChanges();

    const childEl = fixture.nativeElement.querySelector('.p-card');
    expect(childEl.style.border).toContain('green');
  });

  it('should set blue border for upcoming course (future date)', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 10);

    component.course = {
      id: 1,
      title: 'Test',
      description: '',
      duration: 60,
      creationDate: futureDate,
    };

    fixture.detectChanges();

    const childEl = fixture.nativeElement.querySelector('.p-card');
    expect(childEl.style.border).toContain('blue');
  });

  it('should not set any border for old course (older than 14 days)', () => {
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 30);

    component.course = {
      id: 1,
      title: 'Test',
      description: '',
      duration: 60,
      creationDate: oldDate,
    };

    fixture.detectChanges();

    const childEl = fixture.nativeElement.querySelector('.p-card');
    expect(childEl.style.border).toBe('');
  });
});
