import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseAddComponent } from './components/course-add/course-add.component';
import { CoursesComponent } from './courses.component';
import {NotFoundComponent} from "../../shared/components/not-found/not-found.component";

const routes: Routes = [
  { path: 'courses', component: CoursesComponent },  // Дефолтный маршрут курсов
  { path: 'courses/new', component: CourseAddComponent },  // Маршрут для добавления нового курса
  { path: 'courses/:id', component: CourseAddComponent },  // Динамический маршрут для курса по ID
  { path: '**', component: NotFoundComponent },  // Страница 404
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
