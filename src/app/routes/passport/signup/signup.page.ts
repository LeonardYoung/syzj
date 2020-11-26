import { IonSlides } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  slideIndex = 0;
  constructor() { }

  // @ViewChild('signupSlides', {static: true}) signupSlides: IonSlides;
  // ngOnInit() {
  // }
  @ViewChild('signupSlides', {static: true}) signupSlides: IonSlides;
  // 字符串'signupSlides'和模板中的#signupSlides引用变量的名称一致
  ngOnInit() {
    this.signupSlides.lockSwipeToNext(false);
  }
  onNext(){
    this.signupSlides.slideNext();
  }
  onPrevious() {
    this.signupSlides.slidePrev();
  }
  onNextClick(){
    this.onNext();
  }
  onPreClick(){
    this.onPrevious();
  }
  onSlideWillChange(event) {
    event.target.getActiveIndex().then((index) => {
      // console.log(index);
      this.slideIndex = index;
    });
  }

}
