<template>
  <div class="common-layout">
    <el-container>
      <LeftMenu ref="leftMenu" />
      <el-container>
        <el-header class="header">
          <NavigationMenu title="MyNextPayTech" @toggleMenu="toggleMenuClick" />
        </el-header>
        <el-main>
          <slot />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import NavigationMenu from "./components/NavigationMenu.vue";
import LeftMenu from "./components/LeftMenu.vue";

const leftMenu = ref<typeof LeftMenu>();
const toggleMenuClick = () => {
  leftMenu.value?.toggle();
};
</script>

<style lang="scss">
.common-layout {
  width: 100%;
  min-height: calc(100vh);
  margin: 0;
  padding: 0;

  .header {
    padding: 0;
    height: 45px;
  }

  .el-aside {
    min-height: calc(100vh);
    .el-menu {
      overflow-x: hidden;
      min-height: calc(100vh);
      background: #ecf5ff;
    }
  }

  .el-header {
    display: block;
    clear: both;
  }

  .el-main {
    display: block;
  }
}
</style>
