
import type { AddGoodsParamsType, ListParamsType, ListResponseType, SelectGoodsType } from "@/types/goodsList";
import request from "@/utils/request";

// 获取商品列表
export const getGoodsListApi = (goodsParams:ListParamsType)=>request<ListResponseType>("/goods/search","POST",goodsParams)

// 删除商品
export const delGoodsApi = (id:number)=> request(`/goods/${id}`,"DELETE")

// 状态更新接口
export const changeStatusApi = (goodsParams:{id:number,status:number})=> request("/goods/status","PUT",goodsParams)

// 添加商品接口
export const addGoodsApi = (goodsParams:AddGoodsParamsType) => request("/goods","POST",goodsParams)

// 级联数据接口
export const selectGoodsApi = ()=>request<SelectGoodsType>("/goods/category/list","GET")

// 编辑商品接口
export const editGoodsApi = (goodsParams:AddGoodsParamsType)=>request("/goods","PUT",goodsParams)