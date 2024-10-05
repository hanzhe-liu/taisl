var lineOption = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    axisLine: {
      show: false, //隐藏x轴线
    },
    axisTick: {
      show: false, //隐藏x轴刻度
    },
  },
  series: [
    {
      name: "",
      data: "",
      type: "line",
      areaStyle: {
        //区域填充渐变颜色
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#B7D5F9", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#FFF", // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
    },
  ],
};
export default lineOption;
