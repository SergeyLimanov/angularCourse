import { TestBed } from '@angular/core/testing';
import { SpinnerService } from './spinner.service';
import { of } from 'rxjs';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial spinner state as false', (done) => {
    service.spinnerState$.subscribe(state => {
      expect(state).toBeFalse();
      done();
    });
  });

  it('should set spinner state to true on show()', (done) => {
    service.show();
    service.spinnerState$.subscribe(state => {
      expect(state).toBeTrue();
      done();
    });
  });

  it('should set spinner state to false on hide() after delay', (done) => {
    service.show();
    service.hide();
    setTimeout(() => {
      service.spinnerState$.subscribe(state => {
        expect(state).toBeFalse();
        done();
      });
    }, 300);
  });

  it('should show spinner on runWithMinimumDelay()', (done) => {
    service.runWithMinimumDelay(of('test')).subscribe();
    service.spinnerState$.subscribe(state => {
      expect(state).toBeTrue();
      done();
    });
  });

  it('should emit value through runWithMinimumDelay()', (done) => {
    service.runWithMinimumDelay(of('test value')).subscribe(value => {
      expect(value).toEqual('test value');
      done();
    });
  });
});
