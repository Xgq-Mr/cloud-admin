import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Layout",
    component: () => import("@/layout/index.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/views/index/index.vue"),
        meta: {
          // 面包屑显示内容
          title: "首页",
          // 菜单图标
          icon: "Menu",
          // 页面是否需要缓存 false 为不缓存 true 为缓存
          cache: false,
          // 控制当前路由是否为菜单 false 为显示 true 为隐藏
          hidden: false,
        },
      },
      // 系统管理
      {
        path: "/system",
        name: "System",
        meta: {
          // 面包屑显示内容
          title: "系统管理",
          // 菜单图标
          icon: "Menu",
          // 页面是否需要缓存 false 为不缓存 true 为缓存
          cache: false,
          // 控制当前路由是否为菜单 false 为显示 true 为隐藏
          hidden: false,
        },
        children: [
          {
            path: "/system/menu",
            name: "SystemMenu",
            component: () => import("@/views/system/menu/index.vue"),
            meta: {
              // 面包屑显示内容
              title: "菜单管理",
              // 菜单图标
              icon: "Menu",
              // 页面是否需要缓存 false 为不缓存 true 为缓存
              cache: false,
              // 控制当前路由是否为菜单 false 为显示 true 为隐藏
              hidden: false,
            },
          },
          {
            path: "/system/role",
            name: "SystemRole",
            component: () => import("@/views/system/role/index.vue"),
            meta: {
              // 面包屑显示内容
              title: "角色管理",
              // 菜单图标
              icon: "Menu",
              // 页面是否需要缓存 false 为不缓存 true 为缓存
              cache: false,
              // 控制当前路由是否为菜单 false 为显示 true 为隐藏
              hidden: false,
            },
          },
          {
            path: "/system/user",
            name: "SystemUser",
            component: () => import("@/views/system/user/index.vue"),
            meta: {
              // 面包屑显示内容
              title: "用户管理",
              // 菜单图标
              icon: "Menu",
              // 页面是否需要缓存 false 为不缓存 true 为缓存
              cache: false,
              // 控制当前路由是否为菜单 false 为显示 true 为隐藏
              hidden: false,
            },
          },
        ],
      },
      // 商品管理
      {
        path: "/goods",
        name: "Goods",
        meta: {
          // 面包屑显示内容
          title: "商品管理",
          // 菜单图标
          icon: "Menu",
          // 页面是否需要缓存 false 为不缓存 true 为缓存
          cache: false,
          // 控制当前路由是否为菜单 false 为显示 true 为隐藏
          hidden: false,
        },
        children: [
          {
            path: "/goods/list",
            name: "GoodsList",
            component: () => import("@/views/goods/list/index.vue"),
            meta: {
              // 面包屑显示内容
              title: "商品列表",
              // 菜单图标
              icon: "Menu",
              // 页面是否需要缓存 false 为不缓存 true 为缓存
              cache: false,
              // 控制当前路由是否为菜单 false 为显示 true 为隐藏
              hidden: false,
            },
          },
          {
            path: "/goods/category",
            name: "GoodsCategory",
            component: () => import("@/views/goods/category/index.vue"),
            meta: {
              // 面包屑显示内容
              title: "商品列表",
              // 菜单图标
              icon: "Menu",
              // 页面是否需要缓存 false 为不缓存 true 为缓存
              cache: false,
              // 控制当前路由是否为菜单 false 为显示 true 为隐藏
              hidden: false,
            },
          },
        ],
      },
      // 官网
      {
        path:"/usian",
        name:"Usian",
        component:()=>import("@/views/link/index.vue"),
        meta:{
          title:"积云教育",
          icon:"menu",
          cache:false,
          hidden:false,
        }
      },
      // 401
      {
        path:"/401",
        name:"NoPermission",
        component:()=>import("@/views/error/401.vue"),
        meta:{
          title:"401页面",
          icon:"menu",
          cache:true,
          hidden:false,
        }
      },
      // 404
      {
        path: '/:pathMatch(.*)*',
        name:"NotFound",
        component:()=>import("@/views/error/404.vue"),
        meta:{
          title:"未找到此页面",
          icon:"menu",
          cache:true,
          hidden:true,
        }
      }
    ],
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: dynamicRoutes,
});

export default router;
