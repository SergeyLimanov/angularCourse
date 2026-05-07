import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {CourseListComponent} from "./components/course-list/course-list.component";
import {CourseItemComponent} from "./components/course-item/course-item.component";
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from "@angular/forms";
import { BreadcrumbModule } from "primeng/breadcrumb";
import {CoursesComponent} from "./courses.component";
import {InputTextModule} from "primeng/inputtext";
import {StyleClassModule} from "primeng/styleclass";
import { CourseBorderDirective } from './directive/course-border.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';

@NgModule({
  declarations: [
    CourseItemComponent,
    CourseListComponent,
    CoursesComponent,
    CourseBorderDirective,
    DurationPipe,
    FilterPipe,
    OrderByPipe
  ],
    imports: [
        CommonModule,
        CardModule,
        ButtonModule,
        InputTextModule,
        FormsModule,
        BreadcrumbModule,
        StyleClassModule,
        NgOptimizedImage
    ],
  exports: [CoursesComponent]
})
export class CoursesModule { }
