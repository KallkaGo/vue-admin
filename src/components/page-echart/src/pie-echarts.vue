<template>
  <div class="pie-echart">
    <Cmchart :options="options"></Cmchart>
  </div>
</template>

<script setup lang="ts">
import Cmchart from "@/common-ui/echart";
import type { pieDataType } from "../types";

type Props = {
  pieData: pieDataType[];
};

const propData = defineProps<Props>();

const options = computed<echarts.EChartsOption>(() => {
  return {
   
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "horizontal",
      left: "left",
    },
    series: [
      {
        name: "分类数据",
        type: "pie",
        radius: "50%",
        data: propData.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
});
</script>

<style scoped></style>
