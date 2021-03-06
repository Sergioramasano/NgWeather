import {Component, OnDestroy, OnInit} from '@angular/core';
import {Weather} from '../../interfaces';
import {GetWeatherService} from '../../shared/services/get-weather.service';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {IUser, IUsers} from '../../shared/interfaces/users.interface';
import {selectUsersList} from '../../store/selectors/users.selectors';
import {FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-cards-page',
  templateUrl: './cards-page.component.html',
  styleUrls: ['./cards-page.component.scss']
})
export class CardsPageComponent implements OnInit, OnDestroy {
  private latitude: number;
  private longitude: number;
  public weather: Weather;
  public cityValue: FormControl;
  public cityName = '';
  public cities = [];
  public localCities = [];
  public subscription: Subscription;
  public citySubscription: Subscription;
  public users$: Observable<IUser[]> = this.store.pipe(select(selectUsersList));

  constructor(private getWeather: GetWeatherService, private store: Store<IUsers>, private fb: FormBuilder) {
    this.cityValue = fb.control({value: '', disabled: false});
    this.citySubscription = this.cityValue.valueChanges.subscribe(inputCityValue => this.cityName = inputCityValue);
  }

  ngOnInit(): void {
    this.subscription = this.users$.subscribe();
    if (window.localStorage.getItem('cities')) {
      this.cities = JSON.parse(window.localStorage.getItem('cities'));
    }
    this.geoFindMe();
  }

  success() {
    this.getWeather.getWeatherByCoordinates(this.latitude, this.longitude)
      .subscribe(r => {
        this.weather = {
          city: r.name,
          temp: `  ${(r.main.temp - 273).toFixed(0)} °C `,
          icon: `http://openweathermap.org/img/wn/${r.weather[0].icon}@2x.png`,
          country: r.sys.country
        };
        this.localCities.unshift(this.weather);
        this.cityValue.reset();
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
        temp: `  ${(r.main.temp - 273).toFixed(0)} °C `,
        icon: `http://openweathermap.org/img/wn/${r.weather[0].icon}@2x.png`,
        country: r.sys.country
      };
      // the unique values
      this.cities.unshift(this.weather);
      this.cities = this.cities.filter(a => !a.city.includes(this.weather.city));
      this.cities.unshift(this.weather);
      // the unique values end
      const cities = JSON.stringify(this.cities);
      window.localStorage.setItem('cities', cities);
      this.cityValue.reset();
    }, err => console.log('HTTP Error', err));
  }

  changer(id: string) {
    this.cities = this.cities.filter(c => c.city !== id);
    const cities = JSON.stringify(this.cities);
    window.localStorage.setItem('cities', cities);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.citySubscription.unsubscribe();
  }
}
