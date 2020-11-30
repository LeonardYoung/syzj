/*
 * @Author: your name
 * @Date: 2020-11-26 16:25:34
 * @LastEditTime: 2020-11-29 21:40:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \syzj\src\app\routes\passport\signup\signup-vo.ts
 */
export interface SignupVO {
    phone: string;
    email: string;
    shopName: string;
    password: string;
    confirmPassword: string;
    code: string;
}

export interface GetCodeVO {
    valid: boolean;
    text: string;
    btnDisable: boolean;
    timer: any;
    count: number;
    countMax: number;
}

/**
 * @description: 用户模型
 */
export interface UserVO {
    id: number;
    phone: string;
    email: string;
    createTime: Date;
    shopName: string;
}
/**
 * @description: 用户登录验证模型
 */
export interface LoginAccountVO {
    userid: number;
    identifier: string;
    credential: string;
}
/**
 * @description: 用户登录日志
 */
export interface LoginInfo {
    userid: number;
    phoneOrEmail: string;
    loginTime: number;
    expirationTime: number;
}