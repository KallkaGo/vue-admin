<template>
  <el-form
    ref="phoneForm"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="80px"
    class="demo-ruleForm"
    size="small"
    label-position="left"
  >
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="ruleForm.phone" type="text" autocomplete="off" />
    </el-form-item>

    <el-form-item label="验证码" prop="code">
      <div class="get-code">
        <el-input v-model="ruleForm.code" type="password" />
        <el-button type="primary" class="codebutton">获取验证码</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { FormInstance } from "element-plus";
import LocalCache from "@/utils/cache";
import { useStore } from "vuex";

type loginPhoneionfo = {
  phone: string;
  code: string;
};
const store = useStore();
const ruleForm = reactive<loginPhoneionfo>({
  phone: "",
  code: "",
});
const phoneForm = ref<FormInstance>();
const rules = reactive({});
const loginAction = async (isKeepPassword: boolean) => {
  if (!phoneForm) return;
  await phoneForm.value?.validate((valid) => {
    if (valid) {
      if (isKeepPassword) {
        //本地缓存
      
      } else {
      
      }
    
      console.log("成功");
    }
  });
};

defineExpose({loginAction})
</script>

<style lang="less" scoped>
.get-code {
  display: flex;
}
.codebutton {
  margin-left: 10px;
}
</style>
