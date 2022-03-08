<template>
  <div class="common-table">
    <!-- data属性用于接收table的数据(从外部传入进来的，因此要写props)；高度；stripe 显示斑马的条纹 -->
    <el-table :data="tableData" height="90%" stripe>
      <!-- 需要写具体列的组件。show-overflow-tooltip表示如果当前列超长了就会用tooltip来显示那部分文案。
      对于列来说，也是通过配置将数据传递到组件中，拿到数据后就可以直接渲染出对应的列(同样要在props中定义)。 -->
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
      >
        <!-- 对于table，除了传入进来的配置，还应该能够让它自定义接收传入进来的当前列相关的配置。
      slot-scope用于接收传入进来的插槽里的相关数据。 -->
        <template slot-scope="scope">
          <!-- 拿到当前列的数据，并将它渲染出来 -->
          <span style="margin-left: 10px">{{ scope.row[item.prop] }} </span>
        </template>
      </el-table-column>
      <!-- 当前的操作列 -->
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件。total——总的数据数量，从外界的组件传入(props)，current-page：当前页数。
    current-change——切换分页数有一个回调函数。page-size——当前分页数的默认值。 -->
    <el-pagination
      class="pager"
      layout="prev, pager, next"
      :total="config.total"
      :current-page.sync="localConfig.page"
      @current-change="changePage"
      :page-size="20"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "CommonTable",
  props: {
    tableData: Array, // table数据
    tableLabel: Array, // table列的数据
    config: Object,
  },
  watch: {
    config: {
      handler(val) {
        this.localConfig = val
      },
      immediate: true,
      deep: true,
    }
  },
  data() {
    return {
      localConfig: this.config,
    };
  },
  methods: {
    handleEdit(row) {
      // 通过emit事件，向上抛出，通知父组件此时我们已经触发了对应的事件，并且将对应事件的数据传递到父组件中
      this.$emit("edit", row);
      // console.log(row);
    },
    handleDelete(row) {
      this.$emit("del", row);
    },
    changePage(page) {
      this.$emit("changePage", page);
    },
  },
};
</script>

<style lang="less" scoped>
// 最后对样式进行调整
.common-table {
  height: calc(100% - 62px); // 两边留62px
  background-color: #fff;
  position: relative;
  .pager {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>