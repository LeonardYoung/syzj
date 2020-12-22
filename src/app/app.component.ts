import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    // private androidPermissions: AndroidPermissions
  ) {
    this.initializeApp();
    // this.androidPermissions.requestPermissions(
    //   [
    //     this.androidPermissions.PERMISSION.CAMERA,
    //     this.androidPermissions.PERMISSION.GET_ACCOUNTS,
    //     // this.androidPermissions.PERMISSION
    //   ]);
    // this.checkPermissions();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }
  checkPermissions() {
    // @ts-ignore
    const permissions = cordova.plugins.permissions,
      permissionList = [permissions.CAMERA, permissions.WRITE_EXTERNAL_STORAGE];
    function errorCallback() {
      console.warn("permissions is not turned on");
    }
    function checkPermissionCallback(status) {
      if (!status.hasPermission) {
        permissions.requestPermissions(
          permissionList,
          status => {
            if (!status.hasPermission) errorCallback();
          },
          errorCallback);
      }
    }
    permissions.hasPermission(permissionList, checkPermissionCallback, null);
  }
}
