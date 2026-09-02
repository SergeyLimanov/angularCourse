import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { AuthorComponent } from './author.component';
import { CoursesService } from '../../../../../../services/courses.service';
import { of } from 'rxjs';

describe('AuthorComponent', () => {
  let component: AuthorComponent;
  let fixture: ComponentFixture<AuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: CoursesService, useValue: { getAuthors: () => of([]) } }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorComponent);
    component = fixture.componentInstance;
    component.controlForm = new FormControl([]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
