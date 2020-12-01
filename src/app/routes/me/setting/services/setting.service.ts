import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  user: any = {};
  appConfig: any = {};
  constructor() { }
  load(userFromLogin: any) {
    const shop: any = {};
    this.user = {
      ...userFromLogin,
      ...shop
    }
  }


}
