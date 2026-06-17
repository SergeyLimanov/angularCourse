import {Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-duration',
  templateUrl: './course-duration.component.html' ,
  styleUrls: ['./course-duration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseDurationComponent  {
  @Input() duration: number = 0;
  @Output() durationChange = new EventEmitter<number>();

  constructor() { }

  onDurationChange(value: number): void {
    this.durationChange.emit(value);
  }
}
