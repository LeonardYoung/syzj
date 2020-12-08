import { CategoryListPage } from './category/category-list/category-list.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { ProductPage } from './product.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryListPage
    // component: ProductPage
  },
  {
    path: 'category-list',
    loadChildren: () => import('./category/category-list/category-list.module').then( m => m.CategoryListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductPageRoutingModule {}
