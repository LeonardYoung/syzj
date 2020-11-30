/*
 * @Author: your name
 * @Date: 2020-11-29 21:51:21
 * @LastEditTime: 2020-11-30 13:58:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \syzj\src\app\routes\passport\login\login.page.ts
 */
import { FormsModule } from '@angular/forms';

import { AuthenticationCodeService } from './../services/authentication-code.service';
import { IonSlides, ToastController } from '@ionic/angular';
import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { PassportServiceService } from './../services/passport-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private passportService: PassportServiceService, private toastController: ToastController) { }
  private username = '';
  private password = '';
  @ViewChild('loginForm') loginForm: NgForm;

  ngOnInit() {
  }
  // async onLogin(form: NgForm) {
  //   let toast: any;
  //   // 判断表单验证是否正确
  //   if (form.invalid) {
  //     toast = await this.toastController.create({
  //     duration: 3000
  //   });
  //   }
  //   // 判断的代码省略，参考之前的任务自行补上下面代码
  //   if (form.controls.useranme) {
  //     toast.message = '请输入您的手机号码或者邮箱';
  //     toast.present();
  //   }
  // }
  // onForgotPassword() {
  //   // 进入找回密码页面
  // }

}
