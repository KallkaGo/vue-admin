<template>
  <div class="zhmenu">
    <div class="addbtn">
      <el-button type="primary"  @click="Handleadd">新增用户</el-button>
    </div>
    <CmTable v-bind="tableconfig" :tableData="datalist" :dataCount="dataCount">
      <template #operate="scope">
        <el-button v-if="isUpdate" size="small" :icon="Edit" @click="handleEdit((scope.row))">编辑</el-button>
        <el-button
          v-if="isDelete"
          size="small"
          :icon="Delete"
          @click="handleDelete(scope.row)"
          >删除</el-button
        >
      </template>
      <template #createAt="scope">
        {{ $filter.formatTime(scope.row.createAt) }}
      </template>

      <template
        v-for="item in otherSlot"
        :key="item.slotName"
        #[`${item.slotName}`]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </CmTable>
  </div>
</template>

<script setup lang="ts">
import { ComponentInternalInstance } from "vue";
import { Delete, Edit } from "@element-plus/icons-vue";
import { CmTableprop } from "@/common-ui/types";
import CmTable from "@/common-ui/table";
import { useStore } from "@/store/index";
import { permission } from "@/hooks/permission";
type Props = {
  PageName: string;
  tableconfig: CmTableprop;
};
const prop = defineProps<Props>();
const isCreate = permission(prop.PageName, "create");
const isUpdate = permission(prop.PageName, "update");
const isDelete = permission(prop.PageName, "delete");
const isQuery = permission(prop.PageName, "query");

const { appContext } = getCurrentInstance() as ComponentInternalInstance;



const store = useStore();

const page = reactive({
  currentPage: 1,
  Pagesize: 10,
});

const GetTablelList = (param: any = {}) => {
  if (!isQuery) return;
  store.dispatch("system/getPageListAction", {
    pageName: prop.PageName,
    queryInfo: {
      offset: (page.currentPage - 1) * page.Pagesize,
      size: page.Pagesize,
      ...param,
    },
  });
};

const emit=defineEmits(['adduser','edituser'])

const handleEdit = (row:any)=>{
  emit('edituser',row)
}

const handleDelete = (row: any) => {
  appContext.config.globalProperties
    .$confirm("确认删除该用户吗？", "确认", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    })
    .then(() => {
      store.dispatch("system/deletePageDataAction", {
        pageName: prop.PageName,
        id: row.id,
      });
    });
};

const Handleadd = ()=>{
  
  emit('adduser')
}

onMounted(() => {
  GetTablelList();
});
const datalist = computed(() => {
  return store.getters[`system/pageListData`](prop.PageName);
});


const dataCount = computed(() => {
  return store.getters[`system/pageListCount`](prop.PageName);
});

const otherSlot = prop.tableconfig.propList.filter((item) => {
  if (item.slotName === "status") return false;
  if (item.slotName === "createAt") return false;
  if (item.slotName === "updateAt") return false;
  if (item.slotName === "operate") return false;
  return true;
});
defineExpose({ GetTablelList });
</script>

<style lang="less" scoped>
.zhmenu {
  padding: 10px;
}
.pagination {
  padding-top: 10px;
}
.addbtn{
  padding-bottom: 10px;
  text-align: right;
}
</style>
