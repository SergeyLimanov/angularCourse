import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit,
  Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import { MenuItem } from "primeng/api";
import {Course} from "../../../../interface/course.interface";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss'
})
export class CourseListComponent implements OnChanges, OnInit, DoCheck, AfterContentInit,
  AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  public courses: Course[] = [];
  searchField: string = "";
  items: MenuItem[] = [];

//Вызывается после инициализации компонента.
  public ngOnInit(): void {
    this.items = [
      { icon: 'pi pi-home' }, // Добавление иконки домика
      { label: 'Курсы' }
    ];

    this.courses = [
     {
       id:1,
       title: "Java Programming Masterclass",
       creationDate: new Date("2023-01-26"),
       duration: 90,
       description: "This masterclass covers advanced Java programming concepts including multi-threading, design patterns, and database connectivity. Participants will gain hands-on experience in building complex Java applications."
     },
     {
       id: 2,
       title: "Python for Data Science",
       creationDate: new Date("2023-03-10"),
       duration: 60,
       description: "Learn Python programming language with a focus on its applications in data science. The courses covers data analysis, machine learning, and data visualization using popular Python libraries such as NumPy, Pandas, and Matplotlib."
     },
     {
       id: 3,
       title: "Web Development Bootcamp",
       creationDate: new Date("2023-02-05"),
       duration: 120,
       description: "Join this intensive bootcamp to learn modern web development technologies including HTML, CSS, JavaScript and Node.js. By the end of the courses, you'll be able to build dynamic and interactive web applications."
     },
     {
       id: 4,
       title: "Machine Learning Fundamentals",
       creationDate: new Date("2023-04-20"),
       duration: 120,
       description: "Explore the basics of machine learning algorithms and techniques in this courses. Topics include supervised and unsupervised learning, regression, classification, and clustering. Practical exercises and projects are included."
     },
     {
       id: 5,
       title: "iOS App Development with Swift",
       creationDate: new Date("2023-06-12"),
       duration: 100,
       description: "Explore the basics of machine learning algorithms and techniques in this courses. Topics include supervised and unsupervised learning, regression, classification, and clustering. Practical exercises and projects are included."
     },
   ]
  }

  //Вызывается при изменении входных свойств компонента
  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges");
  }

  ngDoCheck(): void {
    console.log("ngDoCheck");
  }

  ngAfterContentInit(): void {
    console.log("ngAfterContentInit");
  }

  ngAfterContentChecked(): void {
    console.log("ngAfterContentChecked");
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit");
  }

  ngAfterViewChecked(): void {
    console.log("ngAfterViewChecked");
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy");
  }

  public selectCourse(course: Course): void {
    console.log(course)
  }

  public deleteCourse(course: Course): void {
    console.log(course.id)
  }

  public searchClick(): void {
    console.log(this.searchField);
  }

  public loadMore(): void {
    console.log("load more");
  }

}
