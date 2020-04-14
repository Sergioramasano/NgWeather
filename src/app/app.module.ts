import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CardComponent } from './shared/card/card.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { ShowMoreTableComponent } from './pages/show-more-page/show-more-table.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { CardsPageComponent } from './pages/cards-page/cards-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import {RouterModule} from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { TempPipe } from './shared/pipes/temp.pipe';
import {MatListModule} from '@angular/material/list';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import {StoreModule} from '@ngrx/store';
import {usersReducer} from './store/reducers/users.reducers';
import {state} from '@angular/animations';
import {UsersEffects} from './store/effects/users.effects';
import {MatTableModule} from '@angular/material/table';
import { FilteredTableComponent } from './pages/filtered-table/filtered-table.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ChartComponent } from './shared/chart/chart.component';
import { ChartPageComponent } from './pages/chart-page/chart-page.component';
import { FormPageComponent } from './pages/form-page/form-page.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ShowMoreTableComponent,
    NavbarComponent,
    LoaderComponent,
    CardsPageComponent,
    AboutPageComponent,
    NotFoundPageComponent,
    TempPipe,
    FilteredTableComponent,
    ChartComponent,
    ChartPageComponent,
    FormPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    RouterModule,
    ReactiveFormsModule,
    MatListModule,
    StoreDevtoolsModule.instrument({maxAge: 25}),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot({users: usersReducer}),
    EffectsModule.forRoot([UsersEffects]),
    MatTableModule,
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
