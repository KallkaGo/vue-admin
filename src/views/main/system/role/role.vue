<template>
  <div class="role">
    <div>
      <CmForm v-bind="config" v-model="formData">
        <template #footer>
          <div class="footerbtn">
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button type="primary" @click="zhRequest.testCLick">{{ testCLick }}</el-button>
            <el-button @click="handleReset">重置</el-button>
          </div>
        </template>
      </CmForm>
    </div>
    <div class="page-content">
      <PageContent
          ref="RefpageContent"
          :tableconfig="Tableconfig"
          PageName="role"
          @edituser="handleEdit"
          @adduser="handleAddUser"
      ></PageContent>
    </div>
    <Commondailog
        height="417"
        :otherInfo="otherInfo"
        :dialogconfig="dialogconfig"
        :showdialog="showdialog"
        :dialogFormData="dialogFormData"
        @canclehandle="CancleDialog"
        PageName="role"
    >
      <div class="menuTree">
        <el-tree
            ref="treeRef"
            :data="treeData"
            show-checkbox
            node-key="id"
            highlight-current
            :props="{ children: 'children', label: 'name' }"
            @check="handleCheck"
        />
      </div>
    </Commondailog>
  </div>
</template>

<script setup lang="ts">
import {dialogconfig} from "./dialogconfig/dialogconfig";
import {Tableconfig, config} from "./config/roleconfig";
import PageContent from "@/components/pageContent";
import CmForm from "@/common-ui/form/src/form.vue";
import {useStore} from "@/store";
import {ElTree} from "element-plus";
import {getMenucheck} from "@/utils/map-menus";
import zhRequest from "@/request/request";
import {ComponentInternalInstance} from 'vue';

const {testCLick} = zhRequest
const a = getCurrentInstance() as ComponentInternalInstance
console.log('proxy', a)
const modiftType = ref("");
provide("ModifyType", modiftType);

const OrignformData: any = {};

for (const item of config.formItems) {
  OrignformData[item.field] = "";
}

const formData = ref(OrignformData);

const otherInfo = ref({});

const showdialog = ref(false);
const dialogFormData = ref({});

/* 树形控件 */
const store = useStore();
const treeData = computed(() => store.state.entireMenu);

const CancleDialog = () => {
  showdialog.value = false;
};

const treeRef = ref<InstanceType<typeof ElTree>>();

const handleEdit = (data: any) => {
  const LeafKeys = getMenucheck([...data.menuList]);
  modiftType.value = "EDIT";
  dialogFormData.value = {...data};
  showdialog.value = true;
  nextTick(() => {
    treeRef.value?.setCheckedKeys(LeafKeys, false);
  });
};

const handleAddUser = () => {
  modiftType.value = "ADD";
  dialogFormData.value = {};
  showdialog.value = true;
};

const RefpageContent = ref<InstanceType<typeof PageContent>>();

const handleReset = () => {
  // for(const item in OrignformData){

  //   formData.value[`${item}`] = OrignformData[item]
  // }

  formData.value = OrignformData;
};

const handleSearch = () => {
  let param = {...formData.value};
  RefpageContent.value?.GetTablelList(param);
  console.log()
};
const handleCheck = (data1: any, data2: any) => {
  const checkedKeys = data2.checkedKeys;
  const halfCheckedKeys = data2.halfCheckedKeys;
  console.log(data1, data2);

  const menuList = [...checkedKeys, ...halfCheckedKeys];
  otherInfo.value = {menuList};
};
</script>

<style lang="less" scoped>
.footerbtn {
  text-align: right;
  padding: 0 50px 20px 0;
}

.pagination {
  padding-top: 10px;
}

.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}

.addbtn {
  float: right;
  padding-bottom: 10px;
}

.menuTree {
  margin-left: 70px;
}
</style>
