<template>
  <div ref="chartDom" :style="{ width: w, height: h }"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import useEchart from "@/hooks/useEcharts";
import { useStore } from "@/store";

type Prop = {
  w?: string;
  h?: string;
  options: echarts.EChartsOption;
};

const store = useStore();

const props = withDefaults(defineProps<Prop>(), {
  w: "100%",
  h: "300px",
});

const chartDom = ref<HTMLElement>();

onMounted(() => {
  const { setOptions } = useEchart(chartDom.value!);
  watchEffect(() => {
    setOptions(props.options);
  });
});

watch(
  () => store.state.IsFold,
  () => {
    const { UodateResize } = useEchart(chartDom.value!);
    setTimeout(() => {
      UodateResize();
    }, 300);
  }
);
</script>

<style scoped></style>
