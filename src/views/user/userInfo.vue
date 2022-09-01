<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本资料</span>
      </div>
      <!-- 表单 -->
      <el-form
        :model="userForm"
        :rules="userFormRules"
        ref="userFormRef"
        label-width="100px"
      >
        <el-form-item label="登录名称" prop="username">
          <el-input v-model="userForm.username" disabled></el-input>
        </el-form-item>

        <el-form-item label="用户昵称" prop="nickname">
          <el-input
            v-model="userForm.nickname"
            maxlength="10"
            minlength="1"
          ></el-input>
        </el-form-item>

        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitFn">提交修改</el-button>
          <el-button @click="resetFn">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { updateUserInfoAPI } from "@/api";
export default {
    name:"userInfo",
    data(){
        return{
            userForm:{
                username:this.$store.state.userInfo.username,
                nickname:"",
                email:""
            },
            userFormRules:{
                nickname:[
                    {required:true,message:"请输入用户昵称",trigger:'blur'},
                    {pattern:/^\S{1,10}$/,message:'昵称必须是1-10的非空字符',trigger:'blur'}
                ],
                email:[
                    {required:true,message:"请输入用户邮箱",trigger:'blur'},
                    {type:'email',message:'邮箱格式不正确',trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        submitFn(){
            this.$refs.userFormRef.validate(async valid =>{
                if(valid){
                    console.log(this.userForm);
                    // 更新资料接口，需要带id，userinfo对象中没有
                    // 缺少id，给他加一个
                    this.userForm.id = this.$store.state.userInfo.id
                    const {data:res} = await updateUserInfoAPI(this.userForm)
                    if(res.code!==0) return this.$message.error('更新用户信息失败')
                    // 更新成功，刷新vuex中数据
                    this.$message.success('更新成功！')
                    // 重新让vuex获取最新数据
                    this.$store.dispatch('getUserInfoActions')
                    // console.log(res);
                }else{
                    // 未通过表单验证
                    return false
                }
            })
        },
        // 重置按钮
        resetFn(){
          // this.userForm.nickname = ''
          // this.userForm.email = ''

          // el-form提供了一个重置表单
          this.$refs.userFormRef.resetFields()
        }
    }

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
.el-form{
    width: 500px;
}
</style>