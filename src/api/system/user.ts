
import type { RoleResponseType, addUSerParamsType, editUserType, resetPassType, userParamsType, userResponseType } from "@/types/user"
import request from "@/utils/request"

// 用户列表接口
export const getUserListApi = (userParams:userParamsType)=>request<userResponseType>("/system/user/search","POST",userParams)

// 删除用户接口
export const delUserApi = (userId:string)=>request(`/system/user/${userId}`,"DELETE")

// 新增角色接口
export const addUserApi = (userParams:addUSerParamsType)=>request("/system/user","POST",userParams)

// 分配角色接口
export const RoleListApi = ()=>request<RoleResponseType>("/system/role/list")

// 编辑用户接口
export const editUserApi = (userParams:editUserType)=>request("/system/user","PUT",userParams)

// 重置密码接口
export const resetPassApi = (userParams:resetPassType)=>request("/system/user/password","PUT",userParams)