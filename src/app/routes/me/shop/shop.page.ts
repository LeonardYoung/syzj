import { SettingService } from './../setting/services/setting.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  constructor(private settingService: SettingService) { }

  ngOnInit() {
  }

  get user(): any{
    return this.settingService.user;
  }

}
