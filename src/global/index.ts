// 引入 ElementPlus 封装
import type { App } from "vue";
import registerElementPlus from "./registerElementPlus";
// 引入 ElementPlus 封装的 icon
import registerElementPlusIcon from "./registerElementPlusIcon";

export default {
  install(app: App) {
    app.use(registerElementPlus);
    app.use(registerElementPlusIcon);
  },
};
