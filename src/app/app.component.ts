import {Component, OnInit} from '@angular/core';
import {GetWeatherService} from './shared/get-weather.service';
export interface Weather {
  city: string;
  temp: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'weather';
  private latitude: number;
  private longitude: number;
  public weather: Weather;
  public cityName: string;
  public cities: Array<object> = [];

  constructor(private getWeather: GetWeatherService) {
  }

  ngOnInit(): void {
    this.geoFindMe();
  }

  // this is callback for success
  success() {
    this.getWeather.getWeatherByCoordinates(this.latitude, this.longitude)
      .subscribe(r => {
        this.weather = {
          city: r.name,
          temp: `  ${ (r.main.temp - 273).toFixed(0) } °C `,
          icon:  `http://openweathermap.org/img/wn/${r.weather[0].icon}@2x.png`
        };
        this.cityName = '';
      });
  }
  geoFindMe() {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      console.log('Locating…');
      navigator.geolocation.getCurrentPosition(r => {
        this.latitude = r.coords.latitude;
        this.longitude = r.coords.longitude;
        this.success();
      });
    }
  }

  getCityByName() {
    this.getWeather.getWeatherByCityName(this.cityName).subscribe((r) => {
      this.weather = {
        city: r.name,
        temp: `  ${ (r.main.temp - 273).toFixed(0) } °C `,
        icon:  `http://openweathermap.org/img/wn/${r.weather[0].icon}@2x.png`
      };
      this.cities.unshift(this.weather);
      this.cityName = '';
    });
  }
}
