import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {LogoComponent} from './components/logo/logo.component';
import {FooterComponent} from './components/footer/footer.component';
import {ButtonModule} from "primeng/button";
import {DurationPipe} from './pipes/duration.pipe';
import {FilterPipe} from './pipes/filter.pipe';
import {OrderByPipe} from './pipes/order-by.pipe';
import {CourseBorderDirective} from './directive/course-border.directive';


@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    FooterComponent,
    DurationPipe,
    FilterPipe,
    OrderByPipe,
    CourseBorderDirective
  ],
  exports: [
    HeaderComponent,
    LogoComponent,
    FooterComponent,
    DurationPipe,
    FilterPipe,
    OrderByPipe,
    CourseBorderDirective
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    ButtonModule
  ]
})
export class SharedModule {
}
