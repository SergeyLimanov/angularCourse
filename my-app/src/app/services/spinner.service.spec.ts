import { TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { SpinnerService } from './spinner.service';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial spinner state as false', () => {
    let state: boolean | undefined;
    service.spinnerState$.pipe(take(1)).subscribe(s => state = s);
    expect(state).toBeFalse();
  });

  it('should set spinner state to true on show()', () => {
    service.show();
    let state: boolean | undefined;
    service.spinnerState$.pipe(take(1)).subscribe(s => state = s);
    expect(state).toBeTrue();
  });

  it('should set spinner state to false on hide() after delay', fakeAsync(() => {
    service.show();
    service.hide();
    tick(300);
    let state: boolean | undefined;
    service.spinnerState$.pipe(take(1)).subscribe(s => state = s);
    expect(state).toBeFalse();
    flush();
  }));

  it('should show spinner on runWithMinimumDelay()', fakeAsync(() => {
    service.runWithMinimumDelay(of('test')).subscribe();
    tick(50);
    let state: boolean | undefined;
    service.spinnerState$.pipe(take(1)).subscribe(s => state = s);
    expect(state).toBeTrue();
    flush();
  }));

  it('should emit value through runWithMinimumDelay()', fakeAsync(() => {
    let emittedValue: string | undefined;
    service.runWithMinimumDelay(of('test value')).subscribe(value => {
      emittedValue = value;
    });
    expect(emittedValue).toEqual('test value');
    flush();
  }));
});
