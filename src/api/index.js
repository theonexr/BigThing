import request from '@/utils/request'
// 注册
export const registerAPI = ({ username, password, repassword }) => {
    return request({
        url: '/api/reg',
        method: 'POST',
        data: {
            username,
            password,
            repassword
        }
    })
}
// 登录
export const loginAPI = ({ username, password }) => {
    return request({
        url: '/api/login',
        method: 'POST',
        data: {
            username,
            password
        }
    })
}
// 用户信息
export const getUserInfoAPI = () => {
    return request({
        url: '/my/userinfo',

    })
}
// 侧边栏数据
export const getMenusInfoAPI = () => {
    return request({
        url: '/my/menus',

    })
}
// 修改基本资料
export const updateUserInfoAPI = ({ id, username, nickname, email, user_pic }) => {
    return request({
        url: '/my/userinfo',
        method: 'PUT',
        data: {
            id,
            username,
            nickname,
            email,
            user_pic
        }
    })
}

// 用户头像
export const updataUserAvatarAPI = (avatar) => {
    return request({
        url: '/my/update/avatar',
        method: 'PATCH',
        data: {
            avatar //头像base64字符串
        }
    })
}
// 更新用户密码
export const updatePwdAPI = ({old_pwd, new_pwd, re_pwd}) => {
    return request({
        url: '/my/updatepwd',
        method: 'PATCH',
        data: {
            old_pwd,
            new_pwd,
            re_pwd
        }
    })
}
// 文章分类
export const getArticleListApi = () =>{
    return request({
        url:'/my/cate/list'
    })
}
// 保存文章分类
export const saveArtCateAPI = ({cate_name,cate_alias}) =>{
    return request({
        url:'/my/cate/add',
        method:'POST',
        data:{
            cate_name,
            cate_alias
        }
    })
}
// 更新/修改文章分类
export const updataArtCateAPI = ({id,cate_name,cate_alias}) =>{
    return request({
        url:'my/cate/info',
        method:'PUT',
        data:{
            id,
            cate_name,
            cate_alias
        }
    })
}
// 删除文章分类
export const delArtCateAPI = (id) =>{
    return request({
        url:'my/cate/del',
        method:'delete',
        params:{
            id
        }
    })
}
// 上传文章
export const uploadArticleAPI = (fd) =>{
    return request({
        url:'/my/article/add',
        method:'POST',
        data:fd
        // {}如果是一个普通对象，axios会把他转成JSON字符串在请求体里交给后台
        // 这个文档里要求请求体里是一个FormData类型（表单数据对象）携带文件给后台
    })
}
// 获取上传文章
export const getArticleListapi = ({pagenum,pagesize,cate_id,state}) =>{
    return request({
        url:'/my/article/List',
        params:{
            pagenum,
            pagesize,
            cate_id,
            state
        }
    })
}
// 获取文章详情
export const getArtDetailAPI = (id) =>{
    return request({
        url:'/my/article/info',
        params:{
            id
        }
    })
}
// 删除文章
export const delArtDetailAPI = (id) =>{
    return request({
        url:'/my/article/info',
        method:'DELETE',
        params:{
            id
        }
    })
}