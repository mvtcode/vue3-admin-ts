<template>
  <div class="loginApp">
    <div class="header">
      <el-image
        style="width: 250px; height: 100px"
        :src="require('@/assets/images/mynptech-logo.svg')"
      />
      <div class="login">
        <el-card>
          <h2>Login</h2>
          <el-form
            class="login-form"
            :model="model"
            :rules="rules"
            ref="ruleFormRef"
            @submit.prevent="submitForm(ruleFormRef)"
            status-icon
          >
            <el-form-item class="v-input" prop="username">
              <el-input
                v-model="model.username"
                placeholder="Username"
                :prefix-icon="User"
              />
            </el-form-item>
            <el-form-item class="v-input" prop="password">
              <el-input
                v-model="model.password"
                placeholder="Password"
                type="password"
                :prefix-icon="Key"
              />
            </el-form-item>
            <el-form-item v-show="message" class="message-error">
              {{ message }}
            </el-form-item>
            <el-form-item>
              <el-button
                :loading="loading"
                class="login-button"
                type="primary"
                native-type="submit"
                block
              >
                Login
              </el-button>
            </el-form-item>
            <router-link to="/forgot">Forgot password ?</router-link>
          </el-form>
        </el-card>
      </div>
      <div class="footer">
        <div class="links">
          <span>Feature 1</span>
          <span>Feature 2</span>
          <span>Feature 3</span>
        </div>
        <div class="version">Version 1.0.0</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import router from "@/router";
import type { FormInstance, FormRules } from "element-plus";
import { User, Key } from "@element-plus/icons-vue";
import { Login, SetToken, SetRefreshToken } from "@/services/auth";
import { LoginRes } from "@/dto/authRes";

const ruleFormRef = ref<FormInstance>();

const model = reactive({
  username: "",
  password: "",
});

const loading = ref(false);
const message = ref("");

const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      message: "Username is required",
      trigger: "blur",
    },
    {
      min: 4,
      message: "Username length should be at least 5 characters",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "Password is required", trigger: "blur" },
    {
      min: 5,
      message: "Password length should be at least 5 characters",
      trigger: "blur",
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        const res: LoginRes = await Login(model);
        if (res.success) {
          const data = res.data;

          // store token
          SetToken(data.token);
          SetRefreshToken(data.refreshToken);

          // // redirect
          const redirect = router.currentRoute.value.query.redirect as string;
          router.replace({ path: redirect || "/" });
        }
      } catch (e: any) {
        showError(e);
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};

const showError = (e: any) => {
  if (e.response?.data?.message) {
    message.value = e.response?.data?.message;
  } else {
    message.value = e.message;
  }
};
</script>

<style lang="scss" scoped>
.loginApp {
  margin: 40px auto;
}

.login {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form {
    width: 290px;

    .v-input {
      margin-bottom: 25px;
    }

    .login-button {
      width: 100%;
      margin-top: 10px;
    }

    .message-error {
      margin-bottom: 0;
      color: #f56c6c;
    }
  }
}

.footer,
.header {
  padding: 20px 20px;
  color: #6a99cc;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1,
  h2,
  h3 {
    color: #7da0c5;
    padding: 0;
    margin: 0;
  }
  h2 {
    margin-top: 10px;
    margin-bottom: 20px;
    text-align: center;
  }

  .links {
    display: flex;
    font-family: "Open Sans";
    span {
      padding: 0 10px;
      font-size: 18px;
      border-right: 1px solid #9fb3c8;
      &:last-child {
        border-right: none;
      }
    }
  }
  .version {
    font-family: "Open Sans";
    padding: 0 10px;
    color: #9fb3c8;
    font-size: 12px;
    margin-top: 5px;
  }
}

.header {
  padding: 10px 20px;
  .logo {
    font-family: "Open Sans";
    letter-spacing: 3px;
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .logo .part-2 {
    color: #d64545;
  }
}

/*login*/
$teal: rgb(0, 124, 137);
.el-button--primary {
  background: $teal;
  border-color: $teal;

  &:hover,
  &.active,
  &:focus {
    background: lighten($teal, 7);
    border-color: lighten($teal, 7);
  }
}

.login .el-input__inner:hover {
  border-color: $teal;
}

.login .el-input__prefix {
  background: rgb(238, 237, 234);
  left: 0;
  height: calc(100% - 2px);
  left: 1px;
  top: 1px;
  border-radius: 3px;
  .el-input__icon {
    width: 30px;
  }
}

.login .el-input input {
  padding-left: 35px;
}

.login .el-card {
  padding-top: 0;
  padding-bottom: 30px;
}

h2 {
  font-family: "Open Sans";
  letter-spacing: 1px;
  font-family: Roboto, sans-serif;
  padding-bottom: 20px;
}

a {
  color: $teal;
  text-decoration: none;
  &:hover,
  &:active,
  &:focus {
    color: lighten($teal, 7);
  }
}

.login .el-card {
  width: 340px;
  display: flex;
  justify-content: center;
}
</style>
