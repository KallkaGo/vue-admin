<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="7">
        <CmCard title="分类商品数量(饼图)">
          <PieEchart :pieData="Goodscount"></PieEchart>
        </CmCard>
      </el-col>
      <el-col :span="10"><CmCard title="不同城市商品销量">
        <MapEchart :mapData="addressGoodSale"></MapEchart>
      </CmCard></el-col>
      <el-col :span="7"
        ><CmCard title="分类商品数量(玫瑰图)">
          <RoseEchart :pieData="Goodscount"></RoseEchart> </CmCard
      ></el-col>
    </el-row>
    <el-row :gutter="20" class="bottomCard">
      <el-col :span="12">
        <CmCard title="分类商品销量">
          <LineEchart v-bind="GoodsSale"></LineEchart> </CmCard
      ></el-col>
      <el-col :span="12"><CmCard title="分类商品收藏">
        <BarEchart v-bind="GoodsFavor" ></BarEchart>
      </CmCard></el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { PieEchart, RoseEchart, LineEchart,BarEchart, MapEchart } from "@/components/page-echart";
import { useStore } from "@/store";
import CmCard from "@/common-ui/card";
const store = useStore();
onMounted(() => {
  store.dispatch("dashboard/getDashboardDataAction");
});

const Goodscount = computed(() => {
  return store.state.dashboard.goodsCount.map((item: any) => {
    return { name: item.name, value: item.goodsCount };
  });
});

const GoodsSale = computed(() => {
  const Xlabel: string[] = [];
  const lineData:any[]=[]
  const GoodSaleData = store.state.dashboard.goodsSale
  for( const item of GoodSaleData){
    Xlabel.push(item.name)
    lineData.push(item.goodsCount)
  }
  return{
    Xlabel,
    lineData
  }
});
const GoodsFavor = computed(() => {
  const Xlabel: string[] = [];
  const BarData:any[]=[]
  const GoodFavor = store.state.dashboard.goodsFavor
  for( const item of GoodFavor){
    Xlabel.push(item.name)
    BarData.push(item.goodsFavor)
  }
  return{
    Xlabel,
    BarData
  }
});

const addressGoodSale = computed(()=>store.state.dashboard.addressGoodsSale)
console.log(GoodsFavor);


</script>

<style lang="less" scoped>
.dashboard {
  background-color: #f0f2f5;
}
.bottomCard {
  margin-top: 20px;
}
</style>
