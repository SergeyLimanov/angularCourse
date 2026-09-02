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

  it('should have duration input initialized', () => {
    expect(component.duration).toEqual([]);
  });

  it('should emit durationChange on onDurationChange()', () => {
    let emittedValue: any;
    component.durationChange.subscribe(value => emittedValue = value);
    component.duration = 120;
    component.onDurationChange({} as any);
    expect(emittedValue).toBe(120);
  });

  it('should call ngOnInit without errors', () => {
    expect(() => component.ngOnInit()).not.toThrow();
  });
});
