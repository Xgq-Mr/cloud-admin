<template>
     <el-header class="layout-header" >
          <!-- 左侧面包屑区域 -->
          <BreadcrumbLeft/>
          <!-- 右侧下拉菜单区域 -->
          <DropdownRight/>
     </el-header>
</template>
<script setup lang="ts">
import {defineAsyncComponent} from "vue"
const BreadcrumbLeft = defineAsyncComponent(()=>import("./layoutHeaderLeft.vue"))
const DropdownRight = defineAsyncComponent(()=>import("./layoutHeaderRight.vue"))
</script>
<style lang='scss' scoped>

</style>