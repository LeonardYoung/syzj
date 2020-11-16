// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-welcome',
//   templateUrl: './welcome.page.html',
//   styleUrls: ['./welcome.page.scss'],
// })
// export class WelcomePage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { IonSlides } from '@ionic/angular';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WelcomePage implements OnInit {
  constructor() { }
  showSkip = true;
  @ViewChild('slides', {static: false}) slides: IonSlides;
  ngOnInit() {
  }
  onSlideWillChange(event) {
    // console.log(this.slides);
    // // this.slides.isE
    // this.slides.isEnd().then((end) => {
    //   this.showSkip = !end;
    // });
    event.target.isEnd().then((end) => {
      // console.log('end=',end)
      this.showSkip = !end;
    });
  }
}
