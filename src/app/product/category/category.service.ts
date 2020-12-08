import { LocalStorageService } from './../../shared/services/local-storage.service';
import { Injectable } from '@angular/core';
import { AjaxResult } from 'src/app/shared/interface/ajax-result';
import { CATEGORIES } from '../mock.categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private localStorageService: LocalStorageService ) { }
  async getAll(): Promise<AjaxResult> {
    const categories = this.localStorageService.get('Category', CATEGORIES);
    return {
      targetUrl: '',
      result: categories,
      success: true,
      error: null,
      unAuthorizedRequest: false
    };
  }
}
