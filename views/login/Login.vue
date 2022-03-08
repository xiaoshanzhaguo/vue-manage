<template>
  <!-- model——表单数据对象；status-icon——表单校验时的图标；rules——表单校验的规则；
    通过ref获取form实例，方便调用form下面的属性和方法。label-width——名称宽度。 -->
  <el-form
    :model="form"
    status-icon
    :rules="rules"
    ref="form"
    label-width="100px"
    class="login-container"
  >
    <h3 class="login_title">系统登录</h3>
    <!-- 编写表单下的表单域中的内容 -->
    <el-form-item
      label="用户名"
      label-width="80px"
      prop="username"
      class="username"
    >
      <!-- placeholder——默认文案 -->
      <el-input
        type="input"
        v-model="form.username"
        autocomplete="off"
        placeholder="请输入账号"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" label-width="80px" prop="password">
      <el-input
        type="password"
        v-model="form.password"
        autocomplete="off"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item class="login_submit">
      <el-button type="primary" @click="login" class="login_submit"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      form: {},
      rules: {
        username: [
          // message——校验失败的提示信息，trigger——触发方式
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3, // 最小长度
            message: "用户名长度不能小于3位", // 校验文案
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {},
  },
};
</script>

<style lang="less" scoped>
.login-container {
  border-radius: 15px;
  background-clip: padding-box; // 给它一个背景裁剪的内边距
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0 auto 40px auto;
  text-align: center; // 字体的对齐 居中
  color: #505458;
}

.login_submit {
  margin: 10px auto 0px auto;
}
</style>