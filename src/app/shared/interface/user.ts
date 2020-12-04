/**
 * @description: 用户模型
 */
export interface UserVO {
    id: number;
    phone: string;
    email: string;      // 邮箱
    createTime: string; // 注册时间，字符串格式
    // 店铺信息
    shopName?: string;       // 店铺名称
    ShopNickName?: string;   // 店铺简称
    OwnerName?: string;  // 店主姓名
    ShopPhone?: string;  // 店铺类型
    tradeType?: string;  // 行业类型
}
