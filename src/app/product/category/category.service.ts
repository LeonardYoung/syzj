import { ActiveCategory } from './active-category';
import { Category } from './../../shared/interface/category';
import { CATEGORY_KEY, LocalStorageService } from './../../shared/services/local-storage.service';
import { Injectable } from '@angular/core';
import { AjaxResult } from 'src/app/shared/interface/ajax-result';
import { CATEGORIES } from '../mock.categories';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Category[];
  categorySubject = new Subject<ActiveCategory>();
  constructor(private localStorageService: LocalStorageService) {
    this.categories = this.localStorageService.get(CATEGORY_KEY, CATEGORIES);
  }
  watchCategory(): Observable<ActiveCategory> {
    return this.categorySubject.asObservable();
  }

  /**
   * @description 向订阅者发送通知，传送数据
   * @param {ActiveCategory} category
   * @memberof CategoryService
   */
  setActiveCategory(category: ActiveCategory) {
    // console.log('aaa',category);
    this.categorySubject.next(category);
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
  getCategorys(): Category[] {
    return this.categories;
  }
  /**
   *
   * @description 增加一个大分类，并往大分类中增加一个小分类
   * @param  mainName 大分类的名称
   * @param  subName 小分类的名称
   * @return  增加好的新分类
   */
  insertMainCategory(mainName: string, subCategorys: Category[]): Category[] {
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
    this.saveToLocal();
    return this.categories;
  }
  // isUniqueName()

  /**
   *
   * @description 根据id获取大分类对象
   * @param  mainid id
   * @return 大分类对象
   */
  get(mainid: number): Category {
    for (const cate of this.categories) {
      if (cate.id === mainid) {
        return cate;
      }
    }
    throw new Error('id not found');
  }

  /**
   *
   * @description 删除一个主分类
   * @param {number} mainid
   * @memberof CategoryService
   */
  deleteMain(mainid: number) {
    this.deleteInArray(this.categories, mainid);
    this.saveToLocal();
  }

  /**
   *
   * @description 删除一个子分类
   * @param {Category} category 所属主分类
   * @param {number} subid 子分类id
   */
  deleteSub(category: Category, subid: number) {
    this.deleteInArray(category.children, subid);
    this.saveToLocal();
  }

  /**
   * @private
   * @description 从数组中删除某个指定的id
   * @param {Category[]} categorise 数组
   * @param {number} id id
   * @return {*} 
   * @memberof CategoryService
   */
  private deleteInArray(categorise: Category[], id: number) {
    for (const index in categorise) {
      if (categorise[index].id === id) {
        categorise.splice(parseInt(index), 1);
        return;
      }
    }
    throw new Error('id not found!');
  }
  /**
   *
   * @description 在大分类下增加一组小分类
   * @param  main 大分类
   * @param  subCategorys 小分类数组
   */
  update(main: Category, subCategorys: Category[]) {
    for (const cate of subCategorys) {
      main.children.push(cate);
    }
  }
  /**
   *
   * @description 增加一组小分类
   * @param mainid 大分类的id
   * @param subCategorys 小分类数组
   * @return 修改后的大分类
   */
  insertSubCategory(mainid: number, subCategorys: Category[]): Category {
    const cateEdit = this.get(mainid);
    this.update(cateEdit, subCategorys);
    this.saveToLocal();

    return cateEdit;
  }


  /**
   *
   * @description 保存到本地
   * @memberof CategoryService
   */
  saveToLocal() {
    this.localStorageService.set(CATEGORY_KEY, this.categories);
  }
}
