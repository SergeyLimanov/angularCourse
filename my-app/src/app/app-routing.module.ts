import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { CoursesComponent } from "./modules/courses/courses.component";
import {AuthGuard} from "./modules/auth-guard/auth-guard.component";
import {LoginComponent} from "./modules/login/login.component";
import {CourseAddComponent} from "./modules/courses/components/course-add/course-add.component";
import {NotFoundComponent} from "./shared/components/not-found/not-found.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: "login", component: LoginComponent },
  {
    path: "courses",
    component: CoursesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "courses/new",
    component: CourseAddComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: "courses/:id",
    component: CourseAddComponent,
    canActivate: [AuthGuard],
  },

  { path: "**", component: NotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
