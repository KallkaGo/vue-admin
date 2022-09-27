<template>
  <div class="header">
    <slot name="header"></slot>
  </div>
  <el-form :label-width="labelwidth" class="CmForm">
    <el-row>
      <template v-for="(item, index) in formItems" :key="index">
        <el-col v-bind="colLayput">
          <el-form-item
            :label="item.label"
            :rules="item.rules"
            class="form-item"
            v-if="item.isHide != true || ModifyType!=='EDIT' "
          >
            <template v-if="item.type === 'input' || item.type === 'password'">
              <el-input
                :placeholder="item.placeholder"
                :show-password="item.type === 'password'"
                :modelValue="modelValue[`${item.field}`]"
                @update:modelValue="handleValueChange($event, item.field)"
              ></el-input>
            </template>
            <template v-else-if="item.type === 'select'">
              <el-select
                :modelValue="modelValue[`${item.field}`]"
                @update:modelValue="handleValueChange($event, item.field)"
              >
                <el-option
                  v-for="k in item.options"
                  :key="k.title"
                  :label="k.title"
                  :value="k.value"
                ></el-option>
              </el-select>
            </template>
            <template v-else-if="item.type === 'datepicker'">
              <el-date-picker
                v-bind="item.otherOptions"
                :modelValue="modelValue[`${item.field}`]"
                @update:modelValue="handleValueChange($event, item.field)"
              />
            </template>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
  <div class="footer">
    <slot name="footer"></slot>
  </div>
</template>

<script setup lang="ts">
import type { Fromitem } from "../../types";
type IformData = {
  [key: string]: string;
};

type Props = {
  formItems: Array<Fromitem>;
  labelwidth: string;
  colLayput?: Object;
  modelValue: IformData;
  "align-center"?: boolean;
  ModifyType?: string;
};

let ModifyType = inject("ModifyType");


const propData = withDefaults(defineProps<Props>(), {
  formItems: () => [],
  labelwidth: "90px",
  colLayput: () => ({
    xl: 6,
    lg: 8,
    md: 12,
    sm: 24,
    xs: 24,
  }),
});



const emit = defineEmits(["update:modelValue"]);

// watch(
//   formData,
//   (newValue,oldValue) => {

//     emit("update:modelValue", newValue);
//   },
//   {
//     deep: true,

//   }
// );
const handleValueChange = (value: any, field: string) => {
  emit("update:modelValue", { ...propData.modelValue, [field]: value });
};
</script>

<style lang="less" scoped>
.CmForm {
  padding-top: 22px;
  .form-item {
    padding: 5px 30px;
  }
}
.el-select {
  width: 100%;
}
</style>
