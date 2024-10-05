import { createStore } from "vuex";

export default createStore({
  // 初始化状态
  state: {
    // 用户名
    user_name: "",
    app_key: "",
    routeMate: "",
  },
  // 更新state状态
  mutations: {
    user_name(state, payload) {
      state.user_name = payload;
    },
    app_key(state, payload) {
      state.app_key = payload;
    },
    routeMate(state, payload) {
      state.routeMate = payload;
    },
  },
  // 计算state
  getters: {},
  // 异步操作
  actions: {},
  modules: {},
});
