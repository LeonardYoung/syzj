import { PovercpntComponent } from './povercpnt/povercpnt.component';
import { PassportServiceService } from 'src/app/routes/passport/services/passport-service.service';
import { AlertController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { ProductService } from './../product.service';
import { Product } from './../product';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { generate } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  nowId: string;
  nowProduct: Product = {
    id: "",
  };
  verification: boolean = false;
  nowPopover:any = null;
  
  constructor(private activatedRoute: ActivatedRoute, private productService : ProductService,
    private alertController: AlertController,private passportService: PassportServiceService,
    private toastCtl: ToastController,public popoverController: PopoverController,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe( params => {
      this.nowId = params.id;
      this.productService.getProductById(this.nowId).then(ajaxResult =>{
        this.nowProduct = ajaxResult.result;
        if(isNaN(this.nowProduct.remain)){
          this.nowProduct.remain = 0;
        }
      })
    })
  }
  onClickShare(){

  }
  openPopover(ev){
    this.presentPopover(ev);
    
  }
  checkVf(){
    this.presentAlertPrompt()
  }
  async presentPopover(ev: any) {
    this.nowPopover = await this.popoverController.create({
      component: PovercpntComponent,
      // cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });

    await this.nowPopover.present();
    const { data } = await this.nowPopover.onWillDismiss();
    if(data === 'edit'){
      const toast = await this.toastCtl.create({
        message:'功能未开发',
        duration: 1500
      });
      toast.present()
    }
    else if(data === 'delete'){
      this.productService.deleteProductById(this.nowId)
      this.router.navigateByUrl('product/list')
    }

  }
  async showVfResult(result:boolean){
    const toast = await this.toastCtl.create({
      duration: 1500
    });
    toast.message = ( result ? '验证成功':'验证失败')
    toast.present()

  }
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: '验证用户名密码',
      inputs: [
        {
          name: 'username',
          type: 'text',
          placeholder: '输入用户名'
        },
        {
          name: 'password',
          type: 'password',
          placeholder: '输入密码'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('Confirm Cancel');
          }
        }, {
          text: '确定',
          handler: (data) => {
            this.passportService.verification(data.username,data.password).then(ajaxresult=>{
              this.showVfResult(ajaxresult.success)
              this.verification = ajaxresult.success;
            })
          }
        }
      ]
    });

    await alert.present();
  }

}
