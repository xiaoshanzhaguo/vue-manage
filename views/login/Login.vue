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
// import Mock from 'mockjs'
import { getMenu } from '../../api/data';
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
    login() {
      // 调用api，需要将账号和密码传入(储存在form中)。调用接口的时候会得到一个回调函数。res就是接口的返回。
      getMenu(this.form).then(({ data: res }) => {
        console.log(res, 'res');
        // 判断res里的code，如果接口是正常的，状态码为20000
        if (res.code === 20000) {
          /* 如果成功，需要将接口返回的token拿到，然后给它设置进去。同时需要给不同的账号配置上不同的菜单权限。
          最后进行路由跳转。*/

          // 接下来可以在这里面写具体的store的mutation的调用。
          // 在登录成功之后，第一步先清除当前路由
          this.$store.commit('clearMenu')
          // 设置menu
          this.$store.commit('setMenu', res.data.menu) // 将数据传进去
          // 设置token
          this.$store.commit('setToken', res.data.token)  // 下面的代码就可以注释掉了
          // 动态添加路由
          this.$store.commit('addMenu', this.$router) // 传入当前的router实例
          // 最后一步，进行页面的跳转
          this.$router.push({ name: 'home' })
          // 接下来将CommonAside组件里的写死的menu进行替换
        } else {
          // 否则对异常进行抛出
          this.$message.warning(res.data.message)
        }
      })
      // // 在登录时将token设置进去。由于我们这里没有后端，所以token就自己模拟一下，用前端的mock来生成(先引入mock)
      // const token = Mock.random.guid() // 通过调用这个函数就可以生成一个随机数
      // // 假如我们调用上面的点击登录后，登录成功要拿到token，接下来要进行设置。
      // this.$store.commit('setToken', token)
      // // 接下来进行页面跳转
      // this.$router.push( { name: 'home' })
    },
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