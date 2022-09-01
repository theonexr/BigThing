<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>重置密码</span>
      </div>
      <!-- 表单 -->
      <el-form
        :model="pwdForm"
        :rules="pwdFormRules"
        ref="pwdFormRef"
        label-width="100px"
      >
        <el-form-item label="原密码" prop="old_pwd">
          <el-input v-model="pwdForm.old_pwd" type="password"></el-input>
        </el-form-item>

        <el-form-item label="新密码" prop="new_pwd">
          <el-input v-model="pwdForm.new_pwd" type="password"></el-input>
        </el-form-item>

        <el-form-item label="确认新密码" prop="re_pwd">
          <el-input v-model="pwdForm.re_pwd" type="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="updatePwdFn">修改密码</el-button>
          <el-button @click="resetFn">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { updatePwdAPI } from "@/api";
export default {
  name: "userPwd",
  data() {
    // 新旧密码不能相同
    const samePwd = (rules, value, callback) => {
      // value(新密码)
      if (this.pwdForm.old_pwd === value) {
        callback(new Error("新旧密码不能相同"));
      } else {
        callback();
      }
    };
    // 确认密码和新密码保持一致
    const rePwd = (rules, value, callback) => {
      // value(确认密码)
      if (this.pwdForm.new_pwd !== value) {
        callback(new Error("两次密码输出不一致"));
      } else {
        callback();
      }
    };
    return {
      pwdForm: {
        old_pwd: "",
        new_pwd: "",
        re_pwd: "",
      },
      pwdFormRules: {
        old_pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^\S{1,10}$/,
            message: "密码长度必须是6-15的非空字符串",
            trigger: "blur",
          },
        ],
        new_pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^\S{1,10}$/,
            message: "密码长度必须是6-15的非空字符串",
            trigger: "blur",
          },
          { validator: samePwd, trigger: "blur" },
        ],
        re_pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^\S{1,10}$/,
            message: "密码长度必须是6-15的非空字符串",
            trigger: "blur",
          },
          { validator: rePwd, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    updatePwdFn() {
      this.$refs.pwdFormRef.validate(async (valid) => {
        if (valid) {
          const { data: res } = await updatePwdAPI(this.pwdForm);
          if (res.code !== 0) return this.$message.error("原密码不正确");
          // 更新成功，刷新vuex中数据
          this.$message.success("密码更新成功！");
          // 重置密码
          this.$refs.pwdFormRef.resetFields()
          // 被动退出
          this.$store.commit('')
          this.$store.commit('')
          this.$router.push('/login')
        } else {
          return false;
        }
      });
    },
    // 重置按钮
    resetFn() {
      // this.pwdForm.new_pwd = ''
      // this.pwdForm.re_pwd = ''

      // el-form提供了一个重置表单
      this.$refs.pwdFormRef.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
// .text {
//   font-size: 14px;
// }

// .item {
//   margin-bottom: 18px;
// }

// .clearfix:before,
// .clearfix:after {
//   display: table;
//   content: "";
// }
// .clearfix:after {
//   clear: both;
// }

// .box-card {
//   width: 480px;
// }
.el-form {
  width: 500px;
}
</style>