<template>
  <div class="layout-padding layout-system-role">
    <div class="system-menu-search">
      <el-form :model="queryData" :inline="true">
        <el-form-item label="菜单名称">
          <el-input
            v-model="queryData.name"
            placeholder="请输入账号/昵称/手机号"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="search" type="primary" @click="initRoleListApi"
            >查询</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button icon="plus" type="success" @click="handleAdd"
            >新增用戶</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 列表数据 -->
    <el-table :data="roleListData" width="100%" border stripe>
      <el-table-column label="序号" type="index" width="80" />
      <el-table-column label="角色名称" prop="roleName" />
      <el-table-column label="角色编码" prop="roleCode" />
      <el-table-column label="角色状态" prop="status">
        <template #default="{ row }">
          <el-tag v-if="row.status" type="success">启用</el-tag>
          <el-tag v-else type="warning">停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="remark" />
      <el-table-column label="操作" width="300">
        <template #default="{ row }">
          <el-button type="primary" link icon="edit" @click="handlePermission(row.roleName,row.id)">分配权限</el-button>
          <el-button type="warning" link icon="edit" @click="handleEdit(row)">编辑</el-button>
          <el-popconfirm
            width="auto"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="handleDel(row.id)"
            title="确定删除角色和所拥有的状态吗?"
          >
            <template #reference>
              <el-button type="danger" link icon="delete">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row justify="end" >
      <el-pagination
        v-model:current-page="queryData.current"
        v-model:page-size="queryData.size"
        :page-sizes="[10, 20, 30, 50]"
        :background="true"
        layout="total, sizes, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-row>
    <RoleDialog @refresh="refresh" ref="RoleDialogRef" />
    <RolePermission ref="RolePermissionRef"/>
  </div>
</template>
<script setup lang="ts">
import { RoleListApi, delRoleApi } from "@/api/system/role";
import type { ParamsRoleListType, ResponseRoleListType } from "@/types/role";
import { ElMessage, ElNotification } from "element-plus";
import { ref, defineAsyncComponent } from "vue";
// 异步加载子组件
const RoleDialog = defineAsyncComponent(
  () => import("./components/roleDialog.vue")
);
const RolePermission = defineAsyncComponent(
  () => import("./components/permission.vue")
);
// 列表请求参数
const queryData = ref<ParamsRoleListType>({
  name: "",
  current: 10,
  size: 1,
});
const roleListData = ref<ResponseRoleListType>();
const total = ref<number>();
// 获取角色列表数据
const initRoleListApi = async () => {
  try {
    const res = await RoleListApi(queryData.value);
    //    console.log(res);
    roleListData.value = res.data.records;
    total.value = res.data.total;
    ElMessage.success("获取成功!");
  } catch (error) {
    console.log(error);
  }
};
initRoleListApi();
// 练习table-column中格式化数据属性
const formatterStatus = (
  row: any,
  column: any,
  cellValue: any,
  index: number
) => {
  if (row.status) return "启用";
  return "禁用";
};
// 刪除角色
const handleDel = async (id: number) => {
  try {
    delRoleApi(id);
    initRoleListApi();
  } catch (error) {
    console.log(error);
  }
};
// 分页
const handleSizeChange = (val: number) => {
  queryData.value.size = val;
  initRoleListApi();
};
const handleCurrentChange = (val: number) => {
  queryData.value.current = val;
  initRoleListApi();
};
// 子组件ref实例化
const RoleDialogRef = ref<InstanceType<typeof RoleDialog>>();
const RolePermissionRef = ref<InstanceType<typeof RolePermission>>()
// 添加角色
const handleAdd = () => {
  RoleDialogRef.value!.openDialog("新增角色", "add");
};
// 编辑角色
const handleEdit = (row: ResponseRoleListType)=>{
  RoleDialogRef.value!.openDialog("编辑角色","edit",{row})
}
// 分配权限
const handlePermission = (roleName:string,id:string)=>{
  RolePermissionRef.value!.openDrawer(roleName,id)
}

// 子组件添加或修改后通知父组件
const refresh = () => {
  ElNotification({
    title: "保存成功!",
    type: "success",
  });
  initRoleListApi();
};
</script>
<style lang="scss" scoped>
  .layout-system-role{
    height: 100%;
    display: flex;
    flex-direction: column
  }
</style>
