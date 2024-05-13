import { createApp } from "vue";

// 引入pinia 以及持久化插件
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
// 引入全局依赖
import setRegisterGlobal from "@/global"

import App from "./App.vue";
import router from "./router";

// 路由鉴权
import "./permission"
// 挂载样式
import "./styles/index.scss"

const app = createApp(App);


// 挂载全局二次封装
app.use(setRegisterGlobal)
app.use(pinia);
app.use(router);

app.mount("#app");

