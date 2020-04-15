import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import { IUser } from '../../shared/interfaces/users.interface';
import { selectUsersList } from '../../store/selectors/users.selectors';
import {debounceTime} from 'rxjs/operators';
import {FormBuilder, FormControl} from '@angular/forms';
import {Weather} from '../../interfaces';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-filtered-table',
  templateUrl: './filtered-table.component.html',
  styleUrls: ['./filtered-table.component.scss']
})
export class FilteredTableComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  public displayedColumns: string[] = ['id', 'name', 'phone', 'email'];
  public elementData: IUser[];
  public subscription: Subscription;
  public users$: Observable<IUser[]> = this.store.pipe(select(selectUsersList));
  public dataSource: any;
  public searchControl: FormControl;
  public weather: Weather;
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
      });
  }
  subscribing() {
    this.subscription = this.users$.subscribe(
      users => {
        if (users.length) {
          this.elementData = users;
          this.dataSource = new MatTableDataSource(this.elementData);
          this.dataSource.paginator = this.paginator;
        }
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
