<template>
  <div>
    <el-card class="clearfix">
      <div slot="header" class="clearfix">
        <span>更换头像</span>
      </div>
      <div>
        <!-- 图片，展示用户头像 -->
        <background1 v-if="!avatar" class="the_img"></background1>
        <img v-else :src="avatar" class="the_img" alt="" />

        <!-- 按钮区域 -->
        <div class="btn-box">
          <input
            type="file"
            accept="image/*"
            style="display: none"
            ref="iptRef"
            @change="onfileChange"
          />
          <el-button type="primary" icon="el-icon-plus" @click="chooseImg"
            >选择图片</el-button
          >
          <el-button
            type="success"
            icon="el-icon-upload"
            @click="uploadFn"
            :disabled="avatar === ''"
            >上传图片</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import background1 from "@/components/background1.vue";
import { updataUserAvatarAPI } from "@/api";
export default {
  components: {
    background1,
  },
  // background1,
  name: "userAvatar",
  data() {
    return {
      avatar: "",
    };
  },
  methods: {
    chooseImg() {
      // 点击选择图片
      this.$refs.iptRef.click();
    },
    onfileChange(e) {
      //e原生事件对象
      const files = e.target.files; //拿到用户选择的数组
      if (files.length === 0) {
        // 证明文件打开了，但没有选择文件
        this.avatar = "";
      } else {
        // 转化成data:image/png;base64
        console.log(files[0]);
        // 1.方案一
        // 语法:URL.createObjectURL(文件)
        // 返回值:内存临时地址
        // 不能传给后端
        // this.avatar = URL.createObjectURL(files[0])
        // 2.方案二
        // 1.创建FileReader对象
        const fr = new FileReader();
        // 2.调用readAsAataURL(files[0])
        fr.readAsDataURL(files[0]);
        // 3.调用fr的onload事件
        fr.onload = (e) => {
          // 4.调用e.target.files获取到的结果，值为字符串，可传给后端
          this.avatar = e.target.result; //显示在img中
        };
      }
    },
    // 上传头像
    async uploadFn() {
      const { data: res } = await updataUserAvatarAPI(this.avatar);
      console.log(res);
      if (res.code !== 0) return this.$message.error(res.message);
      // 更新头像成功
      this.$message.success(res.message);
      // 立刻让vuex里action（获取用户信息的action）再请求一次后台更新vuex里的值
      this.$store.dispatch("getUserInfoActions");
    },
  },
};
</script>

<style lang="less" scoped>
.btn-box {
  margin-top: 10px;
}
.preview {
  object-fit: cover;
}
.the_img {
  width: 350px;
  height: 350px;
}
</style>