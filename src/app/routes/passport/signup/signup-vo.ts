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
 * @description: 用户登录验证模型，模拟服务端
 */
export interface LoginAccount {
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