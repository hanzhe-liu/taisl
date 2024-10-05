import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import store from "./store/index.js";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import api from "./api/api.js";
import md5 from "js-md5";
import emitter from './utils/emitter.ts'
import { createPinia } from "pinia";
// import "./assets/font/iconfont.js";
// import "./assets/font/iconfont.css";
// 导航守卫
// import "../src/router/permission";

// 汉化组件
// import locale from "element-plus/lib/locale/lang/zh-cn";

// 全局后置钩子设置title
router.afterEach((to) => {
  document.title = to.meta.title;
});
// 图标
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// 弹窗提示
import tips from "./components/Tips";
app.config.globalProperties.$tips = tips;
// 全局挂载请求
app.config.globalProperties.$api = api;
// md5加密
app.config.globalProperties.$md5 = md5;
window.router = router;
// 全局挂载请求
app.config.globalProperties.$api = api;
(app.config.globalProperties.$app_key = "f4f56da0-4589-11eb-aa8e-5b1ae6b0d7f8")
  app.use(store).use(router).use(ElementPlus).mount("#app");
// f4f56da0-4589-11eb-aa8e-5b1ae6b0d7f8     测试
// 9494092a-875f-11ed-b64b-d10c4598e053     生产
