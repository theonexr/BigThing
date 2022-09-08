<template>
  <div>
    <el-card class="box-xard">
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button type="primary" @click="addCateShowDialogBtnFn">添加分类</el-button>
      </div>

      <!-- 分类数据表格 -->
      <el-table :data="cateList" style="width: 100%" border stripe>
        <el-table-column
          type="index"
          label="序号"
          width="100"
        ></el-table-column>
        <el-table-column prop="cate_name" label="分类名称"></el-table-column>
        <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" size="mini" @click="updateFn(scope.row)">修改</el-button>
            <el-button type="danger" size="mini" @click="delFn(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加文章分类对话框 -->
    <!-- visable:对话框组件是否显示 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      @close="dialogCloseFn"
    >
      <!-- 添加的表单 -->
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addRef"
        label-width="80px"
      >
        <el-form-item prop="cate_name" label="分类名称">
          <el-input
            v-model="addForm.cate_name"
            minlength="1"
            maxlength="10"
          ></el-input>
        </el-form-item>

        <el-form-item prop="cate_alias" label="分类别名">
          <el-input
            v-model="addForm.cate_alias"
            minlength="1"
            maxlength="15"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmFn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getArticleListApi, saveArtCateAPI,updataArtCateAPI,delArtCateAPI } from "@/api";
export default {
  name: "ArtCate",
  data() {
    return {
      cateList: [], //文章分类数组
      dialogVisible: false,
      editid: "", //要修改的文章id
      isEdit: false, //true为编辑状态 ， false为新增状态
      addForm: {
        cate_name: "",
        cate_alias: "",
      },
      addRules: {
        cate_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          {
            pattern: /^\S{1,10}$/,
            message: "分类名必须是1-10的非空字符",
            trigger: "blur",
          },
        ],
        cate_alias: [
          { required: true, message: "请输入分类别名", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9]{1,15}$/,
            message: "分类名必须是1-15的字母数字",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    // 获取文章分类
    this.getArticleListApiFn();
  },
  methods: {
    // 获取文章分类
    async getArticleListApiFn() {
      const res = await getArticleListApi();
      console.log(res);
      this.cateList = res.data.data;
    },
    // handleClose(done) {
    //   this.$confirm("确认关闭？")
    //     .then((_) => {
    //       done();
    //     })
    //     .catch((_) => {});
    // },
    // 显示添加分类弹框
    addCateShowDialogBtnFn() {
      this.isEdit =false //变为新增状态
      this.editid = ""
      this.dialogVisible = true;
    },
    // 对话框确定按钮->调用保存文章分类接口
    confirmFn() {
      this.$refs.addRef.validate(async (valid) => {
        if (valid) {
          // 通过校验
          if(this.isEdit){
            // 需要修改/编辑
          this.addForm.id = this.editid
          // 另外一种写法
          // const {data:res} =await updataArtCateAPI({id:this.editid,...this.addForm})
          const {data:res} =await updataArtCateAPI(this.addForm)
          if (res.code !== 0) return this.$message.error(res.message);
          this.$message.success(res.message);
          }else{
            // 需要新增
          const { data: res } = await saveArtCateAPI(this.addForm);
          if (res.code !== 0) return this.$message.error(res.message);
          this.$message.success(res.message);
          }
 
          // 再次调用，获取文章分类
          this.getArticleListApiFn();
          this.dialogVisible = false;
        } else {
          return false;
        }
      });
    },
    // 右上角的差
    dialogCloseFn() {
      // 关闭弹框时清空表单
      this.$refs.addRef.resetFields();
    },
    // 修改分类
    updateFn(obj) {
      this.isEdit = true
      this.editid = obj.id
      this.dialogVisible = true
      // 让真实iDOM更新后绑定好了,然后再数据回显
      this.$nextTick(()=>{
      this.addForm.cate_name = obj.cate_name
      this.addForm.cate_alias = obj.cate_alias
      })
    },
    // 删除分类
    async delFn(obj){
      const {data:res} = await delArtCateAPI(obj.id)
      if(res.code !==0 ) return this.$message.error(res.message)
      this.$message.success(res.message)
      // 重新获取列表
      this.getArticleListApiFn();
    }
  },
};
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>