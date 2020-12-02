import { CURRENT_USER_KEY } from './../passport/services/passport-service.service';
import { UserVO } from './../../shared/interface/user';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {

  constructor(private localStorage: LocalStorageService) { }
  public appPages = [
    { title: '开店论坛', url: '/home', icon: 'people' },
    { title: '手机橱窗', url: '/home', icon: 'call' },
    { title: '邀请有礼', url: '/home', icon: 'gift' },
    { title: '资金账户', url: '/home', icon: 'cash' },
    { title: '反馈建议', url: '/home', icon: 'mail' },
    { title: '帮助中心', url: '/home', icon: 'help' },
  ];
  private currentUser: UserVO;

  ngOnInit() {
    this.currentUser = this.localStorage.get(CURRENT_USER_KEY, null);
    // console.log(this.currentUser);
  }

}
