import { PassportServiceService } from './../routes/passport/services/passport-service.service';
import { APP_KEY } from './../routes/guide/guide.page';
import { LocalStorageService } from './../shared/services/local-storage.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StartAppGuard implements CanActivate {
  constructor(private LocalStorage: LocalStorageService, private router: Router, private passportServics: PassportServiceService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      const appConfig: any = this.LocalStorage.get(APP_KEY, {
        version: '1.5.2',
        mobile: '18850566407',
        launched: false
      });
      if (appConfig.launched === false ){
        appConfig.launched = true;
        this.LocalStorage.set(APP_KEY, appConfig);
        return true;
      }
      else if (this.passportServics.autoLogin()){
        this.router.navigateByUrl('tabs/home');
      }
      else{
        this.router.navigateByUrl('passport/login');
        return false;
      }
  }
}
