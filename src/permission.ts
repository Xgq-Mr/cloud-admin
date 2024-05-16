// 页面鉴权相关操作
import router from "./router";
import { useUserInfo } from "@/stores/useUserInfo";

// 白名单列表
const whiteList = ["/login"];
router.beforeEach((to, from, next) => {
  const store = useUserInfo();
  const token = store.token;
  if(to.path !== "/login"){
    if(token){
      if(!store.userInfo?.username || store.userInfo?.nickName){
        store.GetUserInfo()
      }
      next();
    }else{
      return next("/login");
    }
  }else if (whiteList.includes(to.path)){
    if(token){
       return next({path:from.path});
    }else{
      next();
    }
  }
});

