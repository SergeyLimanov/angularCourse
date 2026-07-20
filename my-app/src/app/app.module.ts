import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from "./shared/shared.module";
import {CoursesModule} from "./modules/courses/courses.module";
import { NgModule, isDevMode} from "@angular/core";
import {LoginModule} from "./modules/login/login.module";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule, registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputNumberModule} from "primeng/inputnumber";
import {CalendarModule} from "primeng/calendar";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {CoursesRoutingModule} from "./modules/courses/courses-routing.module";
import {HttpClientModule, provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {authInterceptor} from "./services/auth/auth.interceptor";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {errorInterceptor} from "./services/error-interceptor.interceptor";
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {environment} from "../environments/environment";

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoursesModule,
    CommonModule,
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
    AppRoutingModule,
    CoursesRoutingModule,
    HttpClientModule,
    ToastModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 25 })
      : [],
    // isDevMode() ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    MessageService,
    provideClientHydration(),
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor]),
      withFetch())
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
