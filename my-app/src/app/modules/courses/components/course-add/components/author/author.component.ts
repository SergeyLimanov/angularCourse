import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Author } from '../../../../../../interface/author'; // Путь к вашему интерфейсу
import { CoursesService } from '../../../../../../services/courses.service'; // Путь к вашему сервису

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorComponent implements OnInit {
  @Input() controlForm!: FormControl; // Принимаем форму как Input

  authors: Author[] = []; // Массив для хранения всех авторов
  filteredAuthor: Author[] = []; // Массив для хранения фильтрованных авторов
  userAction: boolean = false; // Флаг для проверки пользовательских действий

  constructor(public coursesService: CoursesService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.coursesService.getAuthors().pipe(
      tap((authors) => {
        this.authors = authors; // Заполняем массив authors
        this.filteredAuthor = authors; // Начально заполняем фильтрованный массив
        this.cdr.markForCheck();
      })
    ).subscribe();
    console.log(this.filteredAuthor)

  }

// Функция для фильтрации авторов в автокомплите
  filterAuthor(event: any) {
    const query = event.query.toLowerCase(); // Получаем запрос из события
    this.filteredAuthor = this.authors.filter(author => author.name.toLowerCase().includes(query)); // Фильтруем авторов
    console.log(this.filteredAuthor)

  }

  selectAuthor(event: any): void {
    const selectedAuthor = event.value; // Получаем значение автора из события
    const currentValue = this.controlForm.value || []; // Получаем текущее значение формы

    console.log('Selected Author:', selectedAuthor);
    console.log('Current Value:', currentValue);

    // Проверяем, не выбран ли уже этот автор
    if (!currentValue.some((author: Author) => author.id === selectedAuthor.id)) {
      // Добавляем выбранного автора в текущий список
      const updatedValue = [...currentValue, selectedAuthor];
      console.log('Updated Value:', updatedValue);
      this.controlForm.patchValue(updatedValue); // Обновляем значение формы
    }
  }

  deleteAuthor(id: string | number): void {
    this.userAction = true; // Устанавливаем флаг пользовательского действия
    const updatedValue = this.controlForm.value.filter((author: Author) => author.id !== id); // Фильтруем автора по ID
    this.controlForm.setValue(updatedValue); // Обновляем значение формы
  }

}
