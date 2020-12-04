import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingService } from '../../setting/services/setting.service';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.page.html',
  styleUrls: ['./shop-edit.page.scss'],
})
export class ShopEditPage implements OnInit {
  title: string;
  property: string;
  value: string; // 用于ngModel，从shop对象的相关属性中获取数据
  constructor(private activatedRoute: ActivatedRoute, private settingService: SettingService, private router: Router) {
      this.activatedRoute.queryParams.subscribe(queryParams => {
      this.property = queryParams.property;
      this.title = queryParams.title;
    });
    // this.property = activatedRoute.snapshot.queryParams['property'];
    // this.title = this.activatedRoute.snapshot.queryParams['title'];
    // this.property = activatedRoute.snapshot.queryParams.property;
    // this.title = this.activatedRoute.snapshot.queryParams.title;
  }
  ngOnInit() {
  }
  onSave(){
    this.settingService.setUserProperty(this.property, this.value);
    console.log(this.property, this.value);
    this.router.navigateByUrl('tabs/me/shop');
  }
}
