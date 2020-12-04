import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { UserVO } from './../../../../shared/interface/user';
import { Injectable } from '@angular/core';
import { PassportServiceService } from 'src/app/routes/passport/services/passport-service.service';
import { APP_KEY } from 'src/app/routes/guide/guide.page';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  // user: any = {};
  appConfig: any = {};
  constructor(private passportService: PassportServiceService, private localStorage: LocalStorageService) {
    this.appConfig = this.localStorage.get(APP_KEY, {
      version: '1.5.2',
      mobile: '18850566407',
      launched: false
    });
   }
  getUser(): UserVO{
    return this.passportService.getCurrentUser();
  }
  /**
   * @description 设置用户的一个属性
   * @param property 属性名称
   * @param value 属性值
   */
  setUserProperty(property: string, value: string){
    try {
      this.passportService.editCurrentUserProperty(property, value);
    } catch (err) {
      console.log('setUserProperty Error:', err);
    }

  }
  /**
   *
   * @description 获取app配置信息
   * @returns app配置
   */
  getAppConfig(): any{
    return this.appConfig;
  }
  // load(userFromLogin: any) {
  //   const shop: any = {};
  //   this.user = {
  //     ...userFromLogin,
  //     ...shop
  //   }
  // }


}
