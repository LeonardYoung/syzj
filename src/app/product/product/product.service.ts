import { LocalStorageService, PRODUCTS_KEY } from './../../shared/services/local-storage.service';
import { Injectable } from '@angular/core';
import { AjaxResult } from 'src/app/shared/interface/ajax-result';
import { Product } from './product';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  public products: Product[];
  constructor(private localStorage: LocalStorageService) {
    this.products = this.localStorage.get(PRODUCTS_KEY, []);
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
    this.localStorage.set(PRODUCTS_KEY, this.products);
    return {
      success: true,

    }
  }
  async getListByCondition(searchProductInput): Promise<AjaxResult> {
    let result: Product[] = [];
    for( const item of this.products){
      // 名字 和条形码匹配其中一个即可
      if(item.name.indexOf(searchProductInput) >= 0){
        result.push(item);
      }
      else if(item.barcode.indexOf(searchProductInput) >= 0){
        result.push(item);
      }
    }
    return {
      success: true,
        result: {
          totalCount: result.length,
          list: result
        }
    }

  }
  async getList(index: number, size: number): Promise<AjaxResult> {
    if (index < 0) {
      // 实际开发中应抛出异常类对象
      throw new Error('分页的索引应大于等于零');
    }
    if (size <= 0) {
      // 实际开发中应抛出异常类对象
      throw new Error('每页显示的记录数应大于零');
    }
    // 
    const products: Product[] = this.localStorage.get(PRODUCTS_KEY,[])
    if (products.length === 0){
      return {
        success: true,
        result: {
          totalCount: 0,
          list: products
        }
      }
    }
    const result: Product[] = products.slice(index * size, index * size + size);
    return {
      success: true,
        result: {
          totalCount: result.length,
          list: result
        }
    }
  }
}
