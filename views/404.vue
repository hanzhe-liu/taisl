<template>
  <div class="not-container">
    <img src="../assets/image/404.png" class="not-img" alt="404" />
    <div class="not-detail">
      <h2>404</h2>
      <h4>抱歉，您访问的页面不存在~🤷‍♂️🤷‍♀️</h4>
      <el-button type="primary" @click="$router.push('/')"> 返回首页</el-button>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
// 404
.not-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  .not-img {
    margin-right: 120px;
  }
  .not-detail {
    display: flex;
    flex-direction: column;
    h2 {
      margin-bottom: 30px;
      font-size: 60px;
      font-weight: bold;
      color: #434e59;
    }
    h4 {
      margin-bottom: 20px;
      font-size: 19px;
      color: #848587;
    }
    .el-button {
      width: 100px;
    }
  }
}
</style>
