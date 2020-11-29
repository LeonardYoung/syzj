/*
 * @Author: your name
 * @Date: 2020-11-29 20:56:53
 * @LastEditTime: 2020-11-29 21:09:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \syzj\src\app\shared\interface\ajax-result.ts
 */
export interface AjaxResult {
    targetUrl?: string;
    result?: any;
    success: boolean;
    error?: {
    message: string;
    details?: string;
    };
    unAuthorizedRequest?: boolean;
}