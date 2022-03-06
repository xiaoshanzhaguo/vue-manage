<template>
    <div class="tabs">
        <!-- tag对应当前面包屑的显示/层级，当前面包屑的数据定义在vuex的store中的state.tabsList。
        现在我们想渲染tag，就需要拿到当前的tagsList。怎么拿？需要将vuex中的数据注入到当前页面上来。 -->
        <!-- closeable，除了首页之外，都有删除按钮。effect，如果是当前则为dark(高亮)，不是则为plain。
        判断当前是否高亮——通过当前的路由与tag的名称是否一致。
        别忘了还有点击事件和删除事件。 -->
        <el-tag
            v-for="(tag, index) in tags"
            :key="index"
            :closable="tag.name !== 'home'" 
            :effect="$route.name === tag.name ? 'dark' : 'plain'" 
            @click="changeMenu(tag)"
            @close="handleClose(tag, index)"
            size="small"
        >
            {{ tag.label }}
        </el-tag>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex' // 通过mapState的辅助函数完成功能
export default {
    name: 'CommonTag',
    data() {
        return {

        }
    },
    // 通过计算属性，使用mapState，将vuex中的state注入到当前页面中来
    computed: {
        // mapState调用之后会返回一个对象，这里就可以将它解构出来
        ...mapState({
            // 这里需要通过函数的形式将tagsList注入到当前页面上
            tags: state => state.tab.tabsList
            // 这样写完之后，就可以在当前页面的this下面拿到tags属性，它对应的就是vuex中的tagsList。
            // 返回上面的el-tab，通过遍历的方式渲染tag。
        })
    },
    methods: {
        // 同样调用它会生成一个对象，将它进行解构
        ...mapMutations({
            close: 'closeTag' // 起别名，在当前页面调用this.close，就是调用vuex中的closeTag，这么一个mutation
        }),
        changeMenu(item) {
            // 在点击时，只做了当前路由的切换。在代码里使用函数式编程。下面通过之前配置的name进行跳转。
            this.$router.push({ name: item.name})
        },
        handleClose(tag, index) {
            /* 接下来完成删除相关的逻辑。tag当前的焦点在最右侧时，点击删除后，首先当前tag会进行删除，同时面包屑也会进行删除，
            这里删除的应该是vuex中state.tabsList，并且tag中的当前焦点会往左移一格（如果是删除中间的tag，焦点会右移）。**逻辑分为两部分** */

            // 先拿到tag的总长度
            const length = this.tags.length - 1

            // 3.删除数据
            this.close(tag)

            // 1. 如果要点击的tag与当前路由不一致，就不需要改变当前聚焦的焦点
            if (tag.name !== this.$route.name) {  
                return;
            }
            // 2. 判断是否为最后一个tag
            if (index === length) {
                // 焦点左移，完成向左跳转的功能
                this.$router.push({
                    name: this.tags[index - 1].name
                })
            } else {
                // 是中间，向右跳转
                this.$router.push({
                    name: this.tags[index].name
                })
            }
            // 3. 还要将当前数据源中的数据删除掉，只能调用mutation来修改。
            /* 之前是用this.$store.commit来调用mutation，这里用另外一个辅助函数mapMutations，
            通过它将store中的mutation注入到当前页面中。这里看回上面的methods。 */
        }
    }
}
</script>

<style lang="less" scoped>
.tabs {
    padding: 20px;
    .el-tag {
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>
