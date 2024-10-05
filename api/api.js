import request from "./request";
const prefixUrl = "/taisl/v2.0/data_quality";

export default {
  // 登录
  postLoginInit(params) {
    return request({
      url: `/taisl/v2.0/vp/user/login`,
      method: "post",
      data: params,
    });
  },
  
  searchData(params) {
    return request({
      url: `taisl/v2.0/vp/plate/filter/query`,
      method: "get",
      params: params,
    });
  },

  getRankQuery(params) {
    return request({
      url: `taisl/v2.0/vp/vehicle/rank/query`,
      method: "get",
      params: params,
    });
  },

  getVehValue(params) {
    return request({
      url: `taisl/v2.0/vp/vehicle/label/all/value/query`,
      method: "get",
      params: params,
    });
  },

  getRecommend(params) {
    return request({
      url: `taisl/v2.0/vp/info/class/recommend/query`,
      method: "get",
      params: params,
    });
  },
  
  getInventory(params) {
    return request({
      url: `taisl/v2.0/vp/label/class/inventory/query`,
      method: "get",
      params: params,
    });
  },

  PostNewClass(params) {
    return request({
      url: `taisl/v2.0/vp/class/create`,
      method: "post",
      data: params,
    });
  },

  getphotoSearchClass(params) {
    return request({
      url: `taisl/v2.0/vp/label/class/inventory/query`,
      method: "get",
      params: params,
    });
  },

  getphotoSearch(params) {
    return request({
      url: `taisl/v2.0/vp/info/label/system/inventory/query`,
      method: "get",
      params: params,
    });
  },

  PostNewLabel(params) {
    return request({
      url: `taisl/v2.0/vp/label/subscribe/create`,
      method: "post",
      data: params,
    });
  },

};
