<script setup lang="ts">
import { delUserApi, getUserListApi } from "@/api/system/user";
import type { userResponseType } from "@/types/user";
import { ElMessage, ElNotification } from "element-plus";
import { ref,defineAsyncComponent } from "vue";
const userDialog = defineAsyncComponent(()=>import("./components/userDialog.vue"))
// 请求列表数据
const queryData = ref({
  keyword: "",
  current: 20,
  size: 1,
});
// 请求列表数据
const userList = ref<userResponseType[]>();
const total = ref<number>();
const initUserListApi = async () => {
  try {
    const res = await getUserListApi(queryData.value);
    ElMessage.success("获取成功");
    userList.value = res.data.records;
    total.value = res.data.total;
  } catch (error) {
    console.log(error);
  }
};
initUserListApi();
// 分页
const handleSizeChange = (val: number) => {
  queryData.value.size = val;
  initUserListApi();
};
const handleCurrentChange = (val: number) => {
  queryData.value.current = val;
  initUserListApi();
};
// 删除用户
const handleDelete = async (id: string) => {
  try {
    const res = await delUserApi(id);
    ElNotification({
      title: "刪除成功",
      type: "success",
    });
  } catch (error) {
    console.log(error);
  }
};
// 子组件ref
const userDialogRef = ref<InstanceType<typeof userDialog>>()
// 新增用户
const handleAdd = ()=>{
  userDialogRef.value?.openDialog("add","新增用户")
}
// 编辑用户
const handleEdit = (row:userResponseType)=>{
  userDialogRef.value?.openDialog("edit","修改用户",{row})
}
</script>
<template>
  
  <div class="user layout-padding layout-system-user">
    <!-- 新增模态框 -->
  <userDialog ref="userDialogRef"/>
  <!-- 头部内容 -->
    <div class="system-menu-search">
      <el-form :model="queryData" :inline="true">
        <el-form-item>
          <el-input
            v-model="queryData.keyword"
            placeholder="请输入账号/昵称/手机号"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="search" type="primary" @click="initUserListApi"
            >查询</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button icon="plus" type="success" @click="handleAdd">新增用戶</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 列表数据 -->
    <el-table :data="userList" border style="width: 100%" stripe>
      <el-table-column align="center" prop="nickName" label="用户昵称" />
      <el-table-column align="center" prop="username" label="用户账号" />
      <el-table-column align="center" prop="mobile" label="手机号" />
      <el-table-column align="center" prop="email" label="邮箱" />
      <el-table-column
        align="center"
        prop="accountNonLocked"
        label="账号锁定"
        sortable
      >
        <template #default="{ row }">
          <el-tag
            effect="dark"
            :type="row.accountNonLocked ? 'success' : 'danger'"
            >{{ row.accountNonLocked ? "正常" : "锁定" }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="accountNonExpired"
        label="账号过期"
        sortable
      >
        <template #default="{ row }">
          <el-tag
            effect="dark"
            :type="row.accountNonExpired ? 'success' : 'danger'"
            >{{ row.accountNonExpired ? "正常" : "锁定" }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="credentialsNonExpired"
        label="密码过期"
        sortable
      >
        <template #default="{ row }">
          <el-tag
            effect="dark"
            :type="row.credentialsNonExpired ? 'success' : 'danger'"
            >{{ row.credentialsNonExpired ? "正常" : "锁定" }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="创建时间"
        sortable
      />
      <el-table-column align="center" label="操作" width="260">
        <template #default="{ row }">
          <el-button type="primary" link icon="key">密码重置</el-button>
          <el-button type="warning" link icon="edit" @click="handleEdit(row)">编辑</el-button>
          <el-popconfirm
            width="220"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="handleDelete(row.id)"
            :title="`确定永久删除【${row.nickName}】吗?`"
          >
            <template #reference>
              <el-button type="danger" link icon="delete">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- 分页 -->
    <el-row justify="end">
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
  </div>
</template>
<style lang="scss" scoped>
.layout-system-user {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
