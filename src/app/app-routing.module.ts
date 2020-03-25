import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CardsPageComponent} from './pages/cards-page/cards-page.component';
import {SelectivePreloadingStrategyServiceService} from './selective-preloading-strategy-service.service';
import {ShowMoreTableComponent} from './pages/show-more-page/show-more-table.component';
import {AboutPageComponent} from './pages/about-page/about-page.component';
import {AppComponent} from './app.component';


const routes: Routes = [
  {
    path: '',
    component: CardsPageComponent,
  },
  {
    path: 'show-more-page',
    component: ShowMoreTableComponent,
  },
  {
    path: 'about-page',
    component: AboutPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      enableTracing: false, // <-- debugging purposes only
      preloadingStrategy: SelectivePreloadingStrategyServiceService,
    }
    )],
  declarations: [ ShowMoreTableComponent, AboutPageComponent, CardsPageComponent],
  bootstrap:    [ AppComponent ],
})
export class AppRoutingModule { }
