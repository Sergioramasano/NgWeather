import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {GetUsers} from '../../store/actions/users.actions';
import {selectUsersList} from '../../store/selectors/users.selectors';
import {IUser} from '../../shared/interfaces/users.interface';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  users$: Observable<IUser[]> = this.store.pipe(select(selectUsersList));
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  constructor(private store: Store) {
    this.store.dispatch(new GetUsers());
  }
  ngOnInit() {
   this.subscription = this.users$.subscribe();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
