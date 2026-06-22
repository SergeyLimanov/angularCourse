import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {LogoComponent} from './components/logo/logo.component';
import {FooterComponent} from './components/footer/footer.component';
import {ButtonModule} from "primeng/button";
import { NotFoundComponent } from './components/not-found/not-found.component';
import {GlobalSpinnerComponent} from "./global-spinner/global-spinner.component";


@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    FooterComponent,
    NotFoundComponent,
    GlobalSpinnerComponent
  ],
  exports: [
    HeaderComponent,
    LogoComponent,
    FooterComponent,
    NotFoundComponent,
    GlobalSpinnerComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    ButtonModule
  ]
})
export class SharedModule {
}
