import { CurrentUserInfoService } from './../../../shared/services/current-user-info.service';
import { Injectable } from '@angular/core';
import { LocalStorageService, USER_KEY, ACCOUNT_KEY, USER_ID_MAX_KEY, LOGIN_INFO_KEY, CURRENT_USER_KEY } from 'src/app/shared/services/local-storage.service';
import { LoginAccount, SignupVO, LoginInfo } from './../signup/signup-vo';
import { UserVO } from './../../../shared/interface/user';
import { AjaxResult } from './../../../shared/interface/ajax-result';




@Injectable({
  providedIn: 'root'
})
export class PassportServiceService {
  /**
   * @description: 构造函数，从本地读出数据
   */
  constructor(private localStorage: LocalStorageService, private curUserService: CurrentUserInfoService) {
    this.users = this.localStorage.get(USER_KEY, []);
    this.accounts = this.localStorage.get(ACCOUNT_KEY, []);
    this.userIdMax = this.localStorage.get(USER_ID_MAX_KEY, 1);
    this.loginInfo = this.localStorage.get(LOGIN_INFO_KEY, {
      expirationTime: 0
    });
    this.currentUser = this.localStorage.get(CURRENT_USER_KEY, null);
  }
  private currentUser: UserVO;
  private users: UserVO[] = [];
  private accounts: LoginAccount[] = [];
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
  addLoginAccount(account: LoginAccount){
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
    if (this.loginInfo === null){
      return false;
    }
    // // 重新读取，确保主动退出时不再自动登录
    // this.loginInfo = this.localStorage.get(LOGIN_INFO_KEY, {
    //   expirationTime: 0
    // });
    // console.log(this.loginInfo.expirationTime,'  ', Date.now().valueOf())
    if (this.loginInfo.expirationTime > Date.now().valueOf()){
      this.saveLoginInfo(this.loginInfo.userid, this.loginInfo.phoneOrEmail, 5);
      return true;
    }
    return false;
  }

  /**
   * @description 退出
   *
   */
  logOut() {
    this.loginInfo = null;
    this.localStorage.remove(LOGIN_INFO_KEY)
  }
  /**
   * @description 获取上一次登录的用户名
   * @return 用户名或者邮箱
   */
  getLastLoginName(): string{
    if (this.loginInfo === null){
      return '';
    }
    return this.loginInfo.phoneOrEmail;
  }

  /**
   *
   * @description 根据id保存当前用户信息，登录时调用
   * @param usr 当前用户信息
   */
  saveCurrentUser(usrId: number){
    for ( const user of this.users){
      if ( user.id === usrId){
        this.currentUser = user;
        this.localStorage.set(CURRENT_USER_KEY, this.currentUser);
        break;
      }
    }
  }

  /**
   * @description  获取当前登录的用户信息
   * @return   当前登录的用户信息
   */
  getCurrentUser(): UserVO{
    return this.currentUser;
  }

  /**
   * @description  修改当前登录的用户信息
   * @param  property 属性
   * @param  value 名称
   */
  editCurrentUserProperty(property: string, value: string){
    // if ( property in this.currentUser){
    this.currentUser[property] = value;
    this.localStorage.set(CURRENT_USER_KEY, this.currentUser);
    // 从用户表中找到该用户，更改属性
    for (const usr of this.users){
      if (usr.id === this.currentUser.id){
        usr[property] = value;
        this.localStorage.set(USER_KEY, this.users);
        break;
      }
      }
    // }
    // else {
    //   throw new Error('no such property');
    // }
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
            this.saveCurrentUser(user.userid);
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
   * @description 格式化时间
   * @param date 时间对象
   */
　formatDateTime(date: Date): string {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const mString = m < 10 ? ('0' + m) : m;
    const d = date.getDate();
    const dString = d < 10 ? ('0' + d) : d;
    const h = date.getHours();
    const hString = h < 10 ? ('0' + h) : h;
    const minute = date.getMinutes();
    const minuteString = minute < 10 ? ('0' + minute) : minute;
    const second = date.getSeconds();
    const secondString = second < 10 ? ('0' + second) : second;
    return y + '-' + mString + '-' + dString + ' ' + hString + ':' + minuteString + ':' + secondString;
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
        createTime: this.formatDateTime(new Date()),
        shopName: input.shopName,
      };
      const accountPhone: LoginAccount = {
        userid: newId,
        identifier: input.phone,
        credential: input.password,
      };
      const accountEmail: LoginAccount = {
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
