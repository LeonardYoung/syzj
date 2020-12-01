/*
 * @Author: your name
 * @Date: 2020-11-29 16:23:33
 * @LastEditTime: 2020-11-30 15:52:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \syzj\src\app\routes\passport\services\passport-service.service.ts
 */
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { UserVO, LoginAccountVO, SignupVO, LoginInfo} from './../signup/signup-vo';
import { AjaxResult } from './../../../shared/interface/ajax-result';

const USER_KEY = 'Users';
const ACCOUNT_KEY = 'Accounts';
const USER_ID_MAX_KEY = 'UserIdMax';
const LOGIN_INFO_KEY = 'LoginInfo';

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
    this.loginInfo = this.localStorage.get(LOGIN_INFO_KEY, {
      expirationTime: 0
    });
  }
  private users: UserVO[] = [];
  private accounts: LoginAccountVO[] = [];
  private userIdMax: number;
  private loginInfo: LoginInfo;

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
    // console.log(this.users);
  }
  /**
   * @description: 增加一个账户
   * @param account 账户
   */
  addLoginAccount(account: LoginAccountVO){
    this.accounts.push(account);
    this.localStorage.set(ACCOUNT_KEY, this.accounts);
    // console.log(this.accounts);
  }
  /**
   * @description: 保存登录日志
   * @param  id 用户id
   * @param  pm 用户名或者邮箱
   * @param  overDay 记住登录状态的超时时间（天）
   */
  saveLoginInfo(id: number, pm: string, overDay: number){
    const dtime = 1000 * 3600 * 24 * overDay;
    const info: LoginInfo = {
      userid : id,
      phoneOrEmail: pm,
      loginTime: Date.now(),
      expirationTime: Date.now() +  dtime,
    };
    this.loginInfo = info;
    this.localStorage.set(LOGIN_INFO_KEY, info);
  }

  /**
   * @description 判断是否可以自动登录，可以登录返回真，并更新登录时间
   * @return 可以登录返回true
   */
  autoLogin(): boolean{
    if(this.loginInfo === null){
      return false;
    }
    // console.log(this.loginInfo.expirationTime,'  ', Date.now().valueOf())
    if (this.loginInfo.expirationTime > Date.now().valueOf()){
      this.saveLoginInfo(this.loginInfo.userid, this.loginInfo.phoneOrEmail, 5);
      return true;
    }
    return false;
  }
  /**
   * @description 获取上一次登录的用户名
   * @return 用户名或者邮箱
   */
  getLastLoginName(): string{
    return this.loginInfo.phoneOrEmail;
  }
  /**
   *
   * @param phoneOrEmail 手机号或者邮箱
   * @param  password 密码
   * @return 验证结果
   */
  async login(phoneOrEmail: string, password: string): Promise<AjaxResult> {
    return new Promise((resolve, reject) => {
      const res: AjaxResult = {
        success: true,
      };
      for ( const user of this.accounts){
        if (user.identifier == phoneOrEmail || user.identifier == phoneOrEmail){
          if (user.credential == password) {
            // 过期时间设为5天
            this.saveLoginInfo(user.userid, phoneOrEmail, 5);
            resolve(res);
            return;
          }
          else{
            res.success = false;
            res.error = {
              message: '登录失败，密码错误'
            };
            reject(res);
            return;
          }
        }
      }
      res.success = false;
      res.error = {
        message: '登录失败，未找到该用户'
      };
      reject(res);
      return;
    });
  }

  /**
   * @description 注册入口，注册一个新用户
   * @param input 用户信息
   * @return 注册状态
   */
  async signup(input: SignupVO) {
    const res: AjaxResult = {
      success : true
    };
    if (this.isUniquePhone(input.phone)){
      const newId = this.getNewUserId();
      const user: UserVO = {
        id: newId,
        phone: input.phone,
        email: input.email,
        createTime: new Date(),
        shopName: input.shopName,
      };
      const accountPhone: LoginAccountVO = {
        userid: newId,
        identifier: input.phone,
        credential: input.password,
      };
      const accountEmail: LoginAccountVO = {
        userid: newId,
        identifier: input.email,
        credential: input.password,
      };
      // 添加用户模型
      this.addUser(user);
      // 分别为手机号和邮箱添加登录模型
      this.addLoginAccount(accountEmail);
      this.addLoginAccount(accountPhone);
      return res;
    }
    else{
      res.success = false;
      res.error = {
        message: '您的手机号已被注册'
      };
      return res;
    }
  }
  /**
   * @description: 手机号是否可注册
   * @param  phone 手机号
   * @return 可注册返回true
   */
  isUniquePhone(phone: string){
    for (const user of this.users){
      if(user.phone === phone){
        return false;
      }
    }
    return true;
  }
}
