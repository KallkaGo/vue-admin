<template>
  <div class="header">
    <slot name="header"></slot>
  </div>
  <el-table :data="tableData" border style="width: 100%" v-bind="childrenProps">
    <el-table-column
      v-if="showIndex"
      type="selection"
      align="center"
      width="60"
    ></el-table-column>
    <el-table-column
      v-if="showIndex"
      type="index"
      align="center"
      width="80"
      label="序号"
    ></el-table-column>
    <template v-for="(item, index) in propList" :key="item.id">
      <el-table-column v-bind="item" align="center" show-overflow-tooltip>
        <template #default="scope">
          <slot :name="item.slotName" :row="scope.row">
            {{ scope.row[item.prop] }}
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
  <div class="footer">
    <slot name="footer">
      <div class="pagination" v-if="showfooter">
        <el-pagination
          v-model:currentPage="page.currentPage"
          v-model:page-size="page.Pagesize"
          :page-sizes="pagesizeList"
          layout="->,total, sizes, prev, pager, next, jumper"
          :total="dataCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
type Props = {
  tableData: any[];
  propList: any[];
  showIndex?: boolean;
  showSelect?: boolean;
  showfooter?: boolean;
  childrenProps?: Object;
  dataCount?: number;
};
withDefaults(defineProps<Props>(), {
  tableData: () => [],
  showIndex: false,
  showSelect: false,
  showfooter: true,
  dataCount: 10,
  childrenProps: () => ({}),
});

const pagesizeList = ref([50, 100]);

const handleSizeChange = () => {};

const handleCurrentChange = () => {};

const page = reactive({
  currentPage: 1,
  Pagesize: 15,
});


</script>

<style lang="less" scoped>
.el-table {
  & ::v-deep th.el-table__cell,
  ::v-deep td.el-table__cell {
    // 设置position 使得 子元素不与其产生新的层叠关系
    position: static;
  }
}
.pagination{
  padding-top: 10px;
}
</style>
