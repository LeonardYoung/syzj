import { CopyrightComponent } from './components/copyright/copyright.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from './services/local-storage.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDirective } from './directives/confirm.directive';
import { PhoneValidatorDirective } from './directives/phone-validator.directive';
import { PasswordValidtorDirective } from './directives/password-validtor.directive';



@NgModule({
  declarations: [
    CopyrightComponent,
    ConfirmDirective,
    PhoneValidatorDirective,
    PasswordValidtorDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  providers: [
    LocalStorageService
    ],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CopyrightComponent,
    ConfirmDirective,
    PhoneValidatorDirective,
    PasswordValidtorDirective
  ]
})
export class SharedModule { }
