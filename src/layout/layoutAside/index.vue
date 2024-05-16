<template>
      <el-aside class="layout-aside" :width="store.isCollapse?'60px':'200px'">
            <!-- Logo区域 -->
            <Logo/>
            <!-- Menu菜单 -->
            <Menu/>
      </el-aside>

</template>
<script setup lang="ts">
import { defineAsyncComponent, watch, watchEffect } from 'vue';
const Logo = defineAsyncComponent(()=>import("./Logo.vue"))
const Menu = defineAsyncComponent(()=>import("./Menu.vue"))
import {useCollapse} from "@/stores/useCollapse"
const store = useCollapse()
watchEffect(()=>{

})
</script>
<style lang='scss' scoped></style>