import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataModel, Weather} from '../../interfaces';
import {select, Store} from '@ngrx/store';
import {IUser} from '../../shared/interfaces/users.interface';
import {Observable, Subscription} from 'rxjs';
import {selectUsersList} from '../../store/selectors/users.selectors';
import {GetWeatherService} from '../../shared/services/get-weather.service';
@Component({
  selector: 'app-chart-page',
  templateUrl: './chart-page.component.html',
  styleUrls: ['./chart-page.component.scss']
})
export class ChartPageComponent implements OnInit, OnDestroy {

  data: DataModel[] = [];
  private subscription: Subscription;
  public users$: Observable<IUser[]> = this.store.pipe(select(selectUsersList));
  private users: IUser[];

  constructor(private store: Store<IUser[]>, private getWeather: GetWeatherService) {
  }
  ngOnInit(): void {
    this.subscribing();
  }
  subscribing() {
    this.subscription = this.users$.subscribe(
      users => {
        if (users.length) {
          this.users = users;
          this.getChartData();
        }
      }
    );
  }
  getChartData() {
    this.users.forEach(user => {
      this.getCityByCoords(user.address.geo.lat, user.address.geo.lng, user.name);
    });
  }
  getCityByCoords(lat, lon, userName) {
    this.getWeather.getWeatherByCoordinates(lat,  lon).subscribe((r) => {
      this.data.push({letter: userName , frequency: r.main.temp});
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
