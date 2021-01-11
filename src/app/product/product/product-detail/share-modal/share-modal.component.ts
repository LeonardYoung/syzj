import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.scss'],
})
export class ShareModalComponent implements OnInit {

  private items:any[] = [
    {
      name:'微信',
      icon:'logo-wechat'
    },
    {
      name:'支付宝',
      icon:'logo-alipay'
    },
    {
      name:'推特',
      icon:'logo-twitter'
    },
    {
      name:'脸书',
      icon:'logo-facebook'
    },

  ]
  constructor(private modalCtl: ModalController) { }

  ngOnInit() {}
  onClickCannel(){
    this.modalCtl.dismiss('cannel');
  }
  onClickItem(name:string){
    this.modalCtl.dismiss(name)
  }

}
