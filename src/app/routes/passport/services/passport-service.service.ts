/*
 * @Author: your name
 * @Date: 2020-11-29 16:23:33
 * @LastEditTime: 2020-11-29 20:26:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \syzj\src\app\routes\passport\services\passport-service.service.ts
 */
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { UserVO, LoginAccountVO } from './../signup/signup-vo';

const USER_KEY = 'Users';
const ACCOUNT_KEY = 'Accounts';
const USER_ID_MAX_KEY = 'UserIdMax';

@Injectable({
  providedIn: 'root'
})
export class PassportServiceService {
  /**
   * @description: 构造函数，从本地读出数据
   */
  constructor(private localStorage: LocalStorageService) {
    this.users = this.localStorage.get(USER_KEY, []);
    this.accounts = this.localStorage.get(ACCOUNT_KEY, []);
    this.userIdMax = this.localStorage.get(USER_ID_MAX_KEY, 0);
  }
  private users: UserVO[] = [];
  private accounts: LoginAccountVO[] = [];
  private userIdMax: number;

  /**
   * @description: 获取一个新用户id
   * @return 新用户id
   */
  getNewUserId(): number{
    this.userIdMax++;
    this.localStorage.set(USER_ID_MAX_KEY, this.userIdMax);
    return this.userIdMax - 1;
  }

  /**
   * @description: 增加一个用户
   * @param  user 用户
   */
  addUser(user: UserVO){
    this.users.push(user);
    this.localStorage.set(USER_KEY, this.users);
    console.log(this.users);
  }
  /**
   * @description: 增加一个账户
   * @param account 账户
   */
  addLoginAccount(account: LoginAccountVO){
    this.accounts.push(account);
    console.log(this.accounts);
  }
  isUniquePhone(phone: string){
    for (const user of this.users){
      if(user.phone === phone){
        return false;
      }
    }
    return true;
  }
}
