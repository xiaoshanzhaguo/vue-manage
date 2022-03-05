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
        <el-card style="height: 280px; width: 1000px">
          <!-- ref用于后面获取当前的dom节点 -->
          <!-- <div style="height: 280px" ref="echarts"></div> -->
          <!-- chartData数据从哪里来？我们需要在data数据中定义一下echarts的data数据，然后再去改写逻辑部分。 -->
          <echart :chartData="echartData.order" style="height: 280px" /> 
        </el-card>
        <div class="graph">
          <el-card>
            <!-- <div style="height: 260px" ref="userEcharts"></div> -->
            <echart :chartData="echartData.user" style="height: 260px" /> 
          </el-card>
          <el-card>
            <!-- <div style="height: 240px" ref="videoEcharts"></div> -->
            <!-- 给饼图加一个配置 :isAxisChart="false"，表示它不是折线图或柱状图 -->
            <echart :chartData="echartData.video" :isAxisChart="false" style="height: 240px" /> 
          </el-card>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from '../../api/data'
//  echarts5的引入方式
// import * as echarts from 'echarts' // 由于后面没有用到，就直接注释
import Echart from '../../src/components/Echarts.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "home",
  components: {
    Echart
  },
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
      echartData: {
        // 折线图
        order: {
          // x轴数据
          xData: [],
          series: []
        },
        // 柱状图
        user: {
          xData: [],
          series: []
        },
        // 饼图
        video: {
          series: []
        }
      }
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
        // 接口请求完成后，处理接口拿到的数据
        const order = data.orderData
        // 用于接收数据
        const xData = order.date
        // 处理数据，先取出key值，keyArray就是key值的集合
        const keyArray =  Object.keys(order.data[0])
        // 拿到key值后，组装series数据
        const series = []
        // 直接遍历key数组
        keyArray.forEach(key => {
          // 遍历时往series数组中添加数据
          series.push({
            name: key, // serires里的name就是图例，对应这里的key值
            /* data对应图例的数据，这里要取对应图例的数据，通过这里的代码遍历数据。
            拿到其中的每一项，将每一项所对应的key值的值进行返回 */
            data: order.data.map(item => item[key]),
            type: 'line' // 折线图
          })
        })
        // 组装echarts的option
        // const option = {
        //   xAxis: {
        //     data: xData
        //   },
        //   yAxis: {},
        //   legend: {
        //     data: keyArray
        //   },
        //   series
        // }

        // 首先对于折线图而言，这里拿到option数据后，直接将它进行赋值。
        this.echartData.order.xData = xData
        this.echartData.order.series = series

        // // 初始化echarts。下面传入当前的dom节点，在之前的div中给了ref="xxx"，这里拿到它的实例并用E来接收
        // const E = echarts.init(this.$refs.echarts)
        // // 绘图
        // E.setOption(option)

      // 用户图
      // 下面用一个变量来接收配置
      // const userOption = {
      //   legend: {
      //     // 图例文字颜色
      //     textStyle: {
      //       color: "#333",
      //     },
      //   },
      //   grid: {
      //     left: "20%"
      //   },
      //   // 提示框
      //   tooltip: {
      //     trigger: "axis",
      //   },
      //   xAxis: {
      //     type: "category", // 类目轴
      //     data: data.userData.map(item => item.date), // 拿到data里表示x轴的数据，用map去遍历，使用es6箭头函数，这里就能return item.date。
      //     axisLine: {
      //       lineStyle: {
      //         color: "#17b3a3",
      //       },
      //     },
      //     axisLabel: {
      //       interval: 0,
      //       color: "#333",
      //     },
      //   },
      //   yAxis: [
      //     {
      //       type: "value",
      //       axisLine: {
      //         lineStyle: {
      //           color: "#17b3a3",
      //         },
      //       },
      //     },
      //   ],
      //   color: ["#2ec7c9", "#b6a2de"],
      //   series: [
      //     // 有两个图例，就添加两个对象
      //     {
      //       name: '新增用户',
      //       data: data.userData.map(item => item.new), // 同样要遍历数据
      //       type: 'bar'
      //     },
      //     {
      //       name: '活跃用户',
      //       data: data.userData.map(item => item.active), // 同样要遍历数据
      //       type: 'bar'
      //     }
      //   ],
      // }

      // 对于柱状图而言，同理折线图
      this.echartData.user.xData = data.userData.map(item => item.date)
      this.echartData.user.series = [
          // 有两个图例，就添加两个对象
          {
            name: '新增用户',
            data: data.userData.map(item => item.new), // 同样要遍历数据
            type: 'bar'
          },
          {
            name: '活跃用户',
            data: data.userData.map(item => item.active), // 同样要遍历数据
            type: 'bar'
          }
        ]


      // // 配置完后，拿到echarts的实例，并进行画图
      // const U = echarts.init(this.$refs.userEcharts) // 用遍历来接收一下
      // // 调用.option将配置传入进来
      // U.setOption(userOption)

      // 饼图
      // const videoOption = {
      //   tooltip: {
      //     trigger: "item",
      //   },
      //   color: [
      //     "#0f78f4",
      //     "#dd536b",
      //     "#9462e5",
      //     "#a6a6a6",
      //     "#e1bb22",
      //     "#39c362",
      //     "#3ed1cf",
      //   ],
      //   series: [
      //     // 给series添加对应的数据。对于饼图而言，可以直接把data拿过来。
      //     {
      //       data: data.videoData,
      //       type: 'pie'
      //     }
      //   ],
      // }

      // 饼图
       this.echartData.video.series = [
          // 给series添加对应的数据。对于饼图而言，可以直接把data拿过来。
          {
            data: data.videoData,
            type: 'pie'
          }
        ]

      // // 一样的来获取实例
      // const V = echarts.init(this.$refs.videoEcharts)
      // V.setOption(videoOption)
      }
      console.log(res); // 调用res，否则会报错
    })
  }
}
</script>
