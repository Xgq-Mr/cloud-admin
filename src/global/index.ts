// 引入 ElementPlus 的全局注册
import type { App } from "vue";
import registerElementPlus from "./registerElementPlus";
// 引入 ElementPlus-icon 的全局注册
import registerElementPlusIcon from "./registerElementPlusIcon";

export default {
  install:(app: App)=> {
    app.use(registerElementPlus);
    app.use(registerElementPlusIcon);
  },
};
