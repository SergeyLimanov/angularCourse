import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from "./shared/shared.module";
import {CoursesModule} from "./modules/courses/courses.module";
import { NgModule} from "@angular/core";
import {LoginModule} from "./modules/login/login.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu);


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    LoginModule,
    CoursesModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
