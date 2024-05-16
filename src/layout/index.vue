<template>
    <div class="index">
        <el-container class="layout-container">
            <LayoutAside/>
            <el-container direction="vertical">
                <layoutHeader/>
                <layoutMain/>
            </el-container>
        </el-container>
    </div>
</template>
<script setup lang="ts">
// 异步加载组件 defineAsyncComponent
import {defineAsyncComponent} from "vue"
// 异步加载组件
// 侧边栏组件
const LayoutAside = defineAsyncComponent( ()=>import("./layoutAside/index.vue") )
// 头部组件
const layoutHeader = defineAsyncComponent( ()=>import("./layoutHeader/index.vue") )
// 主内容组件
const layoutMain = defineAsyncComponent( ()=>import("./layoutMain/index.vue") )

</script>
<style lang='scss' scoped>

</style>