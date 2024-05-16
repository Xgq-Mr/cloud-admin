<template>
    <div class="layout-header-left flex-center">
        <div style="margin: 0 10px;" @click="store.isCollapse = !store.isCollapse" class="layout-left-icon flex-center">
            <svg-icon :icon="store.isCollapse ? 'Expand' : 'Fold'"></svg-icon>
        </div>
        <div class="layout-left-breadcrumb flex-center">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item  v-for="(item,ind) in breadcrumbList" :key="ind">
                    <span v-if="ind === breadcrumbList!.length-1">{{item.meta.title}}</span>
                    <a v-else @click="handleLink(item)">{{ item.meta.title }}</a>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useCollapse } from "@/stores/useCollapse"
import { onMounted, ref, watchEffect } from "vue";
const store = useCollapse()
import { onBeforeRouteUpdate, useRoute,useRouter, type RouteLocationNormalized, type RouteRecordNormalized } from "vue-router"
const route = useRoute()
const router = useRouter()
// 创建变量保存面包屑数据
const breadcrumbList = ref<RouteRecordNormalized[]>()

// 路由更新时触发的方法
onBeforeRouteUpdate((to)=>{
    getBreadCrumb(to)
    const matched = to.matched.filter((item)=>item.meta.title && item.meta.icon)
    breadcrumbList.value = matched
})
// 定义一个方法，使用者方法可以获取路由跳转的信息
const getBreadCrumb = (to:RouteLocationNormalized)=>{
    // console.log(to);
    const matched = to.matched.filter((item)=>item.meta.title && item.meta.icon)
    breadcrumbList.value = matched
}
getBreadCrumb(route)
const handleLink = (to:RouteRecordNormalized)=>{
    // console.log(to);
    if(to.redirect) router.push(to.redirect as string)
    else router.push(to.path)
}
// watchEffect(() => {
//     breadcrumbList.value = route.matched.filter((item) => item.meta.title && item.meta.icon)
// })

</script>
<style lang='scss' scoped></style>