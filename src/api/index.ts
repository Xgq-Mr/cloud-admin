import request from "../utils/request";

// 登录接口
export const loginApi = (data:any)=> request("/auth/token","POST",data)
// 获取用户信息
export const userInfoApi = ()=> request("/system/menu/user","GET")
// 退出登录
export const logoutApi = ()=>request("/auth/layout","POST")
                                                                                                                                                                                                         