import { ShopEditPage } from './shop-edit/shop-edit.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopPage } from './shop.page';

const routes: Routes = [
  {
    path: '',
    component: ShopPage
  },
  {
    path: 'edit',
    component: ShopEditPage
    // loadChildren: () => import('./shop-edit/shop-edit.module').then( m => m.ShopEditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopPageRoutingModule {}
