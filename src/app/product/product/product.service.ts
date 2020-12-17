import { LocalStorageService, PRODUCTS_KEY } from './../../shared/services/local-storage.service';
import { Injectable } from '@angular/core';
import { AjaxResult } from 'src/app/shared/interface/ajax-result';
import { Product } from './product';
import {UUID} from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
  private products: Product[];
  constructor(private localStorage: LocalStorageService) {
    this.products = this.localStorage.get(PRODUCTS_KEY,[]);
   }

  /**
   *
   * @description 插入一个商品数据到本地
   * @param {Product} input 商品数据
   * @return {*}  {Promise<AjaxResult>}
   * @memberof ProductService
   */
  async insert(input: Product): Promise<AjaxResult> {
    input.id = UUID.UUID();
    this.products.push(input);
    this.localStorage.set(PRODUCTS_KEY,this.products);
    return {
      success: true,
      
    }
  }
}
