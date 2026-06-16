import { NgModule } from '@angular/core';
import {ServerModule} from '@angular/platform-server';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {AppModule} from "./app.module";

@NgModule({
  imports: [
    ServerModule,
    AppModule,  // Импортируйте основной модуль приложения
    AppRoutingModule,  // Импортируйте модуль маршрутизации
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
