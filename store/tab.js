import Cookie from "js-cookie"
// import router from "../router"
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
		currentMenu: null,
		// menu定义初始的空数组
		menu: []
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
		},
		// 3. 还要将当前数据源中的数据删除掉，只能调用mutation来修改。
		closeTag(state, val) {
			// 找到当前的数据源，将它从数据源中删除
			// 先找到当前点击的数据
			const result = state.tabsList.findIndex(item => item.name === val.name)
			state.tabsList.splice(result, 1) // 调用splice方法进行删除
		},
		// 添加menu相关的方法
		setMenu(state, val) {
			state.menu = val
			// 将menu数据缓存到cookie中，避免我们在浏览器刷新的时候丢失menu数据。我们这里使用了第三方插件，故要在上面引入进来。
			Cookie.set('menu', JSON.stringify(val)) // 第一个是cookie名称，第二个是我们要存入的数据，这里将数据进行序列化。
		},
		clearMenu(state) {
			state.menu = [] // 清空
			Cookie.remove('menu')
		},
		addMenu(state, router) {
			// 在这里做路由的动态添加
			if (!Cookie.get('menu')) {
				return
			}
			// 如果当前有menu的数据，接下来对menu进行相关的处理。将Cookie中的menu数据转成对象
			const menu = JSON.parse(Cookie.get('menu')) // 将序列化的menu对象的数据拿到
			state.menu = menu // 更新数据
			// 动态添加路由的处理。添加之前对数据进行相关的处理。
			const menuArray = []
			// 拿到menu数据，进行遍历。这里的menu就是permission下的menu数组。数组分为一级菜单和包含children的二级菜单。
			menu.forEach(item => {
				// 这里需要区分一级菜单和二级菜单
				if (item.children) {
					// 有children就继续往下遍历
					item.children = item.children.map(item => {
						item.component = () => import(`../views/${item.url}`) // 类似于路由里按需引入的component。注意这里用es6的模板字符串的语法进行拼接
						return item
					})
					// 更新完之后，需要给memuArray中children数组进行解构，下面使用es6的扩展运算符，将二维数组扁平化
					menuArray.push(...item.children)
				} else {
					item.component = () => import(`../views/${item.url}`)
					menuArray.push(item) // 那么menuArray拿到的就是数组对象，里面存入的就是路由相关的文件的数据(类似router/index.js)
				}
			});
			// 路由的动态添加。在下面遍历的时候，每一个对象就是拿到当前的路由的数据
			menuArray.forEach(item => {
				/* 在路由文件中，当前所有页面的上层有一个layout叫做Main，相当于页面都是包裹在layout组件下面。
				所以需要给layout组件添加它所对应的children。这里直接遍历数组，Main是layout名称，然后需要给它下面添加每一个页面item。 */
				router.addRoute('Main', item) 
				// 保存完之后，回到Login.vue中。
			})
		}
	}
}