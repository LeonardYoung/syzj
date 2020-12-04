import { CURRENT_USER_KEY } from './local-storage.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { UserVO } from './../interface/user';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CurrentUserInfoService {
  constructor(private localStorage: LocalStorageService) {
   }
}
