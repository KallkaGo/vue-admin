<template>
  <div class="zhmenu">
    <PageContent :tableconfig="Tableconfig"  PageName="menu"></PageContent>
  </div>
</template>

<script setup lang="ts">
import PageContent from '@/components/pageContent'
import { config, Tableconfig } from "./config/menuconfig";

</script>

<style lang="less" scoped>
.zhmenu {
  padding: 10px;
}
.pagination {
  padding-top: 10px;
}
</style>
