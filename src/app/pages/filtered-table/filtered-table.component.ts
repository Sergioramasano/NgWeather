import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import {fromEvent, Observable, Subscription} from 'rxjs';
import { IUser } from '../../shared/interfaces/users.interface';
import { selectUsersList } from '../../store/selectors/users.selectors';
import {debounceTime, filter, map} from 'rxjs/operators';
import {FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-filtered-table',
  templateUrl: './filtered-table.component.html',
  styleUrls: ['./filtered-table.component.scss']
})
export class FilteredTableComponent implements OnInit, OnDestroy{
  public displayedColumns: string[] = ['id', 'name', 'phone', 'email'];
  public elementData: IUser[];
  subscription: Subscription;
  users$: Observable<IUser[]> = this.store.pipe(select(selectUsersList));
  dataSource: any;
  searchControl: FormControl;
  constructor(private fb: FormBuilder, private store: Store<IUser[]>) {
    this.searchControl = fb.control({value: '', disabled: false});
  }

  ngOnInit(): void {
    this.subscribing();
    this.filterUsers();
  }
  filterUsers() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(600)
      )
      .subscribe((filterValue) => {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        this.elementData = this.dataSource.filteredData;
      });
  }
  subscribing() {
    this.subscription = this.users$.subscribe(
      users => {
        if (users.length) {
          this.elementData = users;
          this.dataSource = new MatTableDataSource(this.elementData);
        }
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
