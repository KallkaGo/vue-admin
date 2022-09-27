<template>
  <el-dialog
    :top="top"
    v-model="showdialog"
    :title="dialogtype"
    width="30%"
    :showClose="false"
    center
   :close-on-click-modal=false
  >
    <CmForm v-bind="dialogconfig" v-model="formData"></CmForm>
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="CanCleDialog">Cancel</el-button>
        <el-button type="primary" @click="handleSubmit">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { Ref } from "vue";
import type { CmFormConfig } from "@/common-ui/types";
import CmForm from "@/common-ui/form";

type IformData = {
  [key: string]: string;
};

type Prop = {
  dialogconfig: CmFormConfig;
  showdialog: boolean;
  dialogFormData: IformData;
  PageName: string;
  height?: string;
  otherInfo?: Object;
};

let ModifyType = inject<Ref<string>>("ModifyType");

const dialogtype = computed(() => {
  if (ModifyType?.value === "ADD") {
    return "新增";
  } else if (ModifyType?.value === "EDIT") {
    return "编辑";
  }
});

const props = withDefaults(defineProps<Prop>(),{
  otherInfo:()=>({})
})

const top = computed(() => {
  if (props.height) {
    return (document.body.clientHeight - Number(props.height)) / 2 + 'px';
  } else {
    return "10vh";
  }
});

const formData = ref<IformData>({});

watch(
  () => props.dialogFormData,
  (newValue) => {
    for (const item of props.dialogconfig.formItems) {
      formData.value[`${item.field}`] = newValue[`${item.field}`];
    }
  }
);

const emit = defineEmits(["canclehandle"]);

const CanCleDialog = () => {
  emit("canclehandle");
};
/* 新增/编辑 */
const store = useStore();
const handleSubmit = () => {
  if (ModifyType?.value === "ADD") {
    store.dispatch("system/createPageDate", {
      pageName: props.PageName,
      queryInfo: { ...formData.value, ...props.otherInfo },
    });
    CanCleDialog();
  } else {
    store.dispatch("system/editPageDate", {
      pageName: props.PageName,
      queryInfo: { ...formData.value, ...props.otherInfo },
      id: props.dialogFormData.id,
    });
    CanCleDialog();
  }
};
</script>

<style scoped></style>
