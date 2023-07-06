import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'movies',
        children: [
          {
            path: '',
            loadChildren: () => import('../movies/movies.module').then(m => m.MoviesPageModule)
          },
          {
            path: ':id',
            loadChildren: () => import('../movie-details/movie-details.module').then(m => m.MovieDetailsPageModule)
          }
        ]
      },
      {
        path: 'favourites',
        children: [
          {
            path: '',
            loadChildren: () => import('../favourites/favourites.module').then(m => m.FavouritesPageModule)
          }
        ]
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/movies',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }