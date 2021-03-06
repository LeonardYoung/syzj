import { Router } from '@angular/router';
import { Category } from './../../../shared/interface/category';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { ActionSheetController, NavController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.page.html',
  styleUrls: ['./category-list.page.scss'],
})
export class CategoryListPage implements OnInit {
  categories: Category[] = [];
  activeCategory: Category; // 当前选中的大分类
  activeSubCategory: Category;  // 当前选中的子分类
  constructor(private categoryService: CategoryService , private actionSheetController: ActionSheetController, private router: Router,
    private toast: ToastController,private nav: NavController) {
    // 初始化，否则模板渲染报错
    // this.activeCategory = {
    //   id: 0,
    //   name: '',
    //   children: []
    // };
    this.categories = this.categoryService.getCategorys();
    this.activeCategory = this.categories[0];
    // categoryService.getAll().then((ajaxResult) => {
    //   this.categories = ajaxResult.result;
    //   if (this.categories) {
    //     this.activeCategory = this.categories[0];
    //     // console.log(this.activeCategory)
    //   }
    // });
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
   async onSelectSubCategory(id: number,name: string){
    this.categoryService.setActiveCategory({
      id: id,
      name: name,
    })
    this.nav.navigateForward('/product/add')
   }

   async onPresentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
        header: '选择您的操作',
        buttons: [
          {
            text: '新增小分类',
            role: 'destructive',
            handler: () => {
              this.router.navigate(['product/category/add'], {
                queryParams: {
                  type: 1,
                  id: this.activeCategory.id,
                  mainName: this.activeCategory.name
                }
              });
            }
          },{
            text: '编辑分类',
            handler: () => {
              this.router.navigate(['product/category/edit'], {
                queryParams: {
                  id: this.activeCategory.id,
                }
              });
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
  // onClickAdd(){
  //   this.router.navigateByUrl('/product/category/add')
  // }

  ngOnInit() {
  }

}
