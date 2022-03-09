<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <h3>{{ isCollapse ? "后台" : "通用后台管理系统" }}</h3>
    <el-menu-item
      @click="clickMenu(item)"
      v-for="item in noChildren"
      :index="item.path + ''"
      :key="item.path + ''"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :index="item.path + ''" :key="item.path + ''">
      <template slot="title">    
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group
        v-for="(subItem, subIndex) in item.children"
        :key="subItem.path"
      >
        <el-menu-item @click="clickMenu(subItem)" :key="subIndex">{{
          subItem.label
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>

<script>
export default {
  data() {
    return {
      menu: [
        // 需要拿到store中的menu数据
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 在调用时，我们首先会拿到对象下面的信息
    clickMenu(item) {
      /* 拿到后需要进行跳转，这里由于我们事先在router的index.js里面使用use进行了全局引入，
      所以这里可以直接使用函数式编程。使用push方法实现页面的跳转，可以用name控制跳转。 */
      this.$router.push({
        name: item.name, // 只写了这个不能跳转，因为路由里没定义。
      });
      this.$store.commit("selectMenu", item);
    },
  },
  computed: {
    noChildren() {
      // 在定义的时候，需要对数据源进行一个过滤。
      return this.asyncMenu.filter((item) => !item.children);
      // 这里判断它当前有没有子项目，如果它没有子项目，我们直接拿到item下面的children，然后进行返回
    },
    hasChildren() {
      return this.asyncMenu.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
    asyncMenu() {
      // 直接获取当前的menu
      return this.$store.state.tab.menu
      // 上面与menu相关的逻辑都可以替换成asyncMenu。并且将router/index.js里的路由删除一部分，只需要保存layout
    }
  },
};
</script>