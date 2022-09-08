import axios from "axios"
import store from "@/store";
import router from "@/router";
import { Message } from "element-ui";
export const baseURL = 'http://big-event-vue-api-t.itheima.net'

const myAxios = axios.create({
    baseURL: baseURL
})

// 定义请求拦截器
myAxios.interceptors.request.use(function (config) {
    // 请求前触发一次
    if (store.state.token) {
        config.headers.Authorization = store.state.token
    }

    return config
}, function (error) {
    // 请求发起前的代码，有异常报错，会直接进入这里
    // return||Promise对象值，会作为成功的结果，返回给下一个Promise对象（axios留在原地）
    return Promise.reject(error)
})

// 定义响应拦截器
myAxios.interceptors.response.use(function (response) {
    return response
}, function (error) {
    // 失败的拒绝状态
    if (error.response.status === 401) {
        // token过期了
        store.commit('updateToken','')
        store.commit('updateUserInfo',{})

        router.push('/login')
        Message.error('用户身份已过期！！！')
    }
    console.dir(error)

    return Promise.reject(error)
})

export default myAxios