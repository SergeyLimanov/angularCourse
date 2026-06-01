import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from "./shared/shared.module";
import {CoursesModule} from "./modules/courses/courses.module";
import { NgModule} from "@angular/core";
import {LoginModule} from "./modules/login/login.module";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputNumberModule} from "primeng/inputnumber";
import {CalendarModule} from "primeng/calendar";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoursesModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    NoopAnimationsModule,
    LoginModule,
    SharedModule,
    CalendarModule,
    BrowserAnimationsModule,
    InputNumberModule,
    InputTextareaModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]  // Указываем корневой компонент

})
export class AppModule { }
