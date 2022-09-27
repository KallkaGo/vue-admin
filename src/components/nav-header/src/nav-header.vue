<template>
  <div class="nav-header">
    <div @click="handleFold" class="container-icon">
      <el-icon class="iconStyle" v-if="!isFold">
        <Fold />
      </el-icon>
      <el-icon class="iconStyle" v-else><Expand /></el-icon>
    </div>
    <div class="content">
      <div>
        <el-breadcrumb separator="/">
          <template v-for="item in breadcrumb" :key="item.name">
            <el-breadcrumb-item :to="{ path: item.path }">{{
              item.name
            }}</el-breadcrumb-item>
          </template>
        </el-breadcrumb>
      </div>
      <div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar :size="40" :src="img" />
            <span class="username">{{ name }}</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleExit">
                <el-icon><Close /></el-icon>
                <span>退出登录</span>
              </el-dropdown-item>
              <el-dropdown-item divided>用户信息</el-dropdown-item>
              <el-dropdown-item>系统管理</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { pathMapBreadcrumb } from "@/utils/map-menus";
import { useRoute,useRouter } from "vue-router";
import UseEchart from '@/hooks/useEcharts'
import  localCache from '@/utils/cache'



const isFold = ref(false);
const emit = defineEmits(["foldChange"]);
const handleFold = () => {
  isFold.value = !isFold.value;
  emit("foldChange", isFold.value);

};
const router = useRouter()
const route = useRoute();
const store = useStore();

/* 面包屑数据 */
const breadcrumb = computed(() => {
  const userMenu = store.state.login.userMenu;
  const currentpath = route.path;
  return pathMapBreadcrumb(userMenu, currentpath);
});

const name = computed(() => {
  return store.state.login.userinfo.name;
});
const img = require("@/assets/image/avatar.jpg");

const handleExit =()=>{
  localCache.deleteCache('token')
  router.push('/main')
}

</script>

<style lang="less" scoped>
.container-icon {
  display: inline-flex;
  align-items: center;
}
.iconStyle {
  font-size: 25px;
  cursor: pointer;
}
.nav-header {
  display: flex;
  width: 100%;
}
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  flex: 1;
}
// .el-dropdown-link{
//   display: flex;
//   align-items: center;
// }
.el-avatar {
  vertical-align: middle;
}
.username {
  margin-left: 10px;
}
</style>
