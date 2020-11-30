import { FormsModule } from '@angular/forms';
import { AuthenticationCodeService } from './../services/authentication-code.service';
import { AlertController, IonSlides, ToastController } from '@ionic/angular';
import { Component, OnInit, ViewChild, NgModule, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { PassportServiceService } from './../services/passport-service.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit {

  constructor(private passportService: PassportServiceService, private toastController: ToastController,
    private alertController: AlertController, private router: Router) { }
  private username = '';
  private password = '';
  // @ViewChild('loginForm') loginForm: NgForm;

  ngOnInit() {
  }

  /**
   * @description 视图加载完成后进行自动登录判断，
   *
   */
  ngAfterViewInit(){
    // debugger;
    if (this.passportService.autoLogin()){
      console.log('自动登录');
      this.router.navigateByUrl('home');
    }
    else {
      // 显示上一次登录的用户名
      this.username = this.passportService.getLastLoginName();
      console.log(this.username)
    }
  }

  /**
   * @description: 监听登录按钮，执行登录验证
   * @param  form 表单
   */
  async onLogin(form: NgForm) {
    let toast: any;
    // 判断表单验证是否正确
    if (form.invalid) {
        toast = await this.toastController.create({
        duration: 3000
      });
    }
    if (this.username === '') {
      toast.message = '请输入您的手机号码或者邮箱';
      toast.present();
    }
    else if (this.password === '') {
      toast.message = '请输入您的密码';
      toast.present();
    }
    // 登录校验
    this.passportService.login(this.username, this.password).then( result => {
      console.log('登录成功');
      this.router.navigateByUrl('home');
    }).catch( err => {
      // console.log('err=', err);
      this.alertController.create({
        header: '警告',
        buttons: ['确定']
      }).then( alert => {
        alert.message = err.error.message;
        alert.present();
      });
    });
  }
}
