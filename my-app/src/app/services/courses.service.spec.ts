import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import { HttpClient, HttpHandler, HttpResponse, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Course } from '../interface/course.interface';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpTestingController: HttpTestingController;

  const mockCourses: Course[] = [
    { id: 1, title: 'Course 1', description: 'Desc 1', duration: 60, creationDate: new Date('2024-01-01') },
    { id: 2, title: 'Course 2', description: 'Desc 2', duration: 120, creationDate: new Date('2024-02-01') },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService],
    });
    service = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call GET /api/courses on getAllCourses()', () => {
    service.getAllCourses().subscribe();
    const req = httpTestingController.expectOne('/api/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should call GET /api/courses with pagination params on getCoursesList()', () => {
    service.getCoursesList(5, 1).subscribe();
    const req = httpTestingController.expectOne('/api/courses?_page=1&_limit=5');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should call GET /api/courses/?q= on searchCourses()', () => {
    service.searchCourses('test').subscribe();
    const req = httpTestingController.expectOne('/api/courses/?q=test');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should call GET /api/courses with start, limit and search on getCourses()', () => {
    service.getCourses(0, 5, 'angular').subscribe();
    const req = httpTestingController.expectOne('/api/courses?_start=0&_limit=5&q=angular');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should return courses and total from getCourses() response', () => {
    const headers = new HttpHeaders({ 'X-Total-Count': '10' });
    service.getCourses(0, 5).subscribe(result => {
      expect(result.courses).toEqual(mockCourses);
      expect(result.total).toBe(10);
    });
    const req = httpTestingController.expectOne('/api/courses?_start=0&_limit=5');
    req.flush(mockCourses, { headers });
  });

  it('should return total 0 when X-Total-Count header is missing', () => {
    service.getCourses(0, 5).subscribe(result => {
      expect(result.total).toBe(0);
    });
    const req = httpTestingController.expectOne('/api/courses?_start=0&_limit=5');
    req.flush(mockCourses);
  });

  it('should call POST /api/courses on create()', () => {
    const newCourse: Course = { id: 3, title: 'New', description: 'New Desc', duration: 30, creationDate: new Date() };
    service.create(newCourse).subscribe();
    const req = httpTestingController.expectOne('/api/courses');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCourse);
    req.flush(newCourse);
  });

  it('should call PUT /api/courses/:id on update()', () => {
    const course: Course = { id: 1, title: 'Updated', description: 'Updated Desc', duration: 90, creationDate: new Date() };
    service.update(course).subscribe();
    const req = httpTestingController.expectOne('/api/courses/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(course);
    req.flush(course);
  });

  it('should call GET /api/courses/:id on getCourseById()', () => {
    service.getCourseById(1).subscribe();
    const req = httpTestingController.expectOne('/api/courses/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses[0]);
  });

  it('should call DELETE /api/courses/:id on remove()', () => {
    service.remove(1).subscribe();
    const req = httpTestingController.expectOne('/api/courses/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should call GET /api/authors on getAuthors()', () => {
    service.getAuthors().subscribe();
    const req = httpTestingController.expectOne('/api/authors');
    expect(req.request.method).toBe('GET');
    req.flush([{ id: '1', name: 'Author 1' }]);
  });
});
