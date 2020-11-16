// import { Component, OnInit } from '@angular/core';
// import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
// import { IonSlides } from '@ionic/angular';
// @Component({
//   selector: 'app-guide',
//   templateUrl: './guide.page.html',
//   styleUrls: ['./guide.page.scss'],
// })
// export class GuidePage implements OnInit {
//   showSkip = true;
//   @ViewChild('slides', {static: false}) slides: IonSlides;
//   constructor() { }

//   ngOnInit() {
//   }
//   onSlideWillChange(event) {
//     console.log(event);
//     this.slides.isEnd().then((end) => {
//       this.showSkip = !end;
//     });
//   }

// }

import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { IonSlides } from '@ionic/angular';
@Component({
  selector: 'app-guide',
  templateUrl: './guide.page.html',
  styleUrls: ['./guide.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GuidePage implements OnInit {
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
      console.log('end=',end)
      this.showSkip = !end;
    });
  }
}

