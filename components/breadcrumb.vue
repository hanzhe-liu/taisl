<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      :to="{ path: item.path }"
      v-for="item in breadcrumbList"
      :key="item.title"
      >{{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
// 面包屑导航功能
const route = useRoute();
const breadcrumbList = ref([]);
const caleBreadcrumb = () => {
  breadcrumbList.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  );
};
watch(
  () => route.path, // 也可以直接写 route ; 即  () => route.path  替换成 route
  () => {
    caleBreadcrumb();
  },
  {
    immediate: true,
  }
);
</script>
<style lang="scss" scoped>
.el-breadcrumb {
  font-size: 1vw;
  line-height: 1;
  padding: 3vh 0 0 1.5vw;
}
</style>
