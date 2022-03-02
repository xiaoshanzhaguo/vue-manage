<template>
  <el-container style="height: 100%;">
    <el-aside width="auto">
      <common-aside/>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <!-- 这里展示嵌套路由的组件！！！ -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from '../src/components/CommonAside.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Main",
  components: {CommonAside},
  data() {
    return {}
  }
};
</script>

<style lang="less" scoped>
.el-header {
    background-color: #333;
}

.el-main {
    padding-top: 0;
}
</style>

