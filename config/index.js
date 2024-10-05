// 当前环境
const env = import.meta.env.MODE || "prod";
const EnvConfig = {
  development: {
    baseApi: "/api",
    mockApi:
      "https://www.fastmock.site/mock/5f5a4902195b24d8c6cda34f9272b836/admin",
  },
  test: {
    baseApi: "http://taisl.gandongyun.com:8000",
    mockApi: "http://taisl.gandongyun.com:8000",
  },
  prod: {
    // baseApi: "http://taisl.gandongyun.com:8000",
    mockApi: "http://taisl.gandongyun.com:8000",
  },
};
export default {
  env,
  mock: true,
  ...EnvConfig[env],
};
