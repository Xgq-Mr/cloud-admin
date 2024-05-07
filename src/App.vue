<template>
  <SvgIcon @click="getTest" icon="Edit" size="20" color="red"/>
  <!-- <component :is="12344"></component> -->
  <!-- <vnode  /> -->
  <router-view></router-view>
</template>
<script setup lang="ts">
import {h} from "vue"
import {test} from "@/api"
// 通过 h 函数渲染 类名为test 的div标签 并且内容设置为早上好 
// 添加子节点 类名为 span 的span 标签 内容为456
// const vnode = h("div",{class:"test"},["早上好",h("span",{class:"span"},456)])

// 练习EasyMock 请求数据

const getTest = async ()=>{
  const res = await test()
  console.log(res)
}
// getTest()





</script>
<style lang='scss' scoped>

</style>