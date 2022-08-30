<template>
  <div class="login-container">
    <div class="loginbox">
      <div class="title-box"></div>
      <el-form :model="loginForm" :rules="loginRules" ref="loginRef">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-login" @click="loginFn"
            >登录</el-button
          >
          <el-link type="info" @click="$router.push('/reg')">去注册</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginAPI } from "@/api";
import { mapMutations } from "vuex";
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9]{1,10}$/,
            message: "用户名必须是1-10的字母数字",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^\S{6,15}$/,
            message: "用户名必须是6-15的非空字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapMutations(['updateToken']),
     loginFn() {
      this.$refs.loginRef.validate(async valid => {
        if (valid) {
          const { data: res } = await loginAPI(this.loginForm)
          if (res.code === 0) {
            this.$message.success(res.message)
            this.updateToken(res.token)

            this.$router.push('/')
          } else {
            this.$message.error(res.message)
          }
          
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  background: linear-gradient(45deg, blue, red);
  position: absolute;
  width: 100%;
  height: 100%;
  .loginbox {
    width: 400px;
    height: 270px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 30px;
    box-sizing: border-box;
  }
  .title-box {
    height: 60px;
    background: #fff;
  }
  .btn-login {
    width: 100%;
  }
}
</style>