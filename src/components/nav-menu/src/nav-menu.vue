<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/image/logo.svg" alt="logo" />
      <span v-if="!IsFold" class="title">Vue3.2 +TS</span>
    </div>
    <el-menu
      active-text-color="#409EFF"
      background-color="#141414"
      class="el-menu-vertical-demo"
      :default-active="defaultvalue"
      text-color="#fff"
      :collapse="IsFold"
    >
      <template v-for="item in userMenu" :key="item.id">
        <!-- 二级菜单 -->

        <el-sub-menu v-if="item.type == 1" :index="item.id + ''">
          <template #title>
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="subitem in item.children" :key="subitem.id">
            <el-menu-item
              :index="subitem.id + ''"
              @click="handleClick(subitem)"
            >
              <i v-if="subitem.icon" :class="subitem.icon"></i>
              <span>{{ subitem.name }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>

        <!-- 一级菜单 -->
        <el-menu-item v-else :index="item.id + ''">
          <i v-if="item.icon" :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store/index";
import router from "@/router";
import { useRoute } from "vue-router";
import { pathMaptoMenu, firstMenu } from "@/utils/map-menus";
type Porps = {
  IsFold: boolean;
};
withDefaults(defineProps<Porps>(), {
  IsFold: false,
});

const store = useStore();
const userMenu = computed(() => store.state.login.userMenu);

const route = useRoute();
const currentpath = route.path;
/* 根绝当前的currentpath 去 userMenu找到和currentpath相等的menu*/
const menu = pathMaptoMenu(userMenu.value, currentpath);

const defaultvalue = ref<string>(
  (menu == undefined ? '' : menu.id) + ""
);

const handleClick = (item: any) => {
  router.push({
    path: item.url ?? "not-found",
  });
};
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #141414;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  //   // 目录
  //   .el-sub-menu {
  //     background-color: #001529 !important;
  //     // 二级菜单 ( 默认背景 )
  //     .el-menu-item {
  //       padding-left: 50px !important;
  //       background-color: #0c2135 !important;
  //     }
  //   }

  //   ::v-deep .el-sub-menu__title {
  //     background-color: #001529 !important;
  //   }

  //   // hover 高亮
  //   .el-menu-item:hover {
  //     color: #fff !important; // 菜单
  //   }

  //   .el-menu-item.is-active {
  //     color: #fff !important;
  //     background-color: #0a60bd !important;
  //   }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
