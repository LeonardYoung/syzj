import { UserVO } from './../../../shared/interface/user';
import { SettingService } from './../setting/services/setting.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  constructor(private setingService: SettingService) { }
  private currentUser: UserVO;

  ngOnInit() {
    this.currentUser = this.setingService.getUser();
  }

}
