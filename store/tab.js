// 在这里会定义我们刚才所需要控制是否展开的state属性
export default {
    state: {
        // 定义一个管理是否展开的变量，默认展开的状态
        isCollapse: false
    },
    // 定义一个改变state的方法
    mutations: {
        // mutations里接收两个参数，一个是state，一个是所需要传入的参数
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        }
    }
}