// 引入下载的第三方库
import Cookie from "js-cookie"

export default {
    state: {
        token: ''
    },
    // 添加几个mutation用于改变token
    mutations: {
        setToken(state, val) {
            state.token = val
            Cookie.set('token', val) // 第一个是cookie的名称，第二个是传入的值。然后再Cookie中生成了一条数据。
        },
        clearToken(state) {
            state.token = ''
            Cookie.remove('token') // 通过传入token的名称进行一个清空
        },
        getToken(state) {
            // 如果当前的缓存中有token，那就直接获取；如果没有就从state中获取，下面进行容错处理
            state.token = state.token || Cookie.get('token')
        }
    }
}