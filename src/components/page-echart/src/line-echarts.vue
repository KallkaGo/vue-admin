<template>
  <div class="line-echarts">
    <Cmchart :options="options"></Cmchart>
  </div>
</template>

<script setup lang="ts">
import Cmchart from "@/common-ui/echart";
type Props = {
  lineData: Array<number>;
  Xlabel: string[];
};
const propData = defineProps<Props>();

const options = computed<echarts.EChartsOption>(() => {
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend:{},
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: propData.Xlabel,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "分销总量",
        type: "line",
        stack: "总量",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: propData.lineData,
      },
    ],
  };
});
</script>

<style scoped></style>
