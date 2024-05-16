<template>
  <el-menu router 
  background-color="transparent" 
  :default-openeds="['/system']" 
  :default-active="$route.path"
    text-color="#333"
    :collapse="store.isCollapse"
    class="el-menu-vertical-demo"
    >
    <el-menu-item index="/home">
      <svg-icon icon="House" />
      <span>首页</span>
    </el-menu-item>
    <!-- 系统管理 -->
    <el-sub-menu index="/system">
      <template #title>
        <svg-icon icon="Setting" />
        <span>系统管理</span>
      </template>
      <el-menu-item index="/system/menu">
        <svg-icon icon="Menu" />
        <span>菜单管理</span>
      </el-menu-item>
      <el-menu-item index="/system/role">
        <svg-icon icon="IceCream" />
        <span>角色管理</span>
      </el-menu-item>
      <el-menu-item index="/system/user">
        <svg-icon icon="User" />
        <span>用户管理</span>
      </el-menu-item>
    </el-sub-menu>
    <!-- 商品管理 -->
    <el-sub-menu index="/goods">
      <template #title>
        <svg-icon icon="Goods" />
        <span>商品管理</span>
      </template>
      <el-menu-item index="/goods/list">
        <svg-icon icon="GoodsFilled" />
        <span>商品列表</span>
      </el-menu-item>
      <el-menu-item index="/goods/category">
        <svg-icon icon="Operation" />
        <span>商品分类</span>
      </el-menu-item>
    </el-sub-menu>
    <!-- 商品分类 -->
    <el-menu-item index="/usian">
      <svg-icon icon="Link" />
      <span>积云官网</span>
    </el-menu-item>
    <el-menu-item index="/401">
      <svg-icon icon="Warning" />
      <span>401页面</span>
    </el-menu-item>
  </el-menu>
</template>
<script setup lang="ts">
import { useCollapse } from "@/stores/useCollapse"
const store = useCollapse()

</script>
<style lang='scss' scoped></style>