import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./modules/login/login.component";
import {NotFoundComponent} from "./shared/components/not-found/not-found.component";
import {authGuard} from "./services/auth/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: "login", component: LoginComponent },
  {
    path: 'courses',
    loadChildren: () => import('./modules/courses/courses.module').then(m => m.CoursesModule),
    canActivate: [authGuard]
  },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
