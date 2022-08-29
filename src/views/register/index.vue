<template>
  <div class="reg-container">
    <div class="regbox">
      <div class="title-box"></div>
      <el-form :model="form" ref="form" :rules="rulesObj">
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item prop="repassword">
          <el-input
            v-model="form.repassword"
            placeholder="请再次确认密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-reg" @click="registerFn"
            >注册</el-button
          >
          <el-link type="info" @click="$router.push('/login')">去登录</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { registerAPI } from "@/api";
export default {
  name: "reg",
  data() {
    const samePwdFn = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error("两次输入的密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        password: "",
        repassword: "",
      },
      rulesObj: {
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
        repassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          {
            pattern: /^\S{6,15}$/,
            message: "用户名必须是6-15的非空字符",
            trigger: "blur",
          },
          { validator: samePwdFn, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    registerFn() {
      // js兜底校验
      this.$refs.form.validate(async valid => {
        if (valid) {
          console.log(this.form);
          const { data: res } = await registerAPI(this.form);
          console.log(res);
          if (res.code !== 0) return this.$message.error(res.message);

          this.$message.success(res.message);
          this.$router.push("/login");
        } else {
          // this.$message.error(res.message)
          return false; //阻止默认提交行为
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.reg-container {
  background: linear-gradient(45deg, blue, red);
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  .regbox {
    width: 400px;
    height: 340px;
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
  .btn-reg {
    width: 100%;
  }
}
</style>