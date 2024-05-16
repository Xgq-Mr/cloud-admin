<template>
  <el-dialog
    @close="handleClose"
    v-model="dialogVisible"
    center
    :title="DialogTitle"
    width="500"
  >
    <!-- 表单内容 -->
    <el-form status-icon :model="formData" ref="formDataRef" label-width="100">
      <el-form-item
        label="角色名称"
        prop="roleName"
        :rules="[
          { required: true, message: '角色名称不能为空', trigger: 'blur' },
        ]"
      >
        <el-input
          maxlength="30"
          show-word-limit
          v-model="formData.roleName"
          clearable
          placeholder="请输入角色名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色编码" prop="roleCode">
        <el-input
          v-model="formData.roleCode"
          maxlength="30"
          clearable
          show-word-limit
          placeholder="保证唯一性,建议以ROLE_开头"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色状态" required prop="status">
        <el-switch
          inline-prompt
          v-model="formData.status"
          active-text="启"
          inactive-text="停"
        ></el-switch>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="formData.remark"
          type="textarea"
          placeholder="请输入备注"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 底部按钮 -->
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit"> 保存 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { addRoleApi, editRoleApi } from "@/api/system/role";
import type { AddParams } from "@/types/role";
import { ref, nextTick } from "vue";
import _ from "lodash";
// dialog框数据
const dialogVisible = ref<boolean>(false);
const DialogTitle = ref<string>("123");
const DialogType = ref<string>();
const formDataRef = ref();
const formData = ref<AddParams>({
  roleName: "",
  roleCode: "",
  status: true,
  remark: "",
});

// 通知父组件
const emit = defineEmits(["refresh"]);
// 关闭弹框时
const handleClose = () => {
  nextTick(() => {
    formDataRef.value.resetFields();
  });
};
// 保存数据
const handleSubmit = () => {
  formDataRef.value.validate((valid: boolean) => {
    if (valid) {
      submitData();
    }
  });
};
const submitData = async () => {
  try {
    if (DialogType.value === "add") {
      addRoleApi(formData.value);
    }else{
      editRoleApi(formData.value);
    }
    dialogVisible.value = false;
    emit("refresh");
    formDataRef.value.resetFields();
  } catch (error) {
    console.log(error);
  }
};

// 定义方法开启弹框
const openDialog = (title: string, type: string, data?: any) => {
  dialogVisible.value = true;
  DialogTitle.value = title;
  DialogType.value = type;
  // 如果对话框的类型为编辑，则克隆一个 data.row 赋值给 formData
  if (type === "edit") {
    nextTick(() => {
      formData.value = _.cloneDeep(data.row);
    });
  }
};
// 暴露给父组件
defineExpose({
  openDialog,
});
</script>
<style lang="scss" scoped></style>
