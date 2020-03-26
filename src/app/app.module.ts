import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
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
import {StoreModule} from "@ngrx/store";

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
    TempPipe
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
    MatListModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
