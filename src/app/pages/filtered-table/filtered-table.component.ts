import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {IUser} from '../../shared/interfaces/users.interface';
import {selectUsersList} from '../../store/selectors/users.selectors';

@Component({
  selector: 'app-filtered-table',
  templateUrl: './filtered-table.component.html',
  styleUrls: ['./filtered-table.component.scss']
})
export class FilteredTableComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = ['id', 'name', 'phone', 'email'];
  public elementData: IUser[];
  subscription: Subscription;
  users$: Observable<IUser[]> = this.store.pipe(select(selectUsersList));
  dataSource = new MatTableDataSource(this.elementData);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.subscription = this.users$.subscribe(users => this.elementData = [...users]);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
