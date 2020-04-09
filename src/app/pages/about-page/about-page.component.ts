import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {GetUsers} from '../../store/actions/users.actions';
import {selectUsersList} from '../../store/selectors/users.selectors';
import {IUser} from '../../shared/interfaces/users.interface';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AboutPageComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  users$: Observable<IUser[]> = this.store.pipe(select(selectUsersList));
  displayedColumns: string[] = ['id', 'name', 'phone', 'email'];
  expandedElement: IUser | null;
  constructor(private store: Store) {
  }
  ngOnInit() {
   this.subscription = this.users$.subscribe();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
