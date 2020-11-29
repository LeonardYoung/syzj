/*
 * @Author: your name
 * @Date: 2020-11-29 13:55:18
 * @LastEditTime: 2020-11-29 16:54:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \syzj\src\app\routes\passport\services\authentication-code.service.ts
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationCodeService {
  // 用于保存验证码
  private code: string;
  // 存放验证码的过期时间
  private deadline: number;
  constructor() {
    this.code = '';
  }
  /**
   * @description: 生成指定长度的随机数字
   * @param count 指定的长度
   * @return 随机数
   */
  createCode(count: number): string{
    this.code = '';
    // 10分钟内有效
    this.deadline = Date.now() + 60 * 10 * 1000;
    for (let i = 0; i < count; i++) {
      this.code = this.code + Math.floor(Math.random() * 10) ;
    }
    console.log('code=', this.code);
    return this.code;
  }
  /**
   * @description: 验证用户输入的短信验证码是否一致，是否过期
   * @param value 校验的验证码
   * @return 验证码正确返回true，否则返回false
   */
  validate(value: string): boolean{
    const now = Date.now();
    // console.log(value.length)
    // console.log(this.code.length)
    // console.log(this.code==value)
    // console.log('checking ', now , this.deadline)
    return value == this.code && now < this.deadline;
  }
}
