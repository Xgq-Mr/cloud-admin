

import type { CategoryDataType, MemberType, SaleDataType, StatisticsType } from "@/types"
import request from "@/utils/request"
// 营业数据统计接口
export const getStatisticsApi = ()=>request<StatisticsType>("/home/statistics")

// 分类销售统计接口
export const getCategoryDataApi = ()=>request<CategoryDataType>("/home/categoryData")

// 30天销售趋势接口
export const getSaleDataApi = ()=>request<SaleDataType>("/home/30days/saleData")

// 会员消费top10接口
export const getMemberApi = ()=>request<MemberType>("/home/member/top10")