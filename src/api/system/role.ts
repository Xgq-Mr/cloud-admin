
// 引入二次封装的axios
import type { AddParams, ParamsRoleListType, ResponseRoleListType } from "@/types/role";
import request from "@/utils/request";

// 获取角色列表
export const RoleListApi = (roleParams:ParamsRoleListType)=>request<ResponseRoleListType>("/system/role/search","POST",roleParams)

// 删除角色
export const  delRoleApi = (id:number)=>request("/system/role/"+id,"DELETE")

// 新增角色
export const addRoleApi = (roleParams:AddParams)=>request("/system/role","POST",roleParams)

// 编辑角色
export const editRoleApi = (roleParams:AddParams)=>request("/system/role","PUT",roleParams)

// 封装默认选中的树形ID
export const checkedIdsApi = (roleId:number|string)=>request(`/system/role/${roleId}/menu/ids`)

// 提交权限接口
export const saveRoleApi = (roleId:string,saveParams:string[])=>request(`/system/role/${roleId}/menu/ids`,"POST",saveParams)