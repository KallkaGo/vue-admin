<template>
  <div class="rose-echart">
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
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: "类别数据",
        type: "pie",
        radius: [10, 100],
        center: ["55%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 5,
        },
        data:propData.pieData ,
      },
    ],
  };
});
</script>

<style scoped></style>
