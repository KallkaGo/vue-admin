<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
       {{title}}
      </div>
    </template>
    <div>
      <slot></slot>
    </div>
  </el-card>
</template>

<script setup lang="ts">

type Prop = {
    title:string
}

defineProps<Prop>()

</script>

<style  lang="less"  scoped>
.box-card{
  padding: 10px;
  box-sizing: border-box;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
}
</style>
