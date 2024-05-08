import { createApp } from "vue";
import { createPinia } from "pinia";
// 引入全局依赖
import setRegisterGlobal from "@/global"
import App from "./App.vue";
import router from "./router";

// 挂载样式
import "./styles/index.scss"

const app = createApp(App);

// app.use 方法可以接受一个箭头函数 也可以接受一个对象 对象里面install方法自调用 参数为app
// app.use((app)=>{
//     console.log("app1",app);
// })
// app.use({
//     install: (app) =>{
//         console.log("app2",app);
//     }
// })
console.log("env",import.meta.env.VITE_APP_BASE_API);

// 挂载全局二次封装
app.use(setRegisterGlobal)
app.use(createPinia());
app.use(router);

app.mount("#app");

