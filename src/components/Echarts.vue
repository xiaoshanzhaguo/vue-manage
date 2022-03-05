<template>
  <div ref="echart"></div>
</template>

<script>
// 引入echarts
import * as echarts from "echarts";

// 在script中编写组件所接收的相应的属性，和它的内部逻辑
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Echarts",
  props: {
    // 定义一个属性用于区分图
    isAxisChart: {
      type: Boolean,
      default: true, // 定义初始值/默认值
    },
    // 它还接收我们传递进来的option参数
    chartData: {
      type: Object,
      default() {
        // 定义默认值的原因，是为了防止在我们调用组件，我们不传当前这个属性的时候，我们组件的容错性
        return {
          xData: [],
          series: [], // 然后去引入echart
        };
      },
    },
  },
  // 在初始化之前，要对数据进行监听
  watch: {
    // 这里需要对传入的chartData进行监听(原因是在数据改变的时候，表格应重新绘制)
    chartData: {
      handler: function () {
        this.initChart()
      },
    // 在首次对数据进行监听时，也需要触发，加一个属性
    deep: true
    }
  },
  // 对echarts进行初始化的逻辑
  methods: {
    initChart() {
      // 在初始化之前，要对数据进行监听

      // 首先要调用echart初始化，然后将数据处理好
      this.initChartData()

      // 调用上面的方法完成后，我们可以拿到配置数据，接下来渲染echarts
      // 首先判断当前的echarts有没有渲染(在data里面还需要定义数据)
      if (this.echart) {
        // 如果echart存在，就直接进行渲染
        this.echart.setOption(this.options)
      } else {
        // 如果echart不存在，首先初始化echart对象（拿到echarts并调用init方法，将dom节点扔进来）
        this.echart = echarts.init(this.$refs.echart)
        // 拿到echart实例后，进行绘图
        this.echart.setOption(this.options)
      }
    },
    // 初始化中处理数据
    initChartData() {
      if (this.isAxisChart) {
        // 折线图或柱状图
        // 设置x轴的坐标，xAxis的data数据是从组件外传入进来的chartData中获取到的
        this.axisOption.xAxis.data = this.chartData.xData
        // 对series数据进行设置
        this.axisOption.series = this.chartData.series
      } else {
        // 饼状图
        this.normalOption.series = this.chartData.series
      }
    }
  },
  data() {
    return {
      // 折线图或柱状图配置
      axisOption: {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
        series: [],
      },
      // 饼图配置
      normalOption: {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [],
      },
      echart: null
    };
  },
  // 接下来对传入进来的option的数据进行判断(通过计算属性来声明一个属性)
  computed: {
    options() {
      // 这里通过判断isAxisChart，如果存在就是折线图或柱状图，那么就需要取到折线图或柱状图对应的数据（在data中先进行定义）
      return this.isAxisChart ? this.axisOption : this.normalOption;
      // 在完成之后，需要对echarts进行初始化的逻辑，methods下面定义一个方法
    },
  },
};
</script>
