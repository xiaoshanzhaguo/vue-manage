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
        <el-button type="primary" @click="getList(searchForm.keyword)"
          >搜索</el-button
        >
      </common-form>
    </div>

    <!-- 引入table，需要传入相关的数据(要在data中定义)。table组件还接收对应的事件(3个)。然后去写当前table的数据。
    对应tableData，它是在页面加载时通过调用getList方法来获取的。同样在Mock中通过mock数据。先去写对应的拦截，然后在data.js里写调用。
    在调用接口之前，对接口进行引入。 -->
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    ></common-table>
  </div>
</template>

<script>
import CommonForm from "../../src/components/CommonForm.vue";
import CommonTable from "../../src/components/CommonTable.vue";
import { getUser } from "../../api/data";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "User",
  components: {
    CommonForm,
    CommonTable,
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
      tableData: [],
      // table中对应列的数据
      tableLabel: [
        {
          prop: "name", // 所需要读取的数据中的字段名称
          label: "姓名", // 列的名称
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "addr",
          label: "地址",
          width: 320,
        },
      ],
      config: {
        page: 1,
        total: 30,
        loading: false,
      },
    };
  },
  methods: {
    confirm() {
      // 首先要判断有两种情况
      // 先判断弹窗的状态是新增还是编辑
      if (this.operateType === "edit") {
        /* 调用axios的post方法，调用相关接口（这里的数据是通过mock来模拟，老师之前在Mock中引入了数据。），
        第二个参数——form数据。 */
        this.$http.post("/user/edit", this.operateForm).then((res) => {
          console.log(res);
          // 调用.then，拿到接口返回的数据，接下来将弹窗关闭，并将table表格数据更新
          this.isShow = false;
          this.$message({
            type: "success",
            message: "编辑成功",
          });
          this.getList();
        });
      } else {
        // 新增逻辑
        this.$http.post("/user/add", this.operateForm).then((res) => {
          console.log(res);
          this.isShow = false;
          /* 然后去api/data.js中定义接口。我们现在可以不需要定义，因为这里直接调用$http.post接口欧。
          那就可以直接在mock.js里面进行拦截。通过对接口的拦截实现对数据的模拟。 
          然后就可以打开页面查看了。老师测试后发现报404的错误，因为请求没有被拦截到。因为mock.js里的地址多写了一个api]
          修改后可以看到接口已经被拦截，并且这里打印了接口的数据，数据里返回的就是createUser的响应地址。 */

          this.$message({
            type: "success",
            message: "新增成功",
          });
          this.getList();
        });
      }
    },
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
    editUser(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = row; // 赋值当前的数据，实现回显当前的数据。operateForm的数据还会传到CommonForm的组件中
      console.log(this.operateForm);
      this.getList();
    },
    delUser(row) {
      this.$confirm("此操作将永久删除该文件，是否继续？", "提示", {
        // 第三个参数是相关配置。文案进行自定义。
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning", // 当前弹窗类型
      }).then(() => {
        // 点击确认时会触发一个回调
        const id = row.id;
        this.$http
          .get("/user/del", {
            params: { id }, // 当前数据的id
          })
          .then(() => {
            // 接口请求完成之后，拿到接口返回的数据，给它一个message的提示
            this.$message({
              type: "success",
              message: "删除成功", // 文案
            });
            // 将列表数据进行刷新
            this.getList();
            // 然后定义/user/del的API，一样去mock.js中定义拦截器
          });
      });
    },
    // 调用方法，传入name并给一个默认值
    getList(name = "") {
      this.config.loading = true; // 获取数据前需要给一个loading
      name ? (this.config.page = 1) : ""; // 判断传入的name存在否？如果它存在则进行搜索，将当前页数置为1(因为搜索一般从第一页开始)
      getUser({
        page: this.config.page,
        name,
      }).then(({ data: res }) => {
        // console.log(res, 'res');
        // 直接进通过then拿到接口的一个回调，传入我们的回调函数。res就是接口的响应值。
        this.tableData = res.list.map((item) => {
          // list是table的列表数据，我们对它进行一个处理。
          item.sexLabel = item.sex === 0 ? "女" : "男"; // 这里对字段做一个映射
          return item;
        });
        // 处理分页数据
        this.config.total = res.count;
        this.config.loading = false;
        /* 然后对getList进行一个调用，应该在页面加载时就调用，应该写在生命周期里。
        同时在编辑和新增数据后，还需要调用，重新获取列表的数据，将列表进行重置。 */
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
