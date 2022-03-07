<template>
  <div class="manage">
    <!-- 1. 在点击新增按钮时会有dialog弹框，要引入dialog
        点击不同的按钮，显示的title都不同，要通过一个属性来判断当前是新增或更新 -->
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <!-- 2. 之前写CommonForm组件时，我们定义了三个属性，要在data里定义。
    下面还要写ref，通过它拿到当前组件的实例。 -->
      <common-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      >
      </common-form>
      <!-- 3. 给dialog加一个自定义的底部 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <!-- 4. 写页面中table上部分区域的form组件，可以对CommonForm组件进行复用 -->
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <common-form
        :formLabel="formLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
      >
        <!-- 5. button按钮放在slot区域 -->
        <el-button type="primary" @click="getList">搜索</el-button>
      </common-form>
    </div>
  </div>
</template>

<script>
import CommonForm from "../../src/components/CommonForm.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "User",
  components: {
    CommonForm,
  },
  data() {
    return {
      operateType: "add",
      isShow: false, // 默认值给false
      operateFormLabel: [
        // 将配置的数据进行传入
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      operateForm: {
        /*  这个数据就是Form的数据，将它传入之后，在CommonForm组件中，当它修改表单元素时，
        就会通过双向绑定的原则，修改父组件传入进去的数据。 */
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "", //在当前的form里，它左边的label没有名称。
          type: "input",
        },
      ],
      searchForm: {
        keyword: "", //将这个数据传入之后，在CommonForm组件中修改数据时，就会将这个数据与传入的数据信息双向绑定
      },
    };
  },
  methods: {
    confirm() {},
    addUser() {
      // 6. 点击新增时，弹框
      this.isShow = true;
      this.operateType = "add";
      // 7. 初始化form数据
      this.operateForm = {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      };
    },
    getList() {},
  },
};
</script>
