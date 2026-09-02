import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs';

import { GlobalSpinnerComponent } from './global-spinner.component';
import { SpinnerService } from '../../services/spinner.service';

describe('GlobalSpinnerComponent', () => {
  let component: GlobalSpinnerComponent;
  let fixture: ComponentFixture<GlobalSpinnerComponent>;
  let spinnerSubject: Subject<boolean>;

  beforeEach(async () => {
    spinnerSubject = new Subject<boolean>();
    const mockSpinnerService = {
      spinnerState$: spinnerSubject.asObservable()
    };

    await TestBed.configureTestingModule({
      declarations: [GlobalSpinnerComponent],
      providers: [
        { provide: SpinnerService, useValue: mockSpinnerService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have show initially false', () => {
    expect(component.show).toBeFalse();
  });

  it('should update show to true when spinnerState emits true', () => {
    spinnerSubject.next(true);
    expect(component.show).toBeTrue();
  });

  it('should update show to false when spinnerState emits false', () => {
    spinnerSubject.next(true);
    expect(component.show).toBeTrue();
    spinnerSubject.next(false);
    expect(component.show).toBeFalse();
  });
});
