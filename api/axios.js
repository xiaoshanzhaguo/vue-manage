import axios from 'axios'
import config from '../config'

// 首先对当前的环境变量进行判断，判断当前的运行环境。这里会拿到请求的接口地址。
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    // 用于配置axios相关的配置
    getInsideConfig() {
        // 我们在生成axios实例时，会传入相关的配置，那么这里定义配置的初始值
        const config = {
            // 这是面向对象写法的应用
            baseUrl: this.baseUrl,
            header: {}
        }
        return config
    }

    // 拦截器相关的函数
    interceptors(instance) {
        // 在这个函数中，我们会拿到这个instance——也就是axios的一个实例（从官网复制拦截器部分的代码，并将里面的axios替换成instance）
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            console.log(response, 'response');
            // 2xx 范围内的状态码都会触发该函数。
            // 对响应数据做点什么
            return response;
        }, function (error) {
            console.log(error, 'error');
            // 超出 2xx 范围的状态码都会触发该函数。
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }

    /* 接下来写request函数，这个函数实际上就是后续在进行接口请求时，我们就会调用这里的request函数，*
    这个函数会接收一个传入的相关配置，比如说参数options */
    request(options) {
        // 拿到options后，首先用create进行axios实例的创建。
        const instance = axios.create()
        // 还要写options，这里面就是我们传入的相关参数，同时还要拿到当前所配置的相关信息
        // 首先对相关的配置进行调用(this.getInsideConfig())，拿到它的当前对象，这里需要对它进行解构，同时对传入的参数进行解构(使用es6的扩展运算符)
        options = { ...this.getInsideConfig(), ...options }
        // 解构完成之后，我们就需要去调用拦截器，会将创建的axios实例传入进去
        this.interceptors(instance)
        // 调用完成之后，返回接口请求的结果。这里拿到axios实例，传入我们的这些数据
        return instance(options)
    }
}

export default new HttpRequest(baseUrl)  // 这里少写了一个new，导致路由都加载不出来了。