import { Category } from './../../../shared/interface/category';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.page.html',
  styleUrls: ['./category-list.page.scss'],
})
export class CategoryListPage implements OnInit {
  categories: Category[] = [];
  activeCategory: Category; // 当前选中的大分类
  activeSubCategory: Category;  // 当前选中的子分类
  constructor(private categoryService: CategoryService , private actionSheetController: ActionSheetController) {
    // 初始化，否则模板渲染报错
    this.activeCategory = {
      id: 0,
      name: '',
      children: []
    };
    categoryService.getAll().then((ajaxResult) => {
      this.categories = ajaxResult.result;
      if (this.categories) {
        this.activeCategory = this.categories[0];
        // console.log(this.activeCategory)
      }
    });
   }
   onSelectCategory(id: number){
      // console.log('id=', id);
      for ( const cate of this.categories){
        if ( cate.id === id){
          this.activeCategory = cate;
          // this
        }
      }
   }
   onSelectSubCategory(id: number){
    console.log('subid=', id);
   }

   async onPresentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
        header: '选择您的操作',
        buttons: [
          {
            text: '新增小分类',
            role: 'destructive',
            handler: () => {
              console.log('Destructive clicked');
            }
          },{
            text: '编辑分类',
            handler: () => {
              console.log('Archive clicked');
            }
          },{
            text: '取消',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
    await actionSheet.present();
  }

  getItemColor(id: number): string {
    if (id === this.activeCategory.id) {
      return '';
    } else {
      return 'light';
    }
  }

  ngOnInit() {
  }

}
