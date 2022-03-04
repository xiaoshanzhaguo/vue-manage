import Mock from 'mockjs'
// 通过模块的方式将回调函数引入
import homeApi from './mockServeData/home'

/* 写对应的拦截器的规则。拦截使用Mock.mock(xxx)。之前说过拦截的时候可以写确切的url地址，
也可以写匹配的正则的规则，这里直接写url地址（因为我们知道接口的具体请求路径）；同时接收一个回调函数，这里面是返回的具体数据 */
Mock.mock('/home/getData', homeApi.getStatisticalData)