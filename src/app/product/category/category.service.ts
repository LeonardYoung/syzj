import { Category } from 'src/app/shared/interface/category';
import { CATEGORY_KEY, LocalStorageService } from './../../shared/services/local-storage.service';
import { Injectable } from '@angular/core';
import { AjaxResult } from 'src/app/shared/interface/ajax-result';
import { CATEGORIES } from '../mock.categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Category[];
  constructor(private localStorageService: LocalStorageService ) {
    this.categories = this.localStorageService.get(CATEGORY_KEY, CATEGORIES);
   }
  async getAll(): Promise<AjaxResult> {
    // this.categories = this.localStorageService.get(CATEGORY_KEY, CATEGORIES);
    return {
      targetUrl: '',
      result: this.categories,
      success: true,
      error: null,
      unAuthorizedRequest: false
    };
  }
  getCategorys(): Category[]{
    return this.categories;
  }
  /**
   *
   * @description 增加一个大分类，并往大分类中增加一个小分类
   * @param  mainName 大分类的名称
   * @param  subName 小分类的名称
   * @return  增加好的新分类
   */
  mainCategoryAdd(mainName: string, subCategorys: Category[]): Category[] {
    const lastId = this.categories[this.categories.length - 1].id + 1;
    // const child: Category = {
    //   id: 0,
    //   name: subName,
    // };
    this.categories.push({
      id: lastId,
      name: mainName,
      children: subCategorys
    });
    this.localStorageService.set(CATEGORY_KEY, this.categories);
    return this.categories;
  }

  /**
   *
   * @description 增加一组小分类
   * @param mainid 大分类的id
   * @param subCategorys 小分类数组
   * @return 修改后的大分类
   */
  subCategoryAdd(mainid: number, subCategorys: Category[]): Category {
    let cateEdit: Category;
    let found = false;
    for (const cate of this.categories){
      if ( cate.id === mainid) {
        cateEdit = cate;
        found = true;
      }
    }
    if (!found){
      throw new Error('Main Catetory id not found');
    }

    //
    for (const cate of subCategorys){
      cateEdit.children.push(cate);
    }
    // console.log(this.categories)
    this.localStorageService.set(CATEGORY_KEY, this.categories);

    return cateEdit;
  }
}
