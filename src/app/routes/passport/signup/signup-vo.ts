/*
 * @Author: your name
 * @Date: 2020-11-26 16:25:34
 * @LastEditTime: 2020-11-29 20:45:04
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

export interface UserVO {
    id: number;
    phone: string;
    email: string;
    createTime: Date;
    shopName: string;
}

export interface LoginAccountVO {
    userid: number;
    identifier: string;
    credential: string;
}