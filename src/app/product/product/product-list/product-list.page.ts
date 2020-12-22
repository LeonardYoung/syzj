import { Subscription } from 'rxjs';
import { ProductService } from './../product.service';
import { LoadingController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AjaxResult } from 'src/app/shared/interface/ajax-result';
import { timer } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  currentIndex = 0;
  total = -1;
  products: any[] = [];
  queryTerm = '';

  constructor(private navControl: NavController,
    private loadingController: LoadingController,
    private productService: ProductService) { }

  async ngOnInit() {
    // 自行添加初始化代码
    const loading = await this.loadingController.create({
      message: '正在加载数据，请稍候...',
      spinner: 'bubbles',
    });
    loading.present();
    this.queryList(()=>{
      loading.dismiss();
    })
  }


  onCategoryClick() {
    this.navControl.navigateForward('/product/category/list')
  }
  onRefresh(event) {
    this.queryList(()=>{
      event.target.complete();
    })
  }
  onInfinite(event){
    console.log(event)
    this.currentIndex++;
    try {
      const timerSub: Subscription = timer(1000).subscribe(() => {
        
        this.productService.getList(this.currentIndex, 10).then((ajaxResult) => {
          this.total = ajaxResult.result.totalCount;
          this.products = ajaxResult.result.list;
        })

      })
    } catch (error) {
      console.log(error);
      // 实际开发中应记录在日志文件中
    }
  }
  private queryList(completeFun: ()=>void) {
    try {
      const timerSub: Subscription = timer(1000).subscribe(() => {
        completeFun()
        this.productService.getList(this.currentIndex, 10).then((ajaxResult) => {
          this.total = ajaxResult.result.totalCount;
          this.products = ajaxResult.result.list;
          this.products = this.products.concat(ajaxResult.result.list);
        })

      })
    } catch (error) {
      console.log(error);
    }
  }
}
