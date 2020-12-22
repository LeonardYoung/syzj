import { CategoryService } from './../category.service';
import { Category } from 'src/app/shared/interface/category';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController, IonItemSliding, ModalController, ToastController } from '@ionic/angular';
import { CategoryNameEditPage } from '../category-name-edit/category-name-edit.page';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.page.html',
  styleUrls: ['./category-edit.page.scss'],
})
export class CategoryEditPage implements OnInit {

  id: number;
  category: Category = {
    id: -1,
    name: ''
  };

  constructor(private activeRouter: ActivatedRoute, private categoryService: CategoryService, private modalCtrl: ModalController,
    private alertController: AlertController, private router: Router,
    private toastctl: ToastController) {
    this.activeRouter.queryParams.subscribe(quertParsm => {
      // tslint:disable-next-line: radix
      this.id = parseInt(quertParsm.id);
      this.category = this.categoryService.get(this.id);
    });
  }

  ngOnInit() {
  }
  async presentModal(name: string) {
    const modal = await this.modalCtrl.create({
      component: CategoryNameEditPage,
      componentProps: { value: name }
    });
    await modal.present();
    return modal.onWillDismiss();
  }
  async onEditCategoryName(item: IonItemSliding) {
    // console.log('edit')
    item.close();
    const { data } = await this.presentModal(this.category.name);
    if (data) {
      this.category.name = data;
      this.categoryService.saveToLocal();
    }
  }
  async onEditSubCategoryName(item: IonItemSliding, subCategory: Category) {
    item.close();
    const { data } = await this.presentModal(subCategory.name);
    if (data) {

      subCategory.name = data;
      this.categoryService.saveToLocal();
    }
  }
  async showError() {
    const toast = await this.toastctl.create({
      message: '删除失败，分类下有商品',
      duration: 3000
    });
    toast.present()
  }
  async onDelete(item: IonItemSliding, subId?: number) {
    item.close();
    const alert = await this.alertController.create({
      header: '你确认要删除吗!',
      message: '请先删除该类别下的所有商品记录',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah',blah);
          }
        }, {
          text: '确认',
          handler: () => {
            console.log('Confirm Okay');
            try {
              if (subId) {
                this.categoryService.deleteSub(this.category, subId);
              }
              else {
                this.categoryService.deleteMain(this.category.id);
                this.router.navigateByUrl('product/category/list')
              }
            } catch (error) {
              this.showError();
            }
            
          }
        }
      ]
    });

    await alert.present();
  }

}
