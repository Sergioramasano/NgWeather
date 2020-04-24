import {Component, HostListener, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {GetUsers} from './store/actions/users.actions';
import {IUsers} from './shared/interfaces/users.interface';
import {routerTransition} from './router.animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ routerTransition ],
})
export class AppComponent implements OnInit {

  top: any;
  left: any;
  expand = false;
  constructor(private store: Store<IUsers>) {
  }
  ngOnInit(): void {
    this.store.dispatch(new GetUsers());
  }
  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
  @HostListener('document:click', ['$event'])
  onClick($event) {
    this.expand = true;
    setTimeout(() => {
      this.expand = false;
    }, 500);
  }

  @HostListener('document:mousemove', ['$event'])
  onMousemove($event) {
    this.top = ($event.pageY - 10) + 'px';
    this.left = ($event.pageX - 10) + 'px';
  }
}
