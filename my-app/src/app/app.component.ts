import { Component } from '@angular/core';
import {CoreModule} from "./modules/core/core.module";
import {CoursesModule} from "./modules/courses/courses.module";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CoreModule,
    CoursesModule
  ],
  standalone: true
})
export class AppComponent {
  title = 'angular-bs';
}
