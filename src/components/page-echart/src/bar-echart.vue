<template>
  <div class="bar-echart">
    <Cmchart :options="options"></Cmchart>
  </div>
</template>

<script setup lang="ts">
import Cmchart from "@/common-ui/echart";
import { EChartsOption } from "echarts";
import * as echarts from 'echarts'
type Props = {
    Xlabel:string[],
    BarData:any[]
};
const propData = defineProps<Props>();

const options = computed<EChartsOption>(() => {
  return {
    xAxis: {
      data: propData.Xlabel,
      axisLabel: {
        inside: true,
        color: "#fff",
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      z: 10,
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#999",
      },
    },
    dataZoom: [
      {
        type: "inside",
      },
    ],
    series: [
      {
        type: "bar",
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#83bff6" },
            { offset: 0.5, color: "#188df0" },
            { offset: 1, color: "#188df0" },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#2378f7" },
              { offset: 0.7, color: "#2378f7" },
              { offset: 1, color: "#83bff6" },
            ]),
          },
        },
        data: propData.BarData,
      },
    ],
  };
});
</script>

<style scoped></style>
