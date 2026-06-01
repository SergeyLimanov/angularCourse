import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import {Course} from "../../interface/course.interface";

@Directive({
  selector: '[appCourseBorder]'
})
export class CourseBorderDirective implements AfterViewInit{
  @Input() course: Course = {} as Course;
  private currentDate = new Date(); // Создаем объект даты для текущей даты
  private oldDate = new Date(); // Создаем объект даты для даты, отстоющей на 14 дней

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  public AfterViewInit(): void {
    this.oldDate.setDate(this.oldDate.getDate() - 14); // Устанавливаем дату, отстоящую на 14 дней назад

    const child = this.el.nativeElement.children[0]; // Получаем первого потомка элемента, к которому применяется директива

    if (this.course.creationDate < this.currentDate  && this.course.creationDate >= this.oldDate ) // Проверяем, является ли курс новым
      this.renderer.setStyle(child, 'border', '3px solid green'); // Добавляем стиль к элементу

    if (this.course.creationDate > this.currentDate) // Проверяем, является ли курс предстоящим
      this.renderer.setStyle(child, 'border', '3px solid blue'); // Добавляем стиль к элементу
  }

  ngAfterViewInit(): void {
  }
}
