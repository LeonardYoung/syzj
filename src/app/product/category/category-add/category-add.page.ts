import { CategoryService } from './../category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/interface/category';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.page.html',
  styleUrls: ['./category-add.page.scss'],
})
export class CategoryAddPage implements OnInit {
  // private title = 'default';
  private type: number;
  private id: number;
  private categoryVO: Category[] = [];
  // private faName: string;
  // private categories: Category[] = [];
  // 需初始化，否则模板渲染错误
  // private activeCategory: Category = { name: '', id: 0, children: [] }; // 当前选中的大分类
  private mainName: ' ';

  valueMain: string;
  valueSub: string;

  constructor(private activatedRoute: ActivatedRoute, private categoryService: CategoryService, private router: Router) {
    // 增加一个初试值
    this.categoryVO.push({
      id: -1,
      name: ''
    });
    // this.activeCategory
    this.categoryService.getAll().then((ajaxResult) => {
      // this.categories = ajaxResult.result;
      // if (this.categories) {
      //   this.activeCategory = this.categories[0];
      // }
    }).then(() => {
      this.activatedRoute.queryParams.subscribe(queryParams => {
        // debugger;
        // tslint:disable-next-line: radix
        this.type = parseInt(queryParams.type);
        // tslint:disable-next-line: radix
        this.id = parseInt(queryParams.id);
        this.mainName = queryParams.mainName;
        // 新增的是小分类，则需要找出所属的大分类
        // if (this.type === 1) {
        //   for ( const cate of this.categories){
        //     if ( this.id === cate.id){
        //       // this.activeCategory = cate;
        //     }
        //   }
        // }
      });
    });
  }

  ngOnInit() {
  }
  onSave(){
    if (this.type === 0){
      // 增加一个大分类
      this.categoryService.mainCategoryAdd(this.valueMain, this.categoryVO);
      // console.log(this.categories);
    }
    else if ( this.type === 1){
      this.categoryService.subCategoryAdd(this.id, this.categoryVO);
      // this.activeCategory = this.categoryService.subCategoryAdd()
    }

    this.router.navigateByUrl('product/category/list');
  }
  onAddSubCategory(){
    this.categoryVO.push({
      id: -1,
      name: '',
    })
  }

}
