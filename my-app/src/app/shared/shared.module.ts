import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {LogoComponent} from './components/logo/logo.component';
import {FooterComponent} from './components/footer/footer.component';
import {ButtonModule} from "primeng/button";


@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    LogoComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    ButtonModule
  ]
})
export class SharedModule {
}
