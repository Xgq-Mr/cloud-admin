<template>
          <div class="layout-logo">
                <img style="width: 26px;height: 26px;" src="http://vue3.mengxuegu.com/assets/logo-8ba32897.png" alt="">
                <span v-show="!store.isCollapse">积云-Vue3全家桶项目</span>
          </div>
</template>
<script setup lang="ts">
import {useCollapse} from "@/stores/useCollapse"
const store = useCollapse()

</script>
<style lang='scss' scoped></style>