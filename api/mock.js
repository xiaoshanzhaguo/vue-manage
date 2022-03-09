import Mock from 'mockjs'
// 通过模块的方式将回调函数引入
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import permisssion from './mockServeData/permission'

/* 写对应的拦截器的规则。拦截使用Mock.mock(xxx)。之前说过拦截的时候可以写确切的url地址，
也可以写匹配的正则的规则，这里直接写url地址（因为我们知道接口的具体请求路径）；同时接收一个回调函数，这里面是返回的具体数据 */
Mock.mock('/home/getData', homeApi.getStatisticalData)
// 第三个参数回调函数调用user.js里的createUser方法(还要进行引入)
Mock.mock(/user\/add/, 'post', userApi.createUser)
Mock.mock(/user\/edit/, 'post', userApi.updateUser)
Mock.mock(/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/user\/del/, 'get', userApi.deleteUser)

Mock.mock(/permission\/getMenu/, 'post', permisssion.getMenu)