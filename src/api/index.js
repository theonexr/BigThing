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