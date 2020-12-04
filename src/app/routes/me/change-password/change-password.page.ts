import { Component, OnInit, ViewChild } from '@angular/core';
// import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  newPassword = '';
  repeatPassword = '';
  // @ViewChild('form') form: NgForm;
  constructor() { }

  ngOnInit() {
  }
  onChange(){
    console.log('on change');
  }

}
