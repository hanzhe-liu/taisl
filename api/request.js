import axios from "axios";
import config from "../config/index";
import { ElMessage, ElLoading } from "element-plus";
// 创建实例
var loadingObj = null;
const networkError = "网络请求异常，请稍后重试.....";


const Service = axios.create({
  baseURL: config.baseApi,
  timeout: "120000",
  responseType: "json",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Cache-Control": "no-cache",
  },
});

// 请求拦截器
Service.interceptors.request.use(
  (config) => {
    loadingObj = ElLoading.service({
      lock: true,
      text: "加载中",
      background: "rgba(0, 0, 0, 0.7)",
    });
    // if (token) {
    //   config.headers["token"] = beseFun();
    // }
    return config;
  },
  (err) => {
    loadingObj.close();
    return Promise.reject(err);
  }
);

// 响应拦截器
Service.interceptors.response.use(
  (res) => {
    if(res.status != 200){
      console.log("status error")
      return Promise.reject(res.statusText)
    }
    loadingObj.close()
    return res.data;
  },
  (error) => {
    if (error.response) {
      const { data, code, detail } = error.response.data;
      console.log(code);
      if (code > 300 && code != 406 && code != 500) {
        loadingObj.close();
        ElMessage.error(data.message);
      } else if (code == 406) {
        ElMessage.error(detail);
      } else if (code == 500) {
        ElMessage.error(data.message);
        console.log(data);
      } else {
        console.log(error);
        ElMessage.error(networkError);
      }
      loadingObj.close();
    } else {
      ElMessage.error(networkError);
      loadingObj.close();
    }
    return Promise.reject(networkError);
  }
);

// 判断是否走mock数据
function request(options) {
  return Service(options);
}
export default request;
