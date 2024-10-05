import { createRouter, createWebHistory, useRoute } from "vue-router";
import Layout from "../layout/index.vue";
import mainPage from "../mainPage/mainPage.vue"
import labelOrdered from "../labelOrdered/labelOrdered.vue";
import photoSearch from "../photoSearch/photoSearch.vue"
import carSearch from "../carSearch/carSearch.vue";
import mainLogin from "../mainLogin/mainLogin.vue";
import personalPage from "../personalPage/personalPage.vue";

import { watch } from "vue";
// import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs";
const route = useRoute();
let dttitle;
watch(
  () => route,
  (newValue, oldValue) => {
    dttitle = sessionStorage.getItem("portalSonRouteTitle");
  },
  { immediate: true }
);
const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/mainLogin",
    children:[
      {
        path: "mainPage",
        component: mainPage
      },
    
      {
        path: "carSearch",
        component: carSearch
      },
    
      {
        path: "photoSearch",
        component: photoSearch
      },
    
      {
        path: "labelOrdered",
        component: labelOrdered
      },

      {
        path: "personalPage",
        component: personalPage
      },
    ]
  },

  {
    path:'/mainLogin',
    component: mainLogin,
  },

  {
    //访问主页的时候 重定向到index页面
    path: "/:pathMatch(.*)",
    redirect: "/404",
  },

  {
    //访问主页的时候 重定向到index页面
    path: "/:pathMatch(.*)",
    redirect: "/404",
  },
  {
    path: "/404",
    name: "/404",
    component: () => import("../views/404.vue"),
    meta: { title: "找不到啦" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
