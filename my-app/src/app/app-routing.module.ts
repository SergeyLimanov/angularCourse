import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./modules/login/login.component";
import { CoursesComponent } from "./modules/courses/courses.component";
import { CourseListComponent } from "./modules/courses/components/course-list/course-list.component";
import { CourseAddComponent } from "./modules/courses/components/course-add/course-add.component";
import { NotFoundComponent } from "./shared/components/not-found/not-found.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/courses' },
  { path: 'login', component: LoginComponent },
  {
    path: 'courses',
    component: CoursesComponent,
    children: [
      { path: '', pathMatch: 'full', component: CourseListComponent },
      { path: 'new', component: CourseAddComponent },
      { path: ':id', component: CourseAddComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
