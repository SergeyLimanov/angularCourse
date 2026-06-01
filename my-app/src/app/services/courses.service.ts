import {Injectable, Input} from '@angular/core';
import {Course} from "../interface/course.interface";
import {BehaviorSubject, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private courses: Course[] = [
    {
      id:1,
      title: "Java Programming Masterclass",
      creationDate: new Date("2023-01-26"),
      duration: 90,
      description: "This masterclass covers advanced Java programming concepts including multi-threading, design patterns, and database connectivity. Participants will gain hands-on experience in building complex Java applications.",
      topRated: false,
    },
    {
      id: 2,
      title: "Python for Data Science",
      creationDate: new Date("2023-03-10"),
      duration: 60,
      description: "Learn Python programming language with a focus on its applications in data science. The courses covers data analysis, machine learning, and data visualization using popular Python libraries such as NumPy, Pandas, and Matplotlib.",
      topRated: false,
    },
    {
      id: 3,
      title: "Web Development Bootcamp",
      creationDate: new Date("2023-02-05"),
      duration: 120,
      description: "Join this intensive bootcamp to learn modern web development technologies including HTML, CSS, JavaScript and Node.js. By the end of the courses, you'll be able to build dynamic and interactive web applications.",
      topRated: true,
    },
    {
      id: 4,
      title: "Machine Learning Fundamentals",
      creationDate: new Date("2023-04-20"),
      duration: 120,
      description: "Explore the basics of machine learning algorithms and techniques in this courses. Topics include supervised and unsupervised learning, regression, classification, and clustering. Practical exercises and projects are included.",
      topRated: true,
    },
    {
      id: 5,
      title: "iOS App Development with Swift",
      creationDate: new Date("2023-06-12"),
      duration: 100,
      description: "Explore the basics of machine learning algorithms and techniques in this courses. Topics include supervised and unsupervised learning, regression, classification, and clustering. Practical exercises and projects are included.",
      topRated: true,
    },
  ];

  private coursesSubject = new BehaviorSubject<Course[]>(this.courses);

  constructor() { }

  getCourses(): Observable<Course[]> {
    return this.coursesSubject.asObservable();
  }

  create(course: Course): void {
    this.courses.push(course);
    this.coursesSubject.next(this.courses);
  }

  getById(id: number): Course | undefined {
    return this.courses.find(course => course.id === id);
  }

  update(course: Course): void {
    const index = this.courses.findIndex(c => c.id === course.id);
    if (index !== -1) {
      this.courses[index] = course;
      this.coursesSubject.next(this.courses);
    }
  }

  remove(id: number): void {
    this.courses = this.courses.filter(course => course.id !== id);
    this.coursesSubject.next(this.courses);
  }
}
