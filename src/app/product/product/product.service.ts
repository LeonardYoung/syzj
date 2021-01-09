import { ProductAutit } from './../../shared/interface/product-autit';
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
  private curProduct: Product;
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
  async productDepot(id: string,type: number, num: number): Promise<AjaxResult> {
    for( const item of this.products){
      if(item.id == id ){
        if(isNaN(item.remain)){
          item.remain = 0;
        }
        if(type === 1){
          item.remain += num;
          return {
            success: true,
          }
        }else{
          if( item.remain >= num){
            item.remain -= num;
            return {
              success: true,
              result:item
            }
          }
          //库存不足
          else {
            return {
              success: false,
              error:{
                message:'库存不足'
              }
            }
          }
        }
      }
    }
  }
  async getProductById(id: string): Promise<AjaxResult> {
    for( const item of this.products){
      if(item.id == id ){
        return {
          success: true,
          result:item
        }
      }
    }
  }

  setCurrentProductDetail(input: Product):void {
    this.curProduct = input;
  }
  deleteCurrentProduct(){
    for( const index in this.products){
      if(this.products[index].id == this.curProduct.id ){
        this.products.splice(parseInt(index),1);
        this.localStorage.set(PRODUCTS_KEY, this.products);
        return;
      }
    }
  }


  /**
   *
   * @description 获取统计数据,若没有给参数，则统计this.products
   * @return {*}  {ProductAutit}
   * @memberof ProductService
   */
  async getAudit(para ?: Product[]): Promise<ProductAutit>{
    let src : Product[];
    if(para){
      src = para;
    }
    else{
      src = this.products;
    }
    let sumPrice = 0;
    let sumRemain = 0;
    for( const item of src){
      sumPrice += (item.price * item.remain);
      sumRemain += item.remain;
    }
    return {
      totalRemain: sumRemain,
      totalPrice: sumPrice,
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
