<template>
  <el-drawer
    v-model="visible"
    :title="drawerTitle"
    direction="rtl"
    @close="handleClose"
  >
  <!-- 树形数据 -->
  <el-tree
    style="max-width: 600px"
    :data="data"
    show-checkbox
    node-key="id"
    :default-checked-keys="[5]"
    :props="defaultProps"
    @setCheckedKeys="handleSetCheckedNodes"
  />
  <!-- 底部按钮 -->
  <template #footer>
    <el-button type="primary">提交</el-button>
    <el-button @setCheckedKeys="handleSetCheckedNodes">全选/不选</el-button>
    <el-button @click="handleUnpack">展开/收起</el-button>
    <el-button @click="handleClose">取消</el-button>
  </template>
  </el-drawer>
</template>
<script setup lang="ts">
import { ref ,nextTick} from "vue";

// 控制drawer显示状态
const visible = ref<boolean>(false);
const drawerTitle = ref<string>();
// 关闭之前的回调
const handleClose = () => {
    visible.value = false
};
// 树状图数据
const defaultProps = {
  children: 'children',
  label: 'label',
}
const data = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
]
// 打开drawer
const openDrawer = (title: string) => {
  visible.value = true;
  drawerTitle.value = `分配【${title}】的权限`;
};
// 暴露给父组件
defineExpose({
  openDrawer,
});
// 展开收起
const handleUnpack = ()=>{
   
   
}
// 全选全不选
const handleSetCheckedNodes = (keys:any, event:any)=>{
    console.log(keys, event);
    
}
</script>
<style lang="scss" scoped></style>
