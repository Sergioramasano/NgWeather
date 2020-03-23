import { Component, OnInit } from '@angular/core';
import { Input} from '@angular/core';
import {Weather} from '../../app.component';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() city: Weather;

  constructor() { }

  ngOnInit(): void {
  }

}
