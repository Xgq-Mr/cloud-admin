import { loginApi, logoutApi, userInfoApi } from "@/api";
import { Local } from "@/utils/storges";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserInfo = defineStore(
  "useUserInfo",
  () => {
    // 存储token
    const token = ref<string>("");
    // 存储用户信息
    const userInfo = ref<any>();
    const menuList = ref();
    const buttonList = ref<string[]>();
    // 判断是否勾选记住密码
    const isRememberApi = (form: any) => {
      if (form.isRemember) {
        Local.set("username", form.username);
        Local.set("password", form.password);
        Local.set("isRemember", form.isRemember);
      } else {
        Local.remove("username");
        Local.remove("password");
        Local.remove("isRemember");
      }
    };
    // 登录
    const login = async (obj: any) => {
      try {
        const res = await loginApi(obj);
        token.value = res.data.access_token;
        return res;
      } catch (err) {
        console.log(err);
      }
    };
    // 获取用户信息
    const GetUserInfo = async () => {
      try {
        const res = await userInfoApi();
        // console.log(res);
        userInfo.value = { ...res.data.userInfo };
        menuList.value = { ...res.data.menuList };
        buttonList.value = { ...res.data.buttonList };
      } catch (err) {
        console.log(err);
      }
    };
    // 退出登录
    const logout = async () => {
      try {
        const res = await logoutApi();
        clearUserInfo()
        return res;
      } catch (err) {
        console.log(err);
      }
    };
    const clearUserInfo = ()=>{
      token.value = "";
      userInfo.value = {};
      menuList.value = [];
      buttonList.value = [];
    }
    return {
      isRememberApi,
      login,
      token,
      GetUserInfo,
      userInfo,
      logout,
      clearUserInfo
    };
  },
  {
    persist: true,
  }
);
