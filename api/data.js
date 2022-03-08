// 首先引入axios，注意引入的是实例类、工具类。
import axios from "./axios";

// 接下来写接口的调用，这个调用给它起一个名称，并对它进行一个对外的暴露。在调用接口时会传入一个参数。
export const getMenu = (param) => {
    // 在调用的时候就可以直接拿到axios的request方法，可以传入相关的配置（之前二次封装写了）
    // url：接口相关地址、接口类型、data作为传入的参数。
    return axios.request({
        url: '/permission/getMenu',
        method: 'post',
        data: param
    })
}

export const getData = () => {
    return axios.request({
        url: '/home/getData', // 这个url就是拦截器mock中的url
        method: 'get' // 默认是一个get请求
    })
}

export const getUser = (params) => {
    return axios.request({
        url: '/user/getUser', // 拦截器部分应该和接口调用一样，不要写错！！！
        method: 'get',  // 请求类型
        params  // 将参数传递过去
    })
}