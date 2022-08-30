import request from '@/utils/request'
// 注册
export const registerAPI = ({username,password,repassword}) => {
   return request({
        url:'/api/reg',
        method:'POST',
        data:{
            username,
            password,
            repassword
        }
    })
}
// 登录
export const loginAPI = ({username,password}) =>{
    return request({
        url:'/api/login',
        method:'POST',
        data:{
            username,
            password
        }
    })
}
// 用户信息
export const getUserInfoAPI = () => {
    return request({
        url:'/my/userinfo',

    })
}
// 侧边栏数据
export const getMenusInfoAPI = () => {
    return request({
        url:'/my/menus',

    })
}