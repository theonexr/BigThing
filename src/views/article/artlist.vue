<template>
  <div>
    <!-- 内容区域 -->
    <el-card class="box-xard">
      <div slot="header" class="clearfix">
        <span>文章列表</span>
      </div>
      <!-- 搜索区域 -->
      <div class="search-box">
        <el-form :inline="true" :model="q">
          <el-form-item label="文章分类">
            <el-select
              v-model="q.cate_id"
              placeholder="请选择分类"
              size="small"
            >
              <el-option
                v-for="obj in cateList"
                :key="obj.id"
                :label="obj.cate_name"
                :value="obj.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态" style="margin-left: 15px">
            <el-select v-model="q.state" placeholder="请选择状态" size="small">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="草稿" value="草稿"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="choseFn">筛选</el-button>
            <el-button type="info" size="small" @click="resetFn">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          size="small"
          class="btn-pub"
          @click="showDialogVisidle"
          >发表文章</el-button
        >
      </div>
  
      <!-- 文章表格区域 -->
      <el-table :data="artList" style="width:100%" border stripe>
        <el-table-column label="文章标题" prop="title">
          <template v-slot="scope">
            <el-link type="primary" @click="showDetailFn(scope.row.id)">{{scope.row.title}}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="分类" prop="cate_name"></el-table-column>
        <el-table-column label="发表时间" prop="pub_date">
          <template v-slot="scope">
            <span>{{$formatDate(scope.row.pub_date)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column label="操作" >
          <template v-slot="{ row }">
            <el-button type="danger" size="mini" @click="remove(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
    <el-pagination
      @size-change="handleSizeChangeFn"
      @current-change="handleCurrentChangeFn"
      :current-page.sync="q.pagenum"
      :page-sizes="[2, 3, 5, 10]"
      :page-size.sync="q.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
      
    </el-card>
    <!-- 发表文章Dialog对话框 -->
    <el-dialog
      title="发表文章"
      :visible.sync="pubDialogVisible"
      fullscreen
      :before-close="handleClose"
      @close="dialogCloseFn"
    >
      <!-- 发布文章的对话框 -->
      <el-form
        :rules="pubFormRules"
        ref="pubFormRef"
        :model="pubForm"
        label-width="100px"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="pubForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="cate_id">
          <el-select
            v-model="pubForm.cate_id"
            placeholder="请选择分类"
            style="width: 100%"
          >
            <el-option
              v-for="obj in cateList"
              :key="obj.id"
              :label="obj.cate_name"
              :value="obj.id"
            ></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="文章内容" prop="content">
          <quill-editor v-model="pubForm.content" @blur="contentChangeFn"></quill-editor>
        </el-form-item>
        <el-form-item label="文章封面" prop="cover_img">
          <!-- 用来显示封面的图片 -->
          <img src="@/assets/logo.png" alt="" class="cover-img" ref="imgRef" />
          <br />
          <!-- 文件选择框,默认被隐藏 -->
          <input
            type="file"
            style="display: none"
            accept="image/*"
            ref="iptFileRef"
            @change="changeCoverFn"  
          />
          <!-- 选择封面的按钮 -->
          <el-button type="text" @click="selCoverFn">+ 选择封面</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="pubArticleFn('已发布')"
            >发布</el-button
          >
          <el-button type="info" @click="pubArticleFn('草稿')"
            >存为草稿</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 查看文章详情对话框 -->
    <el-dialog title="文章预览" :visible.sync="detailVisible" width="80%">
      <h1 class="title">{{ artDetail.title }}</h1>

      <div class="info">
        <span>作者：{{ artDetail.nickname || artDetail.username }}</span>
        <span>发布时间：{{ $formatDate(artDetail.pub_date) }}</span>
        <span>所属分类：{{ artDetail.cate_name }}</span>
        <span>状态:{{ artDetail.state }}</span>
      </div>

      <!-- 分割线 -->
      <el-divider></el-divider>

      <!-- 文章的封面 -->
      <img v-if="artDetail.cover_img" :src="baseURL + artDetail.cover_img" alt="">

      <!-- 文章的详情 -->
      <div v-html="artDetail.content" class="detail-box"></div>

    </el-dialog>
  </div>
</template>

<script>
import { baseURL } from "@/utils/request";
import { getArticleListApi,uploadArticleAPI,getArticleListapi,getArtDetailAPI,delArtDetailAPI } from "@/api";
import logo from "../../assets/logo.png";
export default {
  name: "ArtList",
  data() {
    return {
      baseURL:baseURL,
      q: {
        pagenum: 1,
        pagesize: 2,
        cate_id: "",
        state: "",
      },
      pubDialogVisible: false, //控制发布文章对话框的显示和隐藏(true,false)
      pubForm: {
        //发布文章-表单的数据对象
        title: "",
        cate_id: "",
        content: "",
        cover_img: null,
        state: "",
      },
      pubFormRules: {
        //发布文章-表单的验证规则对象
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "文章标题的长度为1-30个字符串",
            trigger: "change",
          },
        ],
        cate_id: [
          { required: true, message: "请选择文章标题", trigger: "change" },
        ],
        // content对应quill-editor富文本编辑器，它不是el提供表单标签
        // el-input等输入框的在blur事件时进行校验
        // 下拉菜单，单选框，复选框，是在change事件时进行校验
        // quill-editor2个事件都没有，所以你输入内容也不会自动走校验
        content: [
          {
            required: true,
            message: "请输入文章内容",
            trigger: "blur",
          },
        ],
        cover_img: [
          {
            required: true,
            message: "请选择图片",
            trigger: "blur",
          },
        ],
      },
      cateList: [], //保存文章分类数据
      artList:[], //文章列表数据
      total: 0, //总数据条数
      detailVisible:false, //用于查看文章详情的对话框
      artDetail:[], //储存文章详情
    };
  },
  created() {
    this.getArticleListFn();
    this.initArtListFn()
  },
  methods: {
    showDialogVisidle() {
      this.pubDialogVisible = true;
    },
    // 对话框关闭的回调
    async handleClose(done) {
      const confirmResult = await this.$confirm(
        "此操作将导致文章信息丢失,是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err); //捕获确认框Promise对象里选择取消时,拒绝状态结果"cancel"字符串
      // 取消关闭阻止,提前return不让下面done执行
      if (confirmResult === "cancel") return;
      // 确认关闭
      done();
    },
    // 获取所有分类
    async getArticleListFn() {
      const { data: res } = await getArticleListApi();
      this.cateList = res.data;
      console.log(res);
    },
    // 选择封面点击事件
    selCoverFn() {
      this.$refs.iptFileRef.click(); //JS来模拟一次点击事件动作
    },
    changeCoverFn(e) {
      // e.target 拿到触发事件的那个标签(input标签对象本身)
      // e.target.files 拿到选择的文件数组
      const files = e.target.files;
      if (files.length === 0) {
        // 未选择文件，cover_img置空
        this.pubForm.cover_img = null;
        this.$refs.imgRef.setAttribute("src", logo);
      } else {
        // 选择图片，保存到表单对象的属性中
        this.pubForm.cover_img = files[0];
        // 把图片文件，显示到img标签里
        const url = URL.createObjectURL(files[0]);
        // 选择的图片预览
        this.$refs.imgRef.setAttribute("src", url);
        this.$refs.pubFormRef.validateField('cover_img')
      }
    },
    pubArticleFn(str) {
      this.pubForm.state = str;
      // 兜底校验
      this.$refs.pubFormRef.validate(async (valid) => {
        if (valid) {
          //全通
          const fd = new FormData()

          fd.append('title',this.pubForm.title)
          fd.append('cate_id',this.pubForm.cate_id)
          fd.append('content',this.pubForm.content)
          fd.append('cover_img',this.pubForm.cover_img)
          fd.append('state',this.pubForm.state)
          const {data:res} = await uploadArticleAPI(fd)
          // console.log(res);
          if(res.code !== 0) return this.$message.error('发布文章失败！')
          this.$message.success('发布文章成功！')
          // 关闭对话框
          this.pubDialogVisible = false
        } else {
          return false; //阻止默认行为
        }
      });
      console.log(this.pubForm);
    },
    // 富文本编辑器改动校验
    contentChangeFn(){
      this.$refs.pubFormRef.validateField('content')
    },
    // 新增文章，对话框关闭，清空表单
    dialogCloseFn(){
      this.$refs.pubFormRef.resetFields()
      // 手动去掉图片
      this.$refs.imgRef.setAttribute("src", logo);
      // 刷新表格
      this.initArtListFn()
    },
    async initArtListFn(){
      const {data:res} = await getArticleListapi(this.q)
      
      if(res.code !== 0) return this.$message.error('获取文章列表失败')
      this.artList = res.data
      this.total = res.total
    },
    handleSizeChangeFn(sizes){
      // console.log(sizes);
      this.q.pagesize = sizes
      // console.log(this.q.pagesize);
      // 重新获取列表
      // 偶发性bug:有时自动回到第二页有数据，有时候没有
      // 2个网络请求一起发，谁先回来不一定
      // 解决，当切换每页显示条数，把页码设为1
      this.q.pagenum = 1
      this.initArtListFn()
    },
    handleCurrentChangeFn(nowPage){
      this.q.pagenum = nowPage
      this.initArtListFn()
    },
    // 筛选按钮
    choseFn(){
      this.q.pagenum = 1
      this.q.pagesize = 2
      // 重新获取列表
      this.initArtListFn()
    },
    // 重置按钮
    resetFn(){
      this.q.pagesize = 2
      this.q.pagenum = 1
      this.q.cate_id = ""
      this.q.state = ""
    // 重新获取列表
      this.initArtListFn()
    },
    // 查看详情
    async showDetailFn(artid){
      // 查看详情弹框浮现
      this.detailVisible = true
      const {data:res} = await getArtDetailAPI(artid)
      // console.log(res);
      this.artDetail = res.data
      console.log(this.artDetail);
    },
    // 删除文章
     async remove(artId){
      const {data:res} = await delArtDetailAPI(artId)
      if(res.code !== 0) return this.$message.error(res.message)
      this.$message.success('删除文章成功')
      // 数组只保存当前页的数据
      if(THIS.artList.length === 1){
        if(this.q.pagenum >1){
          this.q.pagenum--
        }
      }

      // 刷新表格
      this.initArtListFn()
    }
  },
};
</script>

<style lang="less" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .btn-pub {
    margin-top: 5px;
  }
}
.el-pagination{
  margin-top: 15px;
}
// 图片封面宽高
.cover-img {
  width: 400px;
  height: 200px;
  object-fit: cover;
}
.title{
  font-size: 24px;
  text-align: center;
  font-weight: normal;
  color: #000;
  margin: 0 0 10px 0;
}
::v-deep .ql-editor {
  min-height: 300px;
}
</style>