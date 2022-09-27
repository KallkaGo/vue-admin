<template>
  <el-form
    ref="accForm"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="80px"
    class="demo-ruleForm"
    size="small"
    label-position="left"
  >
    <el-form-item label="账号" prop="name">
      <el-input v-model="ruleForm.name" type="text" autocomplete="off" />
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" type="password" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import LocalCache from "@/utils/cache";
import { FormInstance } from "element-plus";
import { useStore } from "vuex";

const store = useStore();

type Logininfo = {
  name: string;
  password: string;
};
const ruleForm = reactive<Logininfo>({
  name: LocalCache.getCache("account") ?? "",
  password: LocalCache.getCache("password") ?? "",
});
const rules = reactive({
    name: [
    {
      required: true,
      message: "Required",
      trigger: "change",
    },
    {
      pattern: /^[a-z0-9]{3,10}$/,
      message: "用户名必须是5-10个字母或数字",
    },
  ],
  password: [
    { required: true, message: "Required", trigger: "change" },
    { pattern: /^[a-z0-9]{3,}$/, message: "密码必须是3个字母或者数字" },
  ],
});
const accForm = ref<FormInstance>();
const loginAction = async (isKeepPassword: boolean) => {
  if (!accForm) return;
  await accForm.value?.validate((valid) => {
    if (valid) {
      if (isKeepPassword) {
        //本地缓存
        LocalCache.setCache("account", ruleForm.name);
        LocalCache.setCache("password", ruleForm.password);
      } else {
        LocalCache.deleteCache("account");
        LocalCache.deleteCache("password");
      }
      
      store.dispatch("login/accountLoginAction", { ...ruleForm });
      console.log("成功");
    }
  });
};
defineExpose({ loginAction });
</script>

<style scoped></style>
