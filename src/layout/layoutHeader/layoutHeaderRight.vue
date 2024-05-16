<template>
    <div class="layout-header-right flex-center">
        <div @click="handleFullscreen" class="layout-header-right-icon">
            <svg-icon size="21" :icon="isFullscreen ? 'Aim' : 'FullScreen'" />
        </div>
        <div class="layout-header-right-icon">
            <el-switch @change="toggleDark" v-model="isDark" class="mt-2" inline-prompt active-icon="Moon"
                style="--el-switch-on-color: #333333 ; --el-switch-off-color: #dcdfe6" inactive-icon="Sunny" />
        </div>
        <!-- 下拉 -->
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link flex-center">
                <el-avatar :size="26" icon="UserFilled" />
                <span>{{ store.userInfo!.username }}</span>
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="index">首页</el-dropdown-item>
                    <el-dropdown-item command="401">401 </el-dropdown-item>
                    <el-dropdown-item command="404">404</el-dropdown-item>
                    <el-dropdown-item @click="toLayout" command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { useRouter } from "vue-router"
const router = useRouter()
import { useUserInfo } from "@/stores/useUserInfo"
const store = useUserInfo()


import { ref } from 'vue';
// 引入全屏 vueUse插件
import { useDark, useToggle, useFullscreen } from '@vueuse/core'
const { isFullscreen, toggle } = useFullscreen()
// 暗黑模式切换
const isDark = useDark({

    valueDark: 'dark dark2',
    valueLight: 'light',
})
const toggleDark = useToggle(isDark)
// 全屏切换
const handleFullscreen = () => {
    toggle()
}
// 下拉菜单方法
const handleCommand = (command: string | number | object) => {
    // ElMessage(`click on item ${command}`)
    switch (command) {
        case "index": router.push("/");
            break;
        case "401": router.push("/401");
            break;
        case "404": router.push("/404");
            break;
    }
}
// 退出登录
const toLayout = async () => {
    const res = await store.logout() 
    // console.log(res);
    if(res!.code === 20000){
        router.push("/login")
    }
}

</script>
<style lang='scss' scoped></style>