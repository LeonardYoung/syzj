// import { UserVO } from './../../../shared/interface/user';
import { AuthenticationCodeService } from './../services/authentication-code.service';
import { SignupVO, GetCodeVO } from './signup-vo';
import { AlertController, IonSlides } from '@ionic/angular';
import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { PassportServiceService } from './../services/passport-service.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit{

  private slideIndex = 0;
  private phoneRegistered = false;
  signup: SignupVO = {
    phone: '',
    email: '',
    shopName: '',
    password: '',
    confirmPassword: '',
    code: ''
  };
  getCode: GetCodeVO = {
    valid: true,
    text: '获取验证码',
    btnDisable: false,
    timer: null,
    count: 0,
    countMax: 60,
  };
  constructor( private codeService: AuthenticationCodeService, private passportService: PassportServiceService,
    private alertController: AlertController) {}
  @ViewChild('signupSlides', {static: true}) signupSlides: IonSlides;
  @ViewChild('phoneForm') phoneForm: NgForm;
  @ViewChild('phone') phone: NgModule;
  @ViewChild('code') code: NgModule;
  // @ViewChild('shopName') shopName: NgModule;
  // @ViewChild('email') email: NgModule;
  // @ViewChild('password') password: NgModule;
  // @ViewChild('confirmPassword') confirmPassword: NgModule;
  ngOnInit() {
    this.signupSlides.lockSwipeToNext(false);
  }
  slideActive(index: number): boolean {
    return this.slideIndex === index;
  }
  /**
   * @description: 监听“下一个”按钮
   */
  onNext(){
    this.signupSlides.slideNext();
  }
  /**
   * @description: 监听“上一个”按钮
   */
  onPrevious() {
    this.signupSlides.slidePrev();
  }
  /**
   * @description: 切换到下一个slide
   */
  onNextClick(){
    this.onNext();
  }
  /**
   * @description: 切换到上一个slide
   */
  onPreClick(){
    this.onPrevious();
  }

  /**
   * @description: 监听slide切换的事件
   * @param event 事件
   */
  onSlideWillChange(event) {
    event.target.getActiveIndex().then((index: number) => {
      this.slideIndex = index;
    });
  }
  /**
   * @description: 监听验证码页面的下一步按钮
   */
  onCodeNext(){
    if (this.codeService.validate(this.signup.code)){
      this.getCode.valid = true;
      this.onNext();
      console.log('check code sucess');
    }else{
      this.getCode.valid = false;
    }
  }
  /**
   * @description: 监听手机号更改事件
   */
  onPhoneChange(){
    this.phoneRegistered = false;
  }
  /**
   * @description: 监听表单：提交手机号码
   * @param phoneForm 表单
   */
  onSubmitPhone(phoneForm: NgForm){
    if (this.passportService.isUniquePhone(this.signup.phone)){
      this.phoneRegistered = false;
      this.onNext();
    }
    else {
      // console.log('手机号已被注册');
      this.phoneRegistered = true;
    }
  }
  /**
   * @description: 监听发送验证码按钮
   */
  onSendSMS(){
    // 生成4位验证码
    this.codeService.createCode(4);

    // 使按钮不可用
    this.getCode.btnDisable = true;
    this.getCode.text = '60 s后重新获取';
    // 开启定时器
    this.getCode.count = this.getCode.countMax;
    const stream = new Observable(observe => {
      this.getCode.timer = setInterval(() => {
        this.getCode.count--;
        observe.next();
      }, 1000);
    });
    stream.subscribe(() => {
      if ( this.getCode.count === 0){
        this.getCode.btnDisable = false;
        window.clearInterval(this.getCode.timer);
        this.getCode.text = '获取验证码';
      }
      else{
        this.getCode.text = this.getCode.count + ' s后重新获取';
      }
    });
  }
  /**
   * @description: 检查两次输入的密码是否一致
   * @return 相同返回true
   */
  checkConfirmPassord(): boolean{
    return this.signup.password === this.signup.confirmPassword;
  }
  /**
   * @description: 监听注册页面的“下一页”按钮,验证成功后，执行注册操作。
   */
  onSignupNext(){
    if (this.checkConfirmPassord()){
      this.passportService.signup(this.signup).then( result => {
        console.log('成功', result);
        // 下一页
        this.onNext();
      }).catch( err => {
        console.log('失败', err);
        this.alertController.create({
          header: '错误',
          buttons: ['确定']
        }).then( alert => {
          alert.message = err.error.message;
          alert.present();
        });
      });
    }
  }

}
