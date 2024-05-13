import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode,process.cwd())
  
  return {
    
    plugins: [vue(), vueJsx()],
    base:"./",
    // server 参数参考文档
    server: {
      // 端口号
      port: 8888,
      // 自动打开浏览器
      open: true,
      // 主机名
      host: "localhost",
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 跨域地址
          target: "https://mock.apifox.com/m1/4461329-0-default",
          // 是否跨域
          changeOrigin: true,
          // 路径重写
          // rewrite: (path) => path.replace(/^.`${envVITE_APP_BASE_API}`/, ""),
          rewrite: (path) => path.replace(new RegExp("^"+env.VITE_APP_BASE_API), "")
        },
      },
    },

    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
