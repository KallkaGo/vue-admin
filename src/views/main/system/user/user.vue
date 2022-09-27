<template>
  <div class="user">
    <div class="search">
      <CmForm v-bind="config" v-model="formData">
        <template #header>
          <h2>高级检索</h2>
        </template>
        <template #footer>
          <div class="footerbtn">
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="handleReset">重置</el-button>
          </div>
        </template>
      </CmForm>
    </div>
    <div class="content">
      <PageContent
        :tableconfig="Tableconfig"
        PageName="users"
        ref="RefpageContent"
        @edituser="handleEdit"
        @adduser="handleAddUser"
      ></PageContent>
    </div>
  </div>
  <Commondailog
    :dialogconfig="dialogconfigRef"
    :showdialog="showdialog"
    :dialogFormData="dialogFormData"
    @canclehandle="CancleDialog"
    PageName="users"
  ></Commondailog>
</template>

<script setup lang="ts">
import PageContent from "@/components/pageContent";

import CmForm from "@/common-ui/form";
import { dialogconfig } from "./dialogconfig/dialogconfig";
import { config, Tableconfig } from "./config/userconfig";
import { useStore } from "@/store";

const store = useStore();
const modiftType = ref("");

provide("ModifyType", modiftType);

const showdialog = ref(false);

const RefpageContent = ref<InstanceType<typeof PageContent>>();

const OrignformData: any = {};

for (const item of config.formItems) {
  OrignformData[item.field] = "";
}

const dialogFormData = ref({});

const formData = ref(OrignformData);
console.log('OrignformData',OrignformData);


const CancleDialog = () => {
  showdialog.value = false;
};

const handleReset = () => {
  // for(const item in OrignformData){

  //   formData.value[`${item}`] = OrignformData[item]
  // }

  formData.value = OrignformData;
};

const handleSearch = () => {
  let param = { ...formData.value };
  RefpageContent.value?.GetTablelList(param);
};

const handleEdit = (data: any) => {
  modiftType.value = "EDIT";
  dialogFormData.value = { ...data };
  showdialog.value = true;
};

const handleAddUser = () => {
  modiftType.value = "ADD";
  dialogFormData.value = {};
  showdialog.value = true;
};

/* 动态添加select下拉列表 */
const dialogconfigRef = computed(() => {
  const departmentItem = dialogconfig.formItems.find(
    (item) => item.field === "departmentId"
  );
  departmentItem!.options = store.state.entireDeaprtment.map((item) => {
    return {
      title: item.name,
      value: item.id,
    };
  });
  const roleItem = dialogconfig.formItems.find(
    (item) => item.field === "roleId"
  );
  roleItem!.options = store.state.entireRole.map((item) => {
    return {
      title: item.name,
      value: item.id,
    };
  });
  return dialogconfig;
});

console.log(store);
</script>

<style lang="less" scoped>
.footerbtn {
  text-align: right;
  padding: 0 50px 20px 0;
}
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
.addbtn {
  float: right;
  padding-bottom: 10px;
}
.pagination {
  padding-top: 10px;
}
</style>
