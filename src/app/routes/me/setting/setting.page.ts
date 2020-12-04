import { LOGIN_INFO_KEY } from './../../../shared/services/local-storage.service';
import { Router } from '@angular/router';
import {  PassportServiceService } from './../../passport/services/passport-service.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(private passportServer: PassportServiceService, private router: Router) { }

  ngOnInit() {
  }
  onQuit(){
    this.passportServer.logOut();
    this.router.navigateByUrl('/passport/login');
  }

}
