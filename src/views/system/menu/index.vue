<template>
    <div class="system-menu">
        <div class="system-menu-search">
            <el-form :model="formData" :inline="true">
                <el-form-item label="菜单名称">
                    <el-input v-model="formData.keyWord" placeholder="请输入菜单名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="search" type="primary" @click="getMenuList">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button icon="plus" type="success" @click="handleAdd('')">新增菜单</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 列表数据 -->
        <el-table :data="menuList" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all>
            <el-table-column width="150" prop="" label="菜单名称">
                <template #default="{ row }">
                    <svg-icon v-if="row.meta.icon" :icon="row.meta.icon.split('-')[1]"></svg-icon>
                    {{ row.meta.title }}
                </template>
            </el-table-column>
            <el-table-column prop="path" label="路由地址" />
            <el-table-column prop="component" label="组件路径" />
            <el-table-column prop="code" label="权限标识" />
            <el-table-column prop="address" label="类型">
                <template #default="{ row }">
                    <el-tag v-if="row.type == 1" type="primary">菜单</el-tag>
                    <el-tag v-else-if="row.type == 2" type="success">按钮</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="sort" label="排序" />
            <el-table-column width="200" label="操作">
                <template #default="{ row }">
                    <el-button link type="primary" icon="plus" @click="handleAdd(row.id)">新增下级</el-button>
                    <el-button link type="warning" icon="edit" @click="handleEdit(row)">修改</el-button>
                    <el-popconfirm width="auto" confirm-button-text="确定" cancel-button-text="取消"
                        @confirm="handleDelete(row.id)" @cancel="handleCancel" :title="`确定要永久删除【${row.meta.title}】吗?`">
                        <template #reference>
                            <el-button link type="danger" icon="delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- dialog弹框 -->
        <MenuDialog @refresh="MenuRefresh" ref="menuDialogRef" />
    </div>
</template>
<script setup lang="ts">
import { delMenuApi, getMenuApi } from '@/api/system/menu';
import type { ResponseMenuType } from '@/types/menu';
import { ElNotification } from 'element-plus';
import { ref ,defineAsyncComponent} from 'vue';
const MenuDialog = defineAsyncComponent(()=>import("./components/menuDialog.vue"))
// 搜索内容
const formData = ref({
    keyWord: ""
})
const menuList = ref<ResponseMenuType>()
// 获取菜单列表
const getMenuList = async () => {
    try {
        const res = await getMenuApi(formData.value)
        menuList.value = res.data
    } catch (err) {
        console.log(err)
    }
}
getMenuList()
// 删除
const handleDelete = async (id: number) => {
    try {
        await delMenuApi(id)
        ElNotification({
            title: '删除成功！',
            type: 'success',
        })
        getMenuList()
    } catch (err) {
        console.log(err)
    }
}
// 取消删除
const handleCancel = ()=>{
    ElNotification({
        title: '取消删除！',
        type: 'info',
    })
}
// 新增菜单
const menuDialogRef = ref()
const handleAdd = (parentId:string|number)=>{
    menuDialogRef.value.openDrawer("add","新增菜单",{parentId})
}
// 编辑菜单
const handleEdit = (row:ResponseMenuType)=>{
    menuDialogRef.value.openDrawer("edit",`编辑菜单`,{row})
}
// 子组件操作完数据父组件获取列表
const MenuRefresh = ()=>{
    ElNotification({
    title: '保存成功',
    type: 'success',
  })
    getMenuList()
}

</script>
<style lang='scss' scoped></style>