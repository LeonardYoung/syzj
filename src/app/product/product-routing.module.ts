import { ProductDepotPage } from './product/product-depot/product-depot.page';
import { ProductDetailPage } from './product/product-detail/product-detail.page';
import { ProductListPage } from './product/product-list/product-list.page';
import { ProductAddPage } from './product/product-add/product-add.page';
import { CategoryEditPage } from './category/category-edit/category-edit.page';
import { CategoryAddPage } from './category/category-add/category-add.page';
import { CategoryListPage } from './category/category-list/category-list.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { ProductPage } from './product.page';

const routes: Routes = [
  {
    path: 'category/list',
    component: CategoryListPage
  },
  {
    path: 'category/add',
    component: CategoryAddPage
  },
  {
    path: 'category/edit',
    component: CategoryEditPage
  },
  {
    path: 'add',
    component: ProductAddPage
  },
  {
    path: 'list',
    component: ProductListPage
  },
  {
    path: 'detail',
    component: ProductDetailPage
  },
  {
    path: 'depot',
    component: ProductDepotPage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductPageRoutingModule {}
