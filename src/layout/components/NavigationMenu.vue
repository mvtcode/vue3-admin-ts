<template>
  <div class="topbar">
    <div class="left-menu">
      <!-- <el-button link @click="$emit('toggleMenu', 'value')"> -->
      <el-button link @click="toggleClick">
        <el-icon :size="22"> <MenuIcon /> </el-icon>
      </el-button>
      <router-link to="/" class="title"> {{ props.title }} </router-link>
    </div>

    <div class="right-menu">
      <span class="username">{{ userInfo ? userInfo.username : "" }}</span>
      <el-dropdown class="dropdown">
        <div class="avatar-wrapper">
          <el-avatar
            :size="32"
            :src="require('@/assets/images/no-avatar.png')"
          />
          <el-icon class="icon-caret-bottom"><CaretBottomIconSvg /></el-icon>
        </div>

        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> Home </el-dropdown-item>
            </router-link>
            <router-link to="/profile">
              <el-dropdown-item> Profile </el-dropdown-item>
            </router-link>
            <el-dropdown-item @click="logout">
              <span style="display: block"> Logout </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <ConfirmComponent ref="confirmRef" />
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmits, computed } from "vue";
import store from "@/store";
import { CaretBottom as CaretBottomIconSvg } from "@element-plus/icons-vue";
import { Menu as MenuIcon } from "@element-plus/icons-vue";
import ConfirmComponent from "@/components/ConfirmComponent.vue";
import { Logout } from "@/services/auth";
import { PayloadToken } from "@/dto/authRes";

const props = defineProps({
  title: String,
});

const userInfo: PayloadToken = computed(() => {
  return store.getters["user/getInfo"];
});

const confirmRef = ref<typeof ConfirmComponent>();
const logout = async () => {
  confirmRef.value?.show("Bạn muốn thoát không?", null, (result: boolean) => {
    if (result) Logout();
  });
};

const changeEmitName = "toggleMenu";
const emits = defineEmits<{
  (e: typeof changeEmitName, value: string): void;
}>();
const toggleClick = () => {
  emits(changeEmitName, "click_toggle");
};
</script>

<style lang="scss" scoped>
.topbar {
  background: #ecf5ff;
  height: 50px;
  text-align: center;
  box-shadow: inset 0px -1px 0px #dddddd;
  margin-left: 1px;

  .left-menu {
    float: left;
    margin: 10px;

    .title {
      font-weight: 600;
      font-size: 17px;
      margin-left: 15px;
      color: #0079d1;
      text-decoration: none;
    }
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 46px;
    text-align: center;

    &:focus {
      outline: none;
    }

    .username {
      display: inline-block;
      vertical-align: middle;
      font-weight: 600;
    }

    .dropdown {
      height: 100%;
      margin-left: 10px;
      margin-right: 20px;

      .avatar-wrapper {
        display: flex;
        align-items: center;
        height: 100%;
        cursor: pointer;

        .avatar-user {
          margin-left: 10px;
          height: 32px;
          width: 32px;
          border-radius: 50%;
          object-fit: cover;
        }

        .icon-avatar {
          margin-left: 10px;
          height: 32px;
          width: 32px;
          border-radius: 50%;
          background: #97a8be;
          color: #fff;
        }

        .icon-caret-bottom {
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
