/*
 * @Author: your name
 * @Date: 2020-11-19 11:10:09
 * @LastEditTime: 2020-11-30 16:02:33
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \syzj\src\app\routes\guide\guide.page.ts
 */
import { LocalStorageService } from './../../shared/services/local-storage.service';
import {Router} from '@angular/router';
import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { IonSlides } from '@ionic/angular';
export const APP_KEY = 'App';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.page.html',
  styleUrls: ['./guide.page.scss'],
  encapsulation: ViewEncapsulation.None
})

export class GuidePage implements OnInit {
  constructor(private localStorageService: LocalStorageService, private router: Router) { }
  showSkip = true;
  @ViewChild('slides', {static: false}) slides: IonSlides;
  ngOnInit() {
    // const appConfig = this.localStorageService.get('App', {
    //   version: '1.5.2',
    //   mobile: '18850566407',
    //   launched: false
    // });
    // if (appConfig.launched === true){
    //   this.router.navigateByUrl('home/tabs/home');
    // }else{
    //   appConfig.launched = true;
    //   this.localStorageService.set('App', appConfig);
    // }
  }
  onSlideWillChange(event) {
    event.target.isEnd().then((end: any) => {
      this.showSkip = !end;
    });
  }
  onSkip(){
    // 跳转到注册页
    this.router.navigateByUrl('passport/signup')
  }
}

