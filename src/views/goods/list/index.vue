<script setup lang="ts">
import { useGoodsList } from "./composable/useGoodsList";
const {
  queryData,
  tableData,
  total,
  initGoodsList,
  handleSizeChange,
  handleCurrentChange,
  handleDelete,
  changeStatus,
  handleAdd,
  handleEdit,
  listDialogRef,
  ListDialog
} = useGoodsList();


</script>
<template>
  <div class="layout-padding" style="display: flex; flex-direction: column">
    <!-- 新增编辑弹窗 -->
    <ListDialog ref="listDialogRef" @refresh="initGoodsList" />
    <!-- 头部内容 -->
    <div class="system-menu-search">
      <el-form :model="queryData" :inline="true">
        <el-form-item>
          <el-input
            v-model="queryData.keyword"
            placeholder="请输入商品名称/编码/简码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-select
            style="width: 200px"
            v-model="queryData.status"
            placeholder="请选择商品状态"
            clearable
          >
            <el-option label="已上架" value="shanghai" />
            <el-option label="已下架" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="search" type="primary" @click="initGoodsList"
            >查询</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button icon="plus" type="success" @click="handleAdd"
            >新增商品</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 列表数据 -->
    <el-table :data="tableData" border stripe style="width: 100%; height: 100%">
      <el-table-column
        align="center"
        fixed="left"
        prop="date"
        label="商品名称/编码"
        width="220"
      >
        <template #default="{ row }">
          <div class="flex-center" style="height: 50px">
            <el-avatar
              shape="square"
              style="width: 50px"
              :size="50"
              :src="row.imageUrl"
            />
            <div
              style="
                display: flex;
                flex-direction: column;
                align-items: start;
                margin-left: 10px;
              "
            >
              <span>{{ row.name }}</span>
              <el-link type="primary">{{ row.code }}</el-link>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="specsName" label="商品规格" />
      <el-table-column
        align="center"
        prop="categoryName"
        label="所属分类"
        width="120"
      />
      <el-table-column
        align="center"
        prop="quickCode"
        label="快捷码"
        width="120"
      />
      <el-table-column
        align="center"
        prop="unitName"
        label="单位"
        width="100"
      />
      <el-table-column
        align="center"
        prop="stockNum"
        label="库存"
        sortable
        width="120"
      />
      <el-table-column
        align="center"
        prop="price"
        label="销售价"
        sortable
        width="120"
      />
      <el-table-column
        align="center"
        prop="discountPrice"
        label="商品特价"
        sortable
        width="120"
      >
        <template #default="{ row }">
          <span>￥ {{ row.discountPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="cost"
        label="成本价"
        sortable
        width="110"
      />
      <el-table-column
        align="center"
        prop="createTime"
        label="入库时间"
        width="120"
      />
      <el-table-column align="center" prop="status" label="状态" width="120">
        <template #default="{ row }">
          <el-switch
            @change="changeStatus(row)"
            v-model="row.status"
            inline-prompt
            active-text="已上架"
            :active-value="1"
            :inactive-value="0"
            inactive-text="已下架"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="220">
        <template #default="{ row }">
          <el-button link type="warning" icon="edit" @click="handleEdit(row)">
            修改
          </el-button>
          <el-popconfirm
            width="220"
            confirm-button-text="确定"
            cancel-button-text="取消"
            :title="`确定永久删除【${row.name}】吗?`"
            @confirm="handleDelete(row.id)"
          >
            <template #reference>
              <el-button @click.stop link type="danger" icon="delete"
                >删除</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row justify="end" style="margin-top: 20px">
      <el-pagination
        v-model:current-page="queryData.current"
        v-model:page-size="queryData.size"
        :page-sizes="[10, 20, 30, 50]"
        :total="total"
        :background="true"
        layout="sizes, prev, pager, next,total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-row>
  </div>
</template>
<style lang="scss" scoped></style>
