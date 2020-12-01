import { SharedModule } from './../../shared/shared.module';
import { SettingPage } from './setting/setting.page';
import { ShopPage } from './shop/shop.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MePageRoutingModule } from './me-routing.module';

import { MePage } from './me.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MePageRoutingModule
  ],
  exports:[
    FormsModule
  ],
  declarations: [
    MePage,
    ShopPage,
    SettingPage
  ]
})
export class MePageModule {}
