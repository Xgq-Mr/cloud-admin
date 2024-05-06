<template>
    <!-- 常规方式封装Svg组件 -->
    <!-- <el-icon :size="size" :color="color">
        <component :is="icon"/>
    </el-icon> -->
    <!-- h 函数封装Svg组件 -->
    <render />
</template>
<script setup lang="ts">
import { h, resolveComponent } from 'vue';

// 通过ts约束父组件传递进来的数据 需要通过泛型来约束
// withDefaults函数 就是对props的默认值进行设置 默认值在第二个参数中设置
const props = withDefaults(defineProps<{
    icon: string
    color?: string
    size?: string
}>(), {
    icon: "",
    size: "18"
})

const render = () => {
    if (props.icon) {
        return h(resolveComponent("el-icon"), {
            size: props.size,
            color: props.color
        }, [h(resolveComponent(props.icon))])
    }else{
        return h("i")
    }
}

</script>
<style lang='scss' scoped></style>