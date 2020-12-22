import { ProductAddPage } from './product/product-add/product-add.page';
import { CategoryNameEditPage } from './category/category-name-edit/category-name-edit.page';
import { CategoryEditPage } from './category/category-edit/category-edit.page';
import { CategoryAddPage } from './category/category-add/category-add.page';
import { CategoryListPage } from './category/category-list/category-list.page';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductPageRoutingModule } from './product-routing.module';
import { ProductListPage } from './product/product-list/product-list.page';

// import { ProductPage } from './product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductPageRoutingModule,
    SharedModule
  ],
  declarations: [
    CategoryListPage,
    CategoryAddPage,
    CategoryEditPage,
    CategoryNameEditPage,
    ProductAddPage,
    ProductListPage
  ]
})
export class ProductPageModule {}
