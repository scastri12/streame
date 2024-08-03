import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  {
    path: '',
    loadComponent: () => import('./domains/login/login-page.component').then(m => m.LoginPageComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./domains/items/pages/item-list/item-list.component').then(m => m.ItemListComponent)
  },
  {
    path: 'search',
    loadComponent: () => import('./domains/items/pages/search-item/search-item.component').then(m => m.SearchItemComponent)
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./domains/items/pages/detail-item/detail-item.component').then(m => m.DetailItemComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
