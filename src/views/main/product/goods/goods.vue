<template>
  <div>
    <div class="content">
      <PageContent :tableconfig="Tableconfig" PageName="goods">
        <template #img="scope">
          <el-image
            style="width: 60px; height: 60px"
            :src="scope.row.imgUrl"
            :preview-src-list="[scope.row.imgUrl]"
          />
        </template>
      </PageContent>
      <!-- <CmTable v-bind="Tableconfig" :tableData="GoodsList">
        <template #operate>
          <el-button size="small" :icon="Edit">编辑</el-button>
          <el-button size="small" :icon="Delete">删除</el-button>
        </template>
        <template #img="scope">
          <el-image
            style="width: 60px; height: 60px"
            :src="scope.row.imgUrl"
            :preview-src-list="[scope.row.imgUrl]"
         
          />
        </template>
        <template #footer>
          <div class="pagination">
            <el-pagination
              v-model:currentPage="page.currentPage"
              v-model:page-size="page.Pagesize"
              :page-sizes="pagesizeList"
              layout="->,total, sizes, prev, pager, next, jumper"
              :total="GoodsCount"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </template>
      </CmTable> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import PageContent from "@/components/pageContent";
import { Tableconfig } from "./config/goodsConfig";
import { useStore } from "@/store";

const pagesizeList = ref([10, 50, 100]);

const page = reactive({
  currentPage: 1,
  Pagesize: 10,
});
</script>

<style lang="less" scoped>
.content {
  padding: 10px;
}
.pagination {
  padding-top: 10px;
}
</style>
