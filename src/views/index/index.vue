<template>
    <div class="home-container layout-padding">
        <div class="home-container-static">
            营业数据统计
        </div>
        <el-row class="home-container-static-row" :gutter="10">
            <el-col :span="6" :sm="12" :lg="6" :md="12" :xs="24">
                <el-card style="height:inherit">
                    <div class="flex-center">订单笔数 <svg-icon icon="QuestionFilled" /></div>
                    <div class="flex-center" style="margin-top: 10px;">
                        <p style="font-size: 26px;">{{ statisticsList!.totalOrderNum }}</p> 笔
                    </div>
                </el-card>
            </el-col>
            <el-col :sm="12" :lg="6" :md="12" :xs="24">
                <el-card style="height:inherit;background-color: red">
                    <div class="flex-center">销售总额 <svg-icon icon="QuestionFilled" /></div>
                    <div class="flex-center" style="margin-top: 10px;">
                        <p style="font-size: 26px;"> {{ statisticsList!.totalSaleMoney }}</p> 元
                    </div>
                </el-card>
            </el-col>
            <el-col :sm="12" :lg="6" :md="12" :xs="24">
                <el-card style="height:inherit;background-color: #fba11a;">
                    <div class="flex-center">退款总额 <svg-icon icon="QuestionFilled" /></div>
                    <div class="flex-center" style="margin-top: 10px;">
                        <p style="font-size: 26px;"> {{ statisticsList!.totalReturnedMoney }}</p> 元
                    </div>
                </el-card>
            </el-col>
            <el-col :sm="12" :lg="6" :md="12" :xs="24">
                <el-card style="height:inherit;background-color: #5e8eed">
                    <div class="flex-center">综合收入 <svg-icon icon="QuestionFilled" /></div>
                    <div class="flex-center" style="margin-top: 10px;">
                        <p style="font-size: 26px;">{{ statisticsList!.totalIncomeMoney }}</p> 元
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <!-- 分类销售统计 -->
        <el-row :gutter="10">
            <el-col :lg="8" :md="8" :sm="8" :xs="24">
                <el-card shadow="hover">
                    <div>
                        <p style="font-size: 20px;font-weight: 600;">分类销售统计</p>
                        <span>每种商品分类的近30天的销量数据</span>
                    </div>
                    <div ref="CategoryDataRef" style="width: 350px;height: 350px"></div>
                </el-card>
            </el-col>
            <el-col :lg="16" :md="16" :sm="16" :xs="24">
                <el-card shadow="hover">
                    <div>
                        <p style="font-size: 20px;font-weight: 600;">近30天销售趋势</p>
                    </div>
                    <div ref="SaleDataDataRef" style="width: 800px;height: 300px"></div>
                </el-card>
            </el-col>
        </el-row>
        <!-- 会员消费统计 -->
        <el-row style="margin-top: 20px;" :gutter="10">
            <el-col :lg="16" :md="16" :sm="16" :xs="24">
                <el-card shadow="hover">
                    <div>
                        <p style="font-size: 20px;font-weight: 600;">会员消费TOP10</p>
                    </div>
                    <div ref="MemberDataRef" style="width: 800px;height: 300px"></div>
                </el-card>
            </el-col>
            <el-col :lg="8" :md="8" :sm="8" :xs="24">
                <el-card shadow="hover">
                    <div>
                        <p style="font-size: 20px;font-weight: 600;">气温仪表盘°C</p>
                    </div>
                    <div ref="InstrumentDataRef" style="width: 350px;height: 350px"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>

</template>
<script setup lang="ts">
import { getCategoryDataApi, getMemberApi, getSaleDataApi, getStatisticsApi } from '@/api/index/index';
import type { Data, } from '@/types';
import { InstrumentApi, MemberDataApi, SaleDataApi, categoryDataApi } from '@/utils/echarts';
import { onMounted, ref } from 'vue';

// 获取营业数据
const statisticsList = ref<Data | any>({
    "totalOrderNum": 0,
    "totalSaleMoney": 0,
    "totalReturnedMoney": 0,
    "totalIncomeMoney": 0
})
const getStatistics = async () => {
    const res = await getStatisticsApi()
    statisticsList.value = res.data
}
getStatistics()
// 气温仪表盘实例化
const InstrumentDataRef = ref()
// 组件挂载前调用ECharts
onMounted(() => {
    // 分类销售统计
    getCategoryData()
    // 30天销售趋势
    getSaleData()
    // 会员消费TOP10
    getMemberData()
    // 气温仪表盘
    InstrumentApi(InstrumentDataRef.value)
})
// 分类销售统计
const CategoryDataRef = ref()
const getCategoryData =async ()=>{
    const res = await getCategoryDataApi()
    categoryDataApi(CategoryDataRef.value, res.data)
}
// 30天销售趋势
const SaleDataDataRef = ref()
const getSaleData = async ()=>{
    const res = await getSaleDataApi()
    SaleDataApi(SaleDataDataRef.value,res.data)
}

// 会员消费TOP10
const MemberDataRef = ref()
const getMemberData = async()=>{
    const res = await getMemberApi()
    console.log(res);
    MemberDataApi(MemberDataRef.value, res.data)
}
</script>
<style lang='scss' scoped>
.home-container {
    .home-container-static {
        width: 100%;
        height: 25px;
        line-height: 25px;
        font-size: 20px;
        padding-left: 10px;
        border-left: 2px solid var(--el-color-primary);
        margin: 15px 0;
    }

    .home-container-static-row {
        .el-col {
            height: 100px;
            margin-bottom: 20px;

            .el-card {
                height: 100px;
                background-color: #3dca5a;
                color: white
            }

        }
    }

    .el-row {

        // margin-bottom: 20px;
        .el-col {
            .el-card {
                height: 380px;

            }
        }

    }
}
</style>