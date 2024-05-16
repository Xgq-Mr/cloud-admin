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
      ref="treeRef"
      :default-expand-all="defaultExpandAll"
      :props="defaultProps"
    >
      <!-- 由于有三级情况所以需要自定义节点内容 -->
      <template #default="{ node, data }">
        <span class="custom-tree-node flex-center">
          <svg-icon
            v-if="data.meta.icon"
            :icon="filters(data.meta.icon)"
          ></svg-icon>
          <span>{{ data.meta.title }}</span>
        </span>
      </template>
    </el-tree>
    <!-- 底部按钮 -->
    <template #footer>
      <el-popconfirm
        width="220"
        confirm-button-text="确定"
        cancel-button-text="取消"
        title="确定提交权限吗?"
        @confirm="handleConfirm"
      >
        <template #reference>
          <el-button type="primary">提交</el-button>
        </template>
      </el-popconfirm>

      <el-button @click="handleSetCheckedAll">全选/不选</el-button>
      <el-button @click="handleUnpack">展开/收起</el-button>
      <el-button @click="handleClose">取消</el-button>
    </template>
  </el-drawer>
</template>
<script setup lang="ts">
import { getMenuApi } from "@/api/system/menu";
import { checkedIdsApi, saveRoleApi } from "@/api/system/role";
import type { ResponseMenuType } from "@/types/menu";
import { ElNotification, type ElTree } from "element-plus";
import { ref } from "vue";

// 控制drawer显示状态
const visible = ref<boolean>(false);
const drawerTitle = ref<string>();
const RoleId = ref<string>();
// 关闭之前的回调
const handleClose = () => {
  visible.value = false;
};
// 树状图数据
const defaultProps = {
  children: "children",
  label: "label",
};
const data = ref<ResponseMenuType>();
// 打开drawer
const openDrawer = async (title: string, id: string) => {
  visible.value = true;
  drawerTitle.value = `分配【${title}】的权限`;
  RoleId.value = id;
  if (visible.value) {
    // 请求树形数据
    const res = await getMenuApi();
    data.value = res.data;
    // 请求需要勾选的子节点数组
    const res2 = await checkedIdsApi(RoleId.value!);
    for (let i = 0; i < res2.data.length; i++) {
      treeRef.value!.setChecked(res2.data[i], true, false);
    }
  }
};
// 暴露给父组件
defineExpose({
  openDrawer,
});
// tree组件实例化
const treeRef = ref<InstanceType<typeof ElTree>>();
// 全选反选
const checkedAll = ref<boolean>(false);
const handleSetCheckedAll = () => {
  checkedAll.value = !checkedAll.value;
  // 参数:要选中的节点构成的数组
  if (checkedAll.value) {
    treeRef.value!.setCheckedNodes(data.value as any);
  } else {
    treeRef.value!.setCheckedNodes([]);
  }
};

// 控制tree折叠展开的变量
const defaultExpandAll = ref<boolean>(false);
// 展开收起方法
const handleUnpack = () => {
  defaultExpandAll.value = !defaultExpandAll.value;
  // treeRef.value!.root 为tree节点
  changeNodesStatus(treeRef.value!.root);
};
const changeNodesStatus = (node: any) => {
  // expanded 属性控制当前节点的展开收起
  for (let i = 0; i < node.childNodes.length; i++) {
    node.childNodes[i].expanded = defaultExpandAll.value;
    // 判断节点里面是否有子节点 如果有 递归调用 当前方法
    if (node.childNodes[i].childNodes) {
      changeNodesStatus(node.childNodes[i]);
    }
  }
};
// 过滤
const filters = (icon: string) => {
  return icon.replace("ele-", "");
};
// 提交权限
const handleConfirm = async () => {
  try {
    console.log(treeRef.value!.getCheckedKeys());
    const Ids1 = treeRef.value!.getCheckedKeys();
    const Ids2 = treeRef.value!.getHalfCheckedKeys();
    await saveRoleApi(RoleId.value as string, [...Ids1, ...Ids2] as string[]);
    visible.value = false;
    ElNotification({
      title: "分配权限成功",
      type: "success",
    });
  } catch (error) {
    console.log(error);
  }
};
</script>
<style lang="scss" scoped></style>
