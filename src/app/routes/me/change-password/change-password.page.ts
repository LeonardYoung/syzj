import { Router } from '@angular/router';
import { PassportServiceService } from 'src/app/routes/passport/services/passport-service.service';
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
  constructor(private passportService: PassportServiceService, private router: Router) { }

  ngOnInit() {
  }
  onChange(){
    this.passportService.changePassword(this.newPassword);
    this.router.navigateByUrl('tabs/me/setting');
  }

}
