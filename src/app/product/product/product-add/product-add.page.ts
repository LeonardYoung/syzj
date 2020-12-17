import { Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from './../product';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../category/category.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.page.html',
  styleUrls: ['./product-add.page.scss'],
})
export class ProductAddPage implements OnInit, OnDestroy {

  // product: Product = {
  //   id: '',
  //   name: '',
  //   categoryId: 0,
  //   categoryName: '默认分类',
  //   barcode: '',
  //   images: [],

  //   supplierName: '',
  //   // price:0,
  //   // purchasePrice: 0,
  //   // remain: 0

  // };
  private product: Product;
  subscription: Subscription;
  constructor(private actionSheetController: ActionSheetController, private productService: ProductService,
    private router: Router, private categoryService: CategoryService, private navControl: NavController,
    private alertController: AlertController) {
    this.initProduct();
    this.subscription = this.categoryService.watchCategory().subscribe(
      (activeCategory) => {
        this.product.categoryId = activeCategory.id;
        this.product.categoryName = activeCategory.name;
      },
      (error) => {
        console.log(error)
      })
    // console.log('construct');
  }
  private initProduct(): void {
    this.product = {
      id: '',
      name: '',
      categoryId: 0,
      categoryName: '默认分类',
      barcode: '',
      images: [],

      supplierName: '',
      // price:0,
      // purchasePrice: 0,
      // remain: 0

    };
  }

  ngOnInit() {
  }
  onSelectCatagory() {
    this.navControl.navigateForward('/product/category/list')
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  async onPresentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: '选择您的操作',
      buttons: [
        {
          text: '拍照',
          handler: () => {
            // console.log('Destructive clicked ', this.activeCategory.id);
          }
        }, {
          text: '从相册选取',
          handler: () => {
            // console.log('Archive clicked');
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    await actionSheet.present();
  }
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: '新增供货商',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: '输入供货商名称'
        },
        {
          name: 'phone',
          type: 'number',
          placeholder: '输入供货商电话'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '保存',
          handler: (data) => {
            // 参数data中包含了name和phone两个属性
            // 其它代码省略
            console.log('Confirm Ok', data);
            this.product.supplierName = data.name;
            this.product.supplierPhone = data.phone;
          }
        }
      ]
    });

    await alert.present();
  }
  onSave(continu: boolean = false) {
    this.productService.insert(this.product).then((res) => {
      console.log(res);
    })
    if (continu) {
      this.initProduct();
      // this.product = {
      //   id: '',
      //   name: '',
      //   categoryId: 0,
      //   categoryName: '',
      //   barcode: '',
      //   images: [],
      //   // price:0,
      //   // purchasePrice: 0,
      //   // remain: 0

      // };
    }
    else {
      this.router.navigateByUrl('/product/category/list')
    }
  }

}
