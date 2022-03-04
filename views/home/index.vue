<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <div class="left">
        <el-card shadow="hover">
          <div class="user">
            <img :src="userImg" />
            <div class="userinfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <hr />
          <div class="login-info">
            <p>上次登录时间：<span>2021-7-19</span></p>
            <p>上次登录地点：<span>武汉</span></p>
          </div>
        </el-card>
        <el-card style="margin-top: 20px; height: 450px">
          <el-table :data="tableData">
            <!-- prop: 对应列内容的字段名 -->
            <el-table-column
              v-for="(val, key) in tableLabel"
              :key="key"
              :prop="key"
              :label="val"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </el-col>
    <el-col :span="16">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <div class="totalGraph">
        <el-card style="height: 280px; width: 1000px"></el-card>
        <div class="graph">
          <el-card style="height: 260px"></el-card>
          <el-card style="height: 260px"></el-card>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from '../../api/data'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "home",
  data() {
    return {
      userImg: require("../../src/assets/images/user.jpg"),
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted() {
    getData().then(res => {
      // 拿到res.data数据，我们将data数据下面的code和data进行解构
      const { code, data } = res.data
      /* 判断当code为20000时，也就是正常接口返回的时候，我们就可以拿到data的数据。
      注意我们这里可以从mock里面之际将这里的tableData数据取出来，赋值给当前的tableData。
      并将上面的tableData数据可以给一个空数组。 */
      if (code === 20000) {
        this.tableData = data.tableData
      }
      console.log(res); // 调用res，否则会报错
    })
  }
}
</script>
