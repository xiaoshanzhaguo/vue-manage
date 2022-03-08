<template>
  <!-- 2. 拿到传入组件的数据后，接下来对数据进行渲染
通过ref拿到当前form的实例；model中将传入的form数据给它，与element-ui的form进行双向绑定；
inline表示form的布局是单行或上下排列。 -->
  <el-form ref="form" label-width="100px" :model="form" :inline="inline">
    <!-- 在form里写表单域，对传入的数据进行循环。label是表单域的名称 -->
    <el-form-item
      v-for="item in formLabel"
      :key="item.label"
      :label="item.label"
    >
      <!-- 遍历时根据配置渲染出对应的表单元素(先对form组件进行引入) -->
      <!-- 在下面写一个判断 判断之前讲过的type -->
      <el-input
        v-if="item.type === 'input'"
        :placeholder="'请输入' + item.label"
        v-model="localForm[item.model]"
      ></el-input>
      <el-switch
        v-if="item.type === 'switch'"
        v-model="localForm[item.model]"
      ></el-switch>
      <el-date-picker
        v-if="item.type === 'date'"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="请选择日期"
        v-model="localForm[item.model]"
      ></el-date-picker>
      <el-select
        v-if="item.type === 'select'"
        placeholder="请选择"
        v-model="localForm[item.model]"
      >
        <!-- 还需要渲染出它对应的下拉。这个下拉值会在传入的数据中定义一个opt属性，
			通过对这个属性的遍历来渲染出select下拉的内容。label表示下拉的名称，value是下拉选择之后具体的枚举值。
			在选择完之后，我们就会将下拉选中的value值赋值给数据源中的当前的select的属性上。 -->
        <el-option
          v-for="item in item.opts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <!-- 3. 还需要对组件进行扩展，如果当前的组件都不满足，那接下来在item中给它一个插槽，就可以自定义传入内容。 -->
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
// 1. 在el-form中定义表单域中的相对组件
export default {
  name: "CommonForm",
  watch: {
    form: {
      handler(val) {
        this.localForm =val
      },
      immediate: true,
      deep: true,
    },
  },
  /* 定义props用于接收属性，接收form相关的配置和form的数据（form的数据应该由父组件传递进来，
    并且我们接收到数据(与CommonForm组件)进行双向绑定），并且还接收表单的布局inline */
  props: {
    formLabel: Array,
    form: Object,
    inline: Boolean,
  },
  data() {
    return {
      localForm: this.form,
    };
  },
};
</script>
