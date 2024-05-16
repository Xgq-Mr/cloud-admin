<template>
    <div class="login-container">
        <div class="login-form">
            <div style="text-align: center;">
                <img style="width: 100px;text-align: center;"
                    src="http://vue3.mengxuegu.com/assets/login-logo-6c42311e.png" alt="">
            </div>
            <p>账号登录</p>
            <el-form :model="formData" :rules="formRules" ref="formRef" size="large">
                <el-form-item prop="username">
                    <el-input prefix-icon="User" v-model="formData.username" placeholder="请输入手机号或用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input prefix-icon="Lock" type="password" show-password v-model="formData.password"
                        placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="formData.isRemember">记住密码</el-checkbox>
                    <el-button type="primary" style="width: 100%;" @click="handleSubmit(formRef)">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ElMessage, type FormInstance } from 'element-plus';
import { loginApi } from "@/api/index"
import { reactive, ref } from 'vue';
import { Local } from "@/utils/storges"
import { useUserInfo } from "@/stores/useUserInfo"
const store = useUserInfo()
import {useRouter} from "vue-router"
const router = useRouter()
// 表单数据
const formData = ref({
    username: Local.get("username") || "",
    password: Local.get("password") || "",
    isRemember: Local.get("isRemember") || false
})
const formRef = ref()
// 自定义校验规则
const validateUsername = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入手机号'))
    } else if (!/^[a-zA-Z0-9_-]{11}$/.test(value)) {
        callback(new Error('手机号格式错误'))
    } else {
        callback()
    }
}
const validatePassword = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else if (!/^[a-zA-Z0-9_-]{6,18}$/.test(value)) {
        callback(new Error('密码格式错误'))
    } else {
        callback()
    }
}
const formRules = reactive({
    username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { validator: validateUsername, trigger: 'blur' }
    ],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { validator: validatePassword, trigger: 'blur' }
    ]
})
// 登录逻辑
const handleSubmit =   (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate (async (valid: any)  => {
        if (valid) {
            // 判断是否勾选
            store.isRememberApi({ ...formData.value })
            // 登录逻辑
            const res:any = <Object>await store.login({...formData.value})
            console.log(res);
            if(res.code === 20000){
                ElMessage.success("登录成功")
                router.push("/")
            }else{
                ElMessage.error("登录失败")
            }
            
        }
    })
}

</script>
<style lang='scss' scoped>
.login-container {
    width: 100%;
    height: 100vh;
    background-image: url(http://vue3.mengxuegu.com/assets/login-bj-514aa045.png);
    background-size: cover;
    overflow: hidden;

    .login-form {
        width: 400px;
        padding: 20px 20px 40px;
        border-radius: 10px;
        background-color: #fff;
        box-shadow: 2px 2px 4px 2px gray;

        margin: 20vh auto;
        margin-right: 200px;

        p {
            font-size: 22px;
            font-weight: 500;
            margin: 15px;
        }

        .el-button {
            font-weight: 500;
            letter-spacing: 2px;
        }

    }
}
</style>