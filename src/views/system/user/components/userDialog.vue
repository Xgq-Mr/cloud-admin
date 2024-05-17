<script setup lang="ts">
import { RoleListApi, addUserApi, editUserApi } from "@/api/system/user";
import type { Datum3, addUSerParamsType } from "@/types/user";
import { ElMessage, ElNotification, type FormInstance } from "element-plus";
import { reactive, ref ,nextTick} from "vue";

// 控制模态框显示隐藏
const visible = ref<boolean>(false);
const dialogTitle = ref<String>();
const dialogType = ref<String>();
// 表单数据
const formDataRef = ref<FormInstance>();
const formData = ref<addUSerParamsType>({
  accountNonExpired: false,
  accountNonLocked: true,
  credentialsNonExpired: true,
  nickName: "",
  username: "",
  password: "",
  mobile: "",
  email: "",
  roleIds: [],
  remark: "",
});
// 角色列表数据
const options = ref<any | Datum3[]>();
// 表单校验
// 手机号自定义校验规则
const validatorMobile = (row: any, value: string, callback: Function) => {
  // 手机号正则表达式
  const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
  if (value === "") {
    callback(new Error("请输入手机号"));
  } else if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("请输入正确的手机号"));
  }
};
const rules = reactive({
  nickName: [{ required: true, message: "请输入用户昵称", trigger: "blur" }],
  username: [
    { required: true, message: "用户账号为必填项!", trigger: "blur" },
    {
      min: 4,
      max: 30,
      message: "用户账号必须在 4 到 30 个字符",
      trigger: "blur",
    },
  ],
  mobile: [{ validator: validatorMobile,required:true }],
  password: [
    { required: true, message: "用户密码为必填项!", trigger: "blur" },
    { min: 4, max: 30, message: "密码必须为6 到 30 个字符", trigger: "blur" },
  ],
});
// 提交数据
const handleSubmit = () => {
  formDataRef.value?.validate((valid: boolean) => {
    if (valid) {
      submitData();
    }
  });
};
// 提交数据封装
const submitData = async () => {
  try {
    if (dialogType.value === "add") {
      await addUserApi(formData.value);
    }else{
      await editUserApi(formData.value);
    }
  } catch (error) {
    console.log(error);
  }
  visible.value = false;
  ElNotification({
    title: "操作成功",
    type: "success",
  });
  formDataRef.value?.resetFields();
};
// 开启弹框
const openDialog = async (type: string, title: string, data = {} as any) => {
  ElMessage.success("恭喜,您有权限！");
  dialogTitle.value = title;
  dialogType.value = type;
  const res = await RoleListApi();
  options.value = res.data;
  visible.value = true;
  if(type === "edit"){
    nextTick(()=>{
      formData.value = {...data.row}

    })
  }
};
// 关闭弹框
const handleClose = ()=>{
  visible.value = false
  formDataRef.value?.resetFields();

}
// 暴露给父组件
defineExpose({
  openDialog,
});
</script>
<template>
  <el-dialog @close="handleClose" center v-model="visible" :title="dialogTitle" width="720">
    <el-form
      :rules="rules"
      :model="formData"
      :inline="true"
      ref="formDataRef"
      label-width="90"
      label-suffix=" :"
    >
      <el-form-item label="用户昵称" prop="nickName">
        <el-input
          v-model="formData.nickName"
          placeholder="请输入用户昵称"
          maxlength="30"
          show-word-limit
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="用户账号" prop="username">
        <el-input
          v-model="formData.username"
          placeholder="请输入4-30位用户账号"
          maxlength="30"
          show-word-limit
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input
          v-model="formData.mobile"
          placeholder="请输入手机号码"
          maxlength="20"
          show-word-limit
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="登录密码" prop="password">
        <el-input
          type="password"
          v-model="formData.password"
          placeholder="请输入6-30位登录密码"
          maxlength="20"
          show-word-limit
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="分配角色" prop="roleIds">
        <el-select
          multiple
          style="width: 100%"
          v-model="formData.roleIds"
          placeholder="请选择角色"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="email">
        <el-input
          type="email"
          v-model="formData.email"
          placeholder="请输入电子邮箱"
          maxlength="20"
          show-word-limit
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item required label="账号锁定" prop="accountNonLocked">
        <el-radio-group v-model="formData.accountNonLocked">
          <el-radio :value="false" border>未锁定</el-radio>
          <el-radio :value="true" border>已锁定</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item required label="账号过期" prop="accountNonExpired">
        <el-radio-group v-model="formData.accountNonExpired">
          <el-radio :value="false" border>未过期</el-radio>
          <el-radio :value="true" border>已过期</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item required label="密码过期" prop="credentialsNonExpired">
        <el-radio-group v-model="formData.credentialsNonExpired">
          <el-radio :value="false" border>未过期</el-radio>
          <el-radio :value="true" border>已过期</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注信息" prop="remark">
        <el-input
          type="email"
          v-model="formData.remark"
          placeholder="请输入备注信息"
          maxlength="100"
          show-word-limit
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit"> 保存 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style lang="scss" scoped>
.el-form-item {
  width: 45% !important;
}
</style>
