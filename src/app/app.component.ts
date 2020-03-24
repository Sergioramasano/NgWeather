import { Component, OnInit } from '@angular/core';
import {GetWeatherService} from './shared/services/get-weather.service';
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
  private latitude: number;
  private longitude: number;
  public weather: Weather;
  public cityName: string;
  public cities = [];
  public localCities = [];
  constructor(private getWeather: GetWeatherService) { }

  ngOnInit(): void {
    if (window.localStorage.getItem('cities')) {
      this.cities = JSON.parse(window.localStorage.getItem('cities'));
    }
    this.geoFindMe();
  }

  // this is callback for success
  success() {
    this.getWeather.getWeatherByCoordinates(this.latitude, this.longitude)
      .subscribe(r => {
        this.weather = {
          city: r.name,
          temp: `  ${ (r.main.temp - 273).toFixed(0) } °C `,
          icon:  `http://openweathermap.org/img/wn/${r.weather[0].icon}@2x.png`,
          country: r.sys.country
        };
        this.localCities.unshift(this.weather);
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
        icon:  `http://openweathermap.org/img/wn/${r.weather[0].icon}@2x.png`,
        country: r.sys.country
      };
      // the unique values
      this.cities.unshift(this.weather);
      this.cities = this.cities.filter(a => !a.city.includes(this.weather.city));
      this.cities.unshift(this.weather);
      // the unique values end


      const cities = JSON.stringify(this.cities);
      window.localStorage.setItem('cities', cities);
      this.cityName = '';
    });
  }

  changer(id: number) {
    this.cities.splice(id, 1);
    const cities = JSON.stringify(this.cities);
    window.localStorage.setItem('cities', cities);
  }

}
