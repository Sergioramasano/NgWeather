import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CardsPageComponent} from './pages/cards-page/cards-page.component';
import {SelectivePreloadingStrategyServiceService} from './selective-preloading-strategy-service.service';
import {ShowMoreTableComponent} from './pages/show-more-page/show-more-table.component';
import {AboutPageComponent} from './pages/about-page/about-page.component';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component';


const routes: Routes = [
  {
    path: '',
    component: CardsPageComponent,
  },
  {
    path: 'show-more-page/:name',
    component: ShowMoreTableComponent,
  },
  {
    path: 'about-page',
    component: AboutPageComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes,
    {
      enableTracing: false, // <-- debugging purposes only
      preloadingStrategy: SelectivePreloadingStrategyServiceService,
    }
    )],
  bootstrap:    [ AppComponent ],
})
export class AppRoutingModule { }
