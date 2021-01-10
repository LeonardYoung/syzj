import { ProductAutit } from './../../../shared/interface/product-autit';
import { Subscription } from 'rxjs';
import { ProductService } from './../product.service';
import { LoadingController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AjaxResult } from 'src/app/shared/interface/ajax-result';
import { timer } from 'rxjs';
import { env } from 'process';

const NUM_OF_PAGE=7;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  currentIndex = 0;
  audit: ProductAutit = {
    totalRemain:0,
    totalPrice:0
  };
  products: any[] = [];
  queryTerm = '';
  allLoaded = false;  //数据是否全部加载完
  // categoryId = -1;

  constructor(private navControl: NavController,
    private loadingController: LoadingController,
    private productService: ProductService) { }

  async ngOnInit() {
    
  }
  
  async ionViewWillEnter () {
    const loading = await this.loadingController.create({
      message: '正在加载数据，请稍候...',
      spinner: 'bubbles',
    });
    loading.present();
    this.queryList(()=>{
      loading.dismiss();
    })
    this.productService.getAudit().then((audit)=>{
      this.audit = audit;
    })
  }


  onCategoryClick() {
    this.navControl.navigateForward('/product/category/list')
  }
  onRefresh(event) {
    this.allLoaded = false;
    this.currentIndex = 0;
    this.products = [];
    this.queryList(()=>{
      if(event)
        event.target.complete();
    })
    this.productService.getAudit().then((audit)=>{
      this.audit = audit;
    })
  }

  onInfinite(event){
    // console.log(this.allLoaded)
    if(this.allLoaded){
      timer(1000).subscribe(()=>{
        event.target.complete();
      })
      return;
    }
    this.currentIndex++;
    this.queryList(()=>{
      event.target.complete();
    })
  }
  onInput(event){
    this.productService.getListByCondition(event.target.value)
    .then((ajaxResult) => {
      this.products = ajaxResult.result.list;
      return ajaxResult;
    })
    .then((res)=>{
      return this.productService.getAudit(res.result.list);
    })
    .then((auditResult)=>{
      this.audit = auditResult;
    })
  }
  private queryList(completeFun: ()=>void) {
    try {
      const timerSub: Subscription = timer(1000).subscribe(() => {
        completeFun()
        this.productService.getList(this.currentIndex, NUM_OF_PAGE).then((ajaxResult) => {
          const cnt = ajaxResult.result.totalCount;
          if(cnt > 0){
            this.products = this.products.concat(ajaxResult.result.list);
          }
          else{
            this.allLoaded = true;
          }
        })
      })
    } catch (error) {
      console.log(error);
    }
  }
}
