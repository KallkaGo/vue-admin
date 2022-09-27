<template>
  <div class="login-panel">
    <h1>后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab" >
      <el-tab-pane name="account" >
        <template #label>
          <span class="custom-tabs-label">
            <el-icon>
              <User />
            </el-icon>
          </span>
          <span>账号登录</span>
        </template>
        <login-acc ref="acclogin" />
      </el-tab-pane>
      <el-tab-pane label="Config" name="phone" >
        <template #label>
          <span class="custom-tabs-label">
            <el-icon>
              <Iphone />
            </el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox label="记住密码" v-model="isKeepPassword" ></el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <div>
        <el-button type="primary" class="login-button" @click="handleCLick" >立即登录</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">

import LoginAcc from "./login-acc.vue";
import LoginPhone from "./login-phone.vue";
/* 属性 */
const currentTab =ref<string>('account')
const isKeepPassword = ref(true)
const acclogin = ref<InstanceType<typeof LoginAcc>>()
const phoneLogin = ref<InstanceType<typeof LoginPhone>>()

/* 方法 */
const handleCLick = ()=>{
    if(currentTab.value === 'account'){
    
        acclogin.value?.loginAction(isKeepPassword?.value);
    }else{
        phoneLogin.value?.loginAction(isKeepPassword?.value)
    }
   
    
}
</script>

<style scoped>
.login-panel {
  width: 320px;
  text-align: center;
  margin-bottom: 120px;
}
.account-control{
    display: flex;
    justify-content: space-between;
    margin:10px;
}
.login-button{
    width: 100%;
}
</style>
