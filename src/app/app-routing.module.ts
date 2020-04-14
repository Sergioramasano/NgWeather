import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CardsPageComponent} from './pages/cards-page/cards-page.component';
import {SelectivePreloadingStrategyServiceService} from './selective-preloading-strategy-service.service';
import {ShowMoreTableComponent} from './pages/show-more-page/show-more-table.component';
import {AboutPageComponent} from './pages/about-page/about-page.component';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component';
import {FilteredTableComponent} from './pages/filtered-table/filtered-table.component';
import {ChartPageComponent} from './pages/chart-page/chart-page.component';
import {FormPageComponent} from "./pages/form-page/form-page.component";


const routes: Routes = [
  {
    path: '',
    component: CardsPageComponent,
    data: { state: 'home' }
  },
  {
    path: 'show-more-page/:name',
    component: ShowMoreTableComponent,
    data: { state: 'more' }
  },
  {
    path: 'about-page',
    component: AboutPageComponent,
    data: { state: 'about' }
  },
  {
    path: 'filtered-table-page',
    component: FilteredTableComponent,
    data: { state: 'filter' }
  },
  {
    path: 'chart-page',
    component: ChartPageComponent,
    data: { state: 'chart' }
  },
  {
    path: 'form-page',
    component: FormPageComponent,
    data: { state: 'form' }
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
