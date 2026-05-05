import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CourseListComponent} from "./components/course-list/course-list.component";
import {CourseItemComponent} from "./components/course-item/course-item.component";
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from "@angular/forms";
import { BreadcrumbModule } from "primeng/breadcrumb";
import {CoursesComponent} from "./courses.component";
import {InputTextModule} from "primeng/inputtext";
import {StyleClassModule} from "primeng/styleclass";

@NgModule({
  declarations: [
    CourseItemComponent,
    CourseListComponent,
    CoursesComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    BreadcrumbModule,
    StyleClassModule
  ],
  exports: [CoursesComponent]
})
export class CoursesModule { }
