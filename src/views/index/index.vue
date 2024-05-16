<template>
    <div class="home-container layout-padding">
        <div class="home-container-static">
            营业数据统计
        </div>
        <el-row class="home-container-static-row" :gutter="10">
            <el-col :sm="12" :lg="6" :md="12" :xs="24">4</el-col>
            <el-col :sm="12" :lg="6" :md="12" :xs="24">3</el-col>
            <el-col :sm="12" :lg="6" :md="12" :xs="24">2</el-col>
            <el-col :sm="12" :lg="6" :md="12" :xs="24">1</el-col>
        </el-row>
        <!-- 分类销售统计 -->
        <el-row :gutter="10">
            <el-col :lg="8" :md="8" :sm="8" :xs="24">
                <el-card shadow="hover">
                    分类销售统计
                </el-card>
            </el-col>
            <el-col :lg="16" :md="16" :sm="16" :xs="24">
                <el-card shadow="hover">
                    分类销售统计
                </el-card>
            </el-col>
        </el-row>
        <!-- 会员消费统计 -->
        <el-row style="margin-top: 20px;" :gutter="10">
            <el-col :lg="16" :md="16" :sm="16" :xs="24">
                <el-card shadow="hover">
                    会员消费
                </el-card>
            </el-col>
            <el-col :lg="8" :md="8" :sm="8" :xs="24">
                <el-card shadow="hover">
                    气温仪表盘
                </el-card>
            </el-col>
        </el-row>
    </div>

</template>
<script setup lang="ts">
import { ref } from 'vue';


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
            background-color: #fac858;
            margin-bottom: 20px;
            // margin-right: 20px;
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