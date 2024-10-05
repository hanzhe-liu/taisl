<template>
  <div class="chart-container" ref="chart"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  option: {
    type: Object,
    required: true,
  },
  height: {
    type: String,
    default: "400px",
  },
});

let chart;

onMounted(() => {
  chart = echarts.init($refs.chart);
  chart.setOption(props.option);
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  chart.dispose();
});

const handleResize = () => {
  chart.resize();
};
</script>

<style scoped>
.chart-container {
  height: 100%;
}
</style>
