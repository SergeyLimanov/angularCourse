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
import { DurationPipe } from '../../shared/pipes/duration.pipe';
import { FilterPipe } from '../../shared/pipes/filter.pipe';
import { OrderByPipe } from '../../shared/pipes/order-by.pipe';
import {ConfirmationService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import { CourseAddComponent } from './components/course-add/course-add.component';
import {CalendarModule} from "primeng/calendar";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextareaModule} from "primeng/inputtextarea";
import {AuthorComponent} from "./components/course-add/author/author.component";
import {CourseDurationComponent} from "./components/course-add/course-duration/course-duration.component";
import {CourseBorderDirective} from "../../shared/directive/course-border.directive";
import {DialogModule} from "primeng/dialog";
import {CoursesRoutingModule} from "./courses-routing.module";

@NgModule({
  declarations: [
    CourseListComponent,
    CourseItemComponent,
    CoursesComponent,
    DurationPipe,
    OrderByPipe,
    FilterPipe,
    CourseAddComponent,
    CourseDurationComponent,
    AuthorComponent,
    CourseBorderDirective
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ConfirmDialogModule,
    BreadcrumbModule,
    InputTextareaModule,
    InputNumberModule,
    CalendarModule,
    DialogModule,
    CoursesRoutingModule
  ],
  providers: [
    ConfirmationService,
  ],
  exports: [CoursesComponent, CourseAddComponent]
})
export class CoursesModule { }
