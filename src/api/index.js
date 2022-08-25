import request from '@/utils/request'

export const registerAPI = () => {
   return request({
        url:'/api/reg',
        method:'POST',
        data:{
            username:'lidongxu12',
            password:'111111',
            repassword:'111111'
        }
    })
}