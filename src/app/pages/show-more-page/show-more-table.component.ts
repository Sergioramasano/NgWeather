import {Component, OnDestroy, OnInit} from '@angular/core';
import {GetWeatherService} from '../../shared/services/get-weather.service';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from "rxjs";
import {IUser} from "../../shared/interfaces/users.interface";
import {select, Store} from "@ngrx/store";
import {selectUsersList} from "../../store/selectors/users.selectors";
import {GetUsers} from "../../store/actions/users.actions";

@Component({
  selector: 'app-show-more-table',
  templateUrl: './show-more-table.component.html',
  styleUrls: ['./show-more-table.component.scss']
})
export class ShowMoreTableComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  users$: Observable<IUser[]> = this.store.pipe(select(selectUsersList));
  public fullWeather: any;
  private cityName: string;
  public src: string;
  constructor(private getWeather: GetWeatherService, private route: ActivatedRoute, private store: Store) {
    this.cityName = this.route.snapshot.params.name;
  }
  ngOnInit(): void {
    this.getCityByName();
    this.subscription = this.users$.subscribe();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  getCityByName() {
    this.getWeather.getWeatherByCityName(this.cityName).subscribe((r) => {
      this.fullWeather = r
      this.src = `http://openweathermap.org/img/wn/${r.weather[0].icon}@2x.png`;
      // this.fullWeather = {
      //   city: r.name,
      //   temp: `  ${ (r.main.temp - 273).toFixed(0) } °C `,
      //   icon:  `http://openweathermap.org/img/wn/${r.weather[0].icon}@2x.png`,
      //   country: r.sys.country
      // };
      // the unique values
      // the unique values end
      this.cityName = '';
    });
  }
}
