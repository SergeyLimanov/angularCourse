import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CourseBorderDirective } from './course-border.directive';
describe('CourseBorderDirective', () => {
  let fixture: ComponentFixture<CourseBorderDirective>;
  let directive: CourseBorderDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseBorderDirective]
    });

    fixture = TestBed.createComponent(CourseBorderDirective);
    directive = fixture.debugElement.nativeElement.querySelector('[appCourseBorder]').injector.get(CourseBorderDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
