import {Component, OnDestroy, OnInit} from '@angular/core';
import {GetWeatherService} from '../../shared/services/get-weather.service';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {IUser} from '../../shared/interfaces/users.interface';
import {Observable, Subscription} from 'rxjs';
import {selectUsersList} from '../../store/selectors/users.selectors';

@Component({
  selector: 'app-show-more-table',
  templateUrl: './show-more-table.component.html',
  styleUrls: ['./show-more-table.component.scss']
})
export class ShowMoreTableComponent implements OnInit {
  public fullWeather: any;
  private cityName: string;
  public src: string;
  public elementData: any;
  public subscription: Subscription;
  public users$: Observable<IUser[]> = this.store.pipe(select(selectUsersList));
  constructor(private getWeather: GetWeatherService, private route: ActivatedRoute, private store: Store<IUser[]>) {
    this.cityName = this.route.snapshot.params.name;
  }
  ngOnInit(): void {
    if (Number(this.cityName)) {
      this.subscribing();
    } else {
      this.getCityByName();
    }
  }
  subscribing() {
    this.subscription = this.users$.subscribe(
      users => {
        if (users.length) {
          this.elementData = users.filter(user => user.id === +this.cityName);
          this.getCityByCoords(this.elementData[0].address.geo.lat, this.elementData[0].address.geo.lng);
        }
      }
    );
  }
  getCityByName() {
    this.getWeather.getWeatherByCityName(this.cityName).subscribe((r) => {
      this.fullWeather = r;
      this.src = `http://openweathermap.org/img/wn/${r.weather[0].icon}@2x.png`;
      this.cityName = '';
    });
  }
  getCityByCoords(lat, lon) {
    this.getWeather.getWeatherByCoordinates(lat,  lon).subscribe((r) => {
      r.name = this.elementData[0].address.city;
      r.sys.country = `Weather for : ${this.elementData[0].name}`;
      this.fullWeather = r;
      this.src = `http://openweathermap.org/img/wn/${r.weather[0].icon}@2x.png`;
      this.cityName = '';
    });
  }
}
