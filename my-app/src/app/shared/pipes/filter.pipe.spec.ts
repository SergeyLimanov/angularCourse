import { FilterPipe } from './filter.pipe';
import { Course } from '../../interface/course.interface';

describe('FilterPipe', () => {
  let pipe: FilterPipe;

  const mockCourses: Course[] = [
    { id: 1, title: 'Angular Course', description: 'Learn Angular', duration: 60, creationDate: new Date('2024-01-01') },
    { id: 2, title: 'React Course', description: 'Learn React', duration: 90, creationDate: new Date('2024-02-01') },
    { id: 3, title: 'Vue Course', description: 'Learn Vue', duration: 120, creationDate: new Date('2024-03-01') },
  ];

  beforeEach(() => {
    pipe = new FilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return all courses when searchField is empty', () => {
    expect(pipe.transform(mockCourses, '')).toEqual(mockCourses);
  });

  it('should return all courses when searchField is null/undefined', () => {
    expect(pipe.transform(mockCourses, null as any)).toEqual(mockCourses);
    expect(pipe.transform(mockCourses, undefined as any)).toEqual(mockCourses);
  });

  it('should filter courses by title (case insensitive)', () => {
    const result = pipe.transform(mockCourses, 'angular');
    expect(result.length).toBe(1);
    expect(result[0].title).toEqual('Angular Course');
  });

  it('should filter courses by partial title match', () => {
    const result = pipe.transform(mockCourses, 'course');
    expect(result.length).toBe(3);
  });

  it('should return empty array when no match found', () => {
    const result = pipe.transform(mockCourses, 'python');
    expect(result.length).toBe(0);
  });

  it('should filter with case-insensitive search', () => {
    const result = pipe.transform(mockCourses, 'REACT');
    expect(result.length).toBe(1);
    expect(result[0].title).toEqual('React Course');
  });

  it('should handle empty courses array', () => {
    const result = pipe.transform([], 'test');
    expect(result.length).toBe(0);
  });
});
