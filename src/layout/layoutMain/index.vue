<template>
    <el-main class="layout-main">
        <el-scrollbar>
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <keep-alive>
                        <component :key="$route.meta.name" v-if="$route.meta.cache" :is="Component" />
                    </keep-alive>
                </transition>
                <transition name="fade" mode="out-in">
                    <component v-if="!$route.meta.cache" :is="Component" />
                </transition>
            </router-view>
        </el-scrollbar>
    </el-main>
</template>
<script setup lang="ts">


</script>
<style lang='scss' scoped>
.fade-enter-active {
  transition: all 0.3s linear;
}

.fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}


.fade-leave-to {
  transform: translateX(20%);
  opacity: 0;
}
.fade-enter-from{
    transform: translateX(-20%);
  opacity: 0;
}
</style>