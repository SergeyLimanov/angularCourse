import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CourseDurationComponent } from './course-duration.component';
import { DurationPipe } from '../../../../../../shared/pipes/duration.pipe';

describe('CourseDurationComponent', () => {
  let component: CourseDurationComponent;
  let fixture: ComponentFixture<CourseDurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseDurationComponent, DurationPipe],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
