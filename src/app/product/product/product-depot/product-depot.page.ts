import { NavController, ToastController } from '@ionic/angular';
import { Product } from './../product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-depot',
  templateUrl: './product-depot.page.html',
  styleUrls: ['./product-depot.page.scss'],
})
export class ProductDepotPage implements OnInit {

  DaText="入库";
  nowProduct:Product = {
    id:"",
    remain:0
  };
  nowSegment:number = 1;
  depotNum:number;
  constructor(private activatedRoute: ActivatedRoute, private productService : ProductService,
    private nav: NavController,private toastctl: ToastController) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe( params => {
      console.log(params)
      this.productService.getProductById(params.id).then(ajaxResult =>{
        this.nowProduct = ajaxResult.result;
        if(isNaN(this.nowProduct.remain)){
          this.nowProduct.remain = 0;
        }
      })
    })
  }
  segmentChanged(event: any){
    if(event.detail.value == "1"){
      this.DaText="入库";
      this.nowSegment = 1;
    }else if(event.detail.value == "2"){
      this.DaText="出库";
      this.nowSegment = 2;
    }
  }
  onClickDepot(depotForm){
    this.productService.productDepot(this.nowProduct.id,this.nowSegment,this.depotNum).then(async ajaxResult=>{
      const toast = await this.toastctl.create({
        message: '修改成功',
        duration: 1000
      });
      if(ajaxResult.success){
        this.nav.back();
      }
      else{
        // console.log(ajaxResult.error.message)
        toast.message = ajaxResult.error.message
      }
      toast.present()
    })
  }

}
