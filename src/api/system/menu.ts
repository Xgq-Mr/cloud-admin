import type { AddParamsType, EditParamsType, ResponseMenuType, SelectMenuType } from "@/types/menu"
import request from "@/utils/request"

// 菜单列表接口
export const getMenuApi = (data: Object) => request<ResponseMenuType>("/system/menu/search", "POST", data)

// 删除列表
export const delMenuApi = (id: number | string) => request(`/system/menu/` + id, "DELETE")

// 获取级联数据
export const selectMenu = () => request<SelectMenuType>("/system/menu/select")

// 新增菜单
export const addMenuApi = (data: AddParamsType) => request("/system/menu", "POST", data)

// 编辑菜单
export const editMenuApi = (data: EditParamsType) => request("/system/menu", "PUT", data)