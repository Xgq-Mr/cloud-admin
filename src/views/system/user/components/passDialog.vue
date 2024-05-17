<script setup lang="ts">
import { resetPassApi } from "@/api/system/user";
import type { resetPassType } from "@/types/user";
import { ElNotification, type FormInstance } from "element-plus";
import { reactive, ref } from "vue";

// 模态框
const visible = ref<boolean>(false);
const dialogTitle = ref<string>("");
// 表单数据
const formData = ref<resetPassType>({
  newPassword: "",
  repPassword: "",
  userId: "",
});
const formDataRef = ref<FormInstance>();
// 表单校验
const resetPassword = (rule: any, value: any, callback: any) => {
  if (value !== formData.value.newPassword) {
    callback(new Error("两次输入密码不一致"));
  } else {
    callback();
  }
};
const rules = reactive({
  newPassword: [
    { required: true, message: "请输入新密码", trigger: "blur" },
    {
      required: true,
      message: "请输入6-30位密码",
      trigger: "blur",
      pattern: /^[0-9A-Za-z_]{6,30}$/,
    },
  ],
  repPassword: [
    { required: true, message: "请输入确认密码", trigger: "blur" },
    {
      validator: resetPassword,
      trigger: "blur",
    },
  ],
});
// 打开模态框
const openDialog = (title: string, id: number) => {
  formData.value.userId = id;
  dialogTitle.value = title;
  visible.value = true;
};
// 暴露给父组件的方法
defineExpose({
  openDialog,
});
// 关闭模态框
const handleClose = () => {
  formDataRef.value?.resetFields();
  visible.value = false;
};
// 重置密码
const resetPass = () => {
  try {
    formDataRef.value?.validate(async (valid: boolean) => {
      if (valid) {
        await resetPassApi(formData.value);
        ElNotification({
          title: "密码修改成功",
          type: "success",
        });
        handleClose();
      }
    });
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <el-dialog
    draggable
    @close="handleClose"
    center
    v-model="visible"
    :title="dialogTitle"
    width="500"
  >
    <el-form
      :rules="rules"
      ref="formDataRef"
      :model="formData"
      label-width="85"
    >
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          type="password"
          v-model="formData.newPassword"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="repPassword">
        <el-input
          type="password"
          v-model="formData.repPassword"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="resetPass">确定</el-button>
        <el-button @click="handleClose"> 取消 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style lang="scss" scoped></style>
