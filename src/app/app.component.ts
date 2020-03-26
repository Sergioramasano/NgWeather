import { Component, OnInit } from '@angular/core';
export interface Weather {
  city: string;
  temp: string;
  icon: string;
  country: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {}
}
