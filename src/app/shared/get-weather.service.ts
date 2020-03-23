import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetWeatherService {

  constructor(private http: HttpClient) { }
  getWeatherByCoordinates(lat: number, lon: number): Observable<any> {
    return  this.http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${environment.weatherApiKey}`);
  }
  getWeatherByCityName(name: string): Observable<any> {
    return  this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${environment.weatherApiKey}`);
  }
}
