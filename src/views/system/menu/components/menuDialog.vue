<template>
  <el-drawer
    v-model="visible"
    :title="dialogTitle"
    size="650"
    direction="rtl"
    :before-close="handleClose"
  >
    <el-form
      :model="formData"
      ref="formDataRef"
      label-width="100"
      label-position="right"
    >
      <el-form-item label="上级菜单:" prop="parentId">
        <el-cascader
          style="width: 100%"
          placeholder="请输入上级菜单"
          v-model="formData.parentId"
          :options="options"
          :props="props"
        />
      </el-form-item>
      <el-form-item label="菜单类型:" prop="type" required>
        <el-radio-group v-model="formData.type" class="ml-4">
          <el-radio value="1" border>菜单名称</el-radio>
          <el-radio value="2" border>按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="菜单名称:"
        :rules="[
          { required: true, message: '请输入菜单名称', trigger: 'blur' },
        ]"
        prop="name"
        required
      >
        <el-input
          v-model="formData.name"
          placeholder="请输入菜单名称"
          maxlength="10"
          show-word-limit
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="权限标识:"
        v-show="formData.type === '2'"
        prop="code"
      >
        <el-input
          v-model="formData.code"
          placeholder="权限标识"
          maxlength="100"
          show-word-limit
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="路由地址:"
        v-show="formData.type === '1'"
        prop="path"
      >
        <el-input
          v-model="formData.path"
          placeholder="路由地址path值"
          maxlength="200"
          show-word-limit
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="路由名称:"
        v-show="formData.type === '1'"
        prop="meta.title"
      >
        <el-input
          v-model="formData.meta.title"
          placeholder="路由名称"
          maxlength="50"
          show-word-limit
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="组件路径:"
        v-show="formData.type === '1'"
        prop="component"
      >
        <el-input
          v-model="formData.component"
          placeholder="路由组件相对路径"
          maxlength="390"
          show-word-limit
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="菜单图标:"
        v-show="formData.type === '1'"
        prop="meta.icon"
      >
        <el-input
          v-model="formData.meta.icon"
          placeholder="请输入图标名ele-开头"
          maxlength="100"
          show-word-limit
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="重定向:"
        v-show="formData.type === '1'"
        prop="redirect"
      >
        <el-input
          v-model="formData.redirect"
          placeholder="路由重定向地址redirect值"
          maxlength="200"
          show-word-limit
          type="text"
        ></el-input>
      </el-form-item>
      <el-row v-show="formData.type === '1'">
        <el-col :span="12">
          <el-form-item label="是否隐藏:" required prop="meta.hidden">
            <el-radio-group v-model="formData.meta.hidden" class="ml-4">
              <el-radio :value="false">不隐藏</el-radio>
              <el-radio :value="true">隐藏</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :span="12" label="是否缓存:" required prop="meta.cache">
            <el-radio-group v-model="formData.meta.cache" class="ml-4">
              <el-radio :value="false">不缓存</el-radio>
              <el-radio :value="true">缓存</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="排序:" prop="sort">
        <el-input-number
          style="width: 450px"
          v-model="formData.sort"
          :min="1"
          :max="100"
        />
      </el-form-item>
      <el-form-item label="菜单描述:" prop="remark">
        <el-input
          v-model="formData.remark"
          type="textarea"
          placeholder="请输入备注"
          maxlength="50"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-row justify="center">
        <el-button>取消</el-button>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </el-row>
    </el-form>
  </el-drawer>
</template>
<script setup lang="ts">
import { addMenuApi, editMenuApi, selectMenu } from "@/api/system/menu";
import type { AddParamsType, SelectMenuType } from "@/types/menu";
import { ref, watchEffect } from "vue";
// 引入深拷贝插件
import _ from "lodash";

// 控制弹框显示隐藏
const visible = ref<Boolean>(false);
const dialogTitle = ref<string>("新增");
const dialogType = ref<string>();
// 表单数据
const formData = ref<AddParamsType>({
  type: "1",
  sort: 1,
  meta: {
    icon: "",
    cache: false,
    hidden: false,
    title: "",
  },
  parentId: "",
  path: "",
  name: "",
  component: "",
  redirect: "",
  remark: "",
  code: "",
});
const formDataRef = ref();
// 级联数据以及规则
const options = ref<SelectMenuType>();
// 设置下拉菜单的展开触发事件为鼠标移入事件
const props = {
  expandTrigger: "hover" as const,
  // 设置下拉菜单的标签为"title"
  label: "title",
  // 设置下拉菜单的值称为"id"
  value: "id",
  // 设置下拉菜单是否返回路径false
  emitPath: false,
  // 设置严格匹配
  checkStrictly: true,
};
// 关闭之前的回调
const handleClose = () => {
  // 作用重置表单项为初始值 必须有props
  formDataRef.value.resetFields();
  visible.value = false;
};

// 保存信息
const handleSubmit = async () => {
  try {
    formDataRef.value.validate((valid: boolean) => {
      if (!valid) return;
      submitData();
    });
  } catch (error) {
    console.log(error);
  }
};
// 向父组件通知添加成功
const emits = defineEmits(["refresh"]);
// 判断是添加还是编辑
const submitData = async () => {
  if (dialogType.value === "add") {
    await addMenuApi(formData.value);
  } else {
    await editMenuApi(formData.value);
  }
  visible.value = false;
  formDataRef.value.resetFields();
  emits("refresh");
};
// 通过父组件打开弹窗
const openDrawer = (type: string, title: string, data: any) => {
  visible.value = true;
  dialogTitle.value = title;
  dialogType.value = type;
  if (type == "edit") {
    formData.value = _.cloneDeep(data.row);
    formData.value.parentId = data.row.id;
  } else {
    formData.value.parentId = data.parentId;
  }
};
// 将子组件方法暴露给父组件
defineExpose({
  openDrawer,
});

// 监听弹框
watchEffect(() => {
  if (visible.value) {
    selectMenu().then((res) => {
      options.value = res.data;
    });
  }
});
</script>
<style lang="scss" scoped></style>
