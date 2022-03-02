<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top: 20px"> 
            <el-card shadow="hover">
                <div class="user">
                    <img :src="userImg" />
                    <div class="userinfo">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <hr>
                <div class="login-info">
                    <p>上次登录时间：<span>2021-7-19</span></p>
                    <p>上次登录地点：<span>武汉</span></p>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'home',
    data() {
        return {
            userImg: require('../../src/assets/images/user.jpg')
        }
    }
}
</script>
