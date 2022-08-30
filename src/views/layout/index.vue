<template>
  <el-container class="main-container">
    <el-header>
      <img src="../../assets/logo.png" alt="" />
      <el-menu
        class="el-menu-demo"
        background-color="#23262E"
        mode="horizontal"
        text-color="#fff"
        active-text-color="#23262E"
      >
        <el-submenu index="1">
          <template slot="title">
            <img src="../../assets/logo.png" alt="" class="avatar" />
            <span>个人中心</span>
          </template>
          <el-menu-item index="1-1"
            ><i class="el-icon-s-operation"></i>基本资料</el-menu-item
          >
          <el-menu-item index="1-2"
            ><i class="el-icon-camera"></i>更换头像</el-menu-item
          >
          <el-menu-item index="1-3"
            ><i class="el-icon-key"></i>重置密码</el-menu-item
          >
        </el-submenu>
        <el-menu-item index="2" @click="quitFn"
          ><i class="el-icon-switch-button"></i>退出</el-menu-item
        >
      </el-menu>
    </el-header>

    <el-container>
      <el-aside width="200px">
        <div class="user-box">
          <img :src="user_pic" alt="" v-if="user_pic" />
          <img src="../../assets/logo.png" alt="" v-else />
          <span>欢迎{{ nickname || username }}</span>
        </div>
        <!-- 侧边栏导航-菜单 -->
        <!-- default-active:当前激活菜单的el-submenu index 
         @open：submenu展开的回调
         @close：submenu关闭的回调
         active-text-color:激活时的文字颜色
         unique-opened:一次只展开一个
        -->
        <el-menu
          default-active="/home"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#23262E"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          router
        >
          <template v-for="item in menus" >
            <el-menu-item v-if="!item.children" :index="item.indexPath" :key="item.indexPath">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </el-menu-item>

            <el-submenu v-else :index="item.indexPath" :key="item.indexPath">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>

              <el-menu-item v-for="obj,index in item.children" :key="index" :index="obj.indexPath">
                <i :class="obj.icon"></i>
                <span>{{obj.title}}</span>
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <!-- 路由挂载 -->
          <router-view></router-view>
        </el-main>

        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from "vuex";
import { getMenusInfoAPI } from "@/api";
export default {
  name: "layout",
  data() {
    return {
      menus: {},
    };
  },
  created() {
    this.getMenuListFn();
  },
  computed: {
    ...mapGetters(["username", "nickname", "user_pic"]),
  },
  methods: {
    quitFn() {
      this.$confirm("这就想走了吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 清除token
          this.$store.commit("updateToken", "");
          //   清除vuex中储存的信息
          this.$store.commit("updateUserInfo", {});
          this.$router.push("/login");
          this.$message({
            type: "success",
            message: "别回来了!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "不走就好",
          });
        });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    async getMenuListFn() {
      const res = await getMenusInfoAPI();
      console.log(res);
      this.menus = res.data.data;
    },
  },
};
</script>

<style lang="less" scoped>
.main-container {
  height: 100%;
  .el-header,
  .el-aside {
    background-color: #23262e;
  }
}
.el-header {
  padding: 0;
  display: flex;
  justify-content: space-between;
}
.el-main {
  overflow-y: scroll;
  height: 0;
  background-color: #f2f2f2;
}
.el-footer {
  background-color: #eee;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  object-fit: cover;
}
.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  user-select: none;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
  }
  span {
    color: white;
    font-size: 12px;
  }
}
</style>