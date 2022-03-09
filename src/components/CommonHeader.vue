<template>
  <header>
    <div class="l-content">
      <el-button
        @click="handleMenu"
        plain
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <!-- 面包屑 -->
      <!-- <h3 style="color: #fff">首页</h3> -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" szie="mini">
        <span>
          <!-- 注意这里要将头像动态引入进来 -->
          <img class="user" :src="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <!-- 组件添加click事件，要加上native -->
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CommonHeader",
  data() {
    return {
      // 引入的形式——require
      userImg: require("../assets/images/user.jpg"),
    };
  },
  methods: {
    handleMenu() {
      //  只能通过mutation的方式去改变store中的state
      this.$store.commit("collapseMenu");
    },
    logOut() {
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      this.$router.push("/login") 
    }
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}

.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }

  .el-breadcrumb__item:last-child /deep/ .el-breadcrumb__inner {
    color: #dfdad4;
  }

  .el-breadcrumb__item /deep/ .el-breadcrumb__inner {
    color: #4a4c4c;
  }
}

.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
