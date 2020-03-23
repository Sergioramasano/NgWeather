import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Input} from '@angular/core';
import {Weather} from '../../app.component';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() city: Weather;
  @Input() id: number;
  @Output() change$ = new EventEmitter<number>();
  emittedId: number;
  constructor() { }

  ngOnInit(): void {
  }

  emitDelete($event: MouseEvent) {
    this.emittedId = ($event as any).toElement.id;
    this.change$.emit(this.emittedId);
  }
}
