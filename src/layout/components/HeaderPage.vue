<template>
  <div class="el-menu">
    <el-page-header :icon="Menu" content="detail">
      <template #title>&nbsp;</template>
    </el-page-header>
  </div>
</template>

<script lang="ts" setup>
import { Menu } from "@element-plus/icons-vue";
</script>

<style lang="scss">
.flex-grow {
  flex-grow: 1;
}

.el-header {
  --el-header-padding: 0;
}

.el-menu {
  background: #ecf5ff;
  align-content: center;

  .el-page-header {
    padding: 15px 10px;
  }
}
</style>
