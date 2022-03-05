// 在这里会定义我们刚才所需要控制是否展开的state属性
export default {
    state: {
        // 定义一个管理是否展开的变量，默认展开的状态
        isCollapse: false,
        tabsList: [
            // 默认值(初始数据)为首页
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        // 显示高亮时，需要用一个属性来记录当前选中哪个路由
        currentMenu: null
    },
    // 定义一个改变state的方法
    mutations: {
        // mutations里接收两个参数，一个是state，一个是所需要传入的参数
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        // 定义一个mutations，用于改变state中的tabList数据，也就是说在每次点击左侧菜单时就需要改变tabList。
        selectMenu(state, val) {
            // 当当前的菜单不是首页，那么就需要给currentMenu进行赋值
            if (val.name !== 'home') {
                state.currentMenu = val
                /* 另外还需要拿到当前选中项的索引，判断它在state中存在否——通过findIndex的方法判断 
                item下的name与传入数据中菜单的name是否相等，如果相等就意味着存在。 */
                const result = state.tabsList.findIndex(item => item.name === val.name)
                if (result === -1) {
                    // result不等于-1，则将数据添加进去。
                    state.tabsList.push(val)
                }
            } else {
                // 如果当前选中的菜单是首页，需要将currentMenu当前选中的标识重置。
                state.currentMenu = null
            }
        }
    }
}