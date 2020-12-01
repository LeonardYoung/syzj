import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {

  constructor() { }
  public appPages = [
    { title: '开店论坛', url: '/home', icon: 'people' },
    { title: '手机橱窗', url: '/home', icon: 'call' },
    { title: '邀请有礼', url: '/home', icon: 'gift' },
    { title: '资金账户', url: '/home', icon: 'cash' },
    { title: '反馈建议', url: '/home', icon: 'mail' },
    { title: '帮助中心', url: '/home', icon: 'help' },
  ];

  ngOnInit() {
  }

}
