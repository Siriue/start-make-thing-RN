<template>
    <div id="profile">
        <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <el-menu-item index="1">用户管理</el-menu-item>
<!--            <el-submenu index="2">-->
<!--                <template slot="title">我的工作台</template>-->
<!--                <el-menu-item index="2-1">选项1</el-menu-item>-->
<!--                <el-menu-item index="2-2">选项2</el-menu-item>-->
<!--                <el-menu-item index="2-3">选项3</el-menu-item>-->
<!--                <el-submenu index="2-4">-->
<!--                    <template slot="title">选项4</template>-->
<!--                    <el-menu-item index="2-4-1">选项1</el-menu-item>-->
<!--                    <el-menu-item index="2-4-2">选项2</el-menu-item>-->
<!--                    <el-menu-item index="2-4-3">选项3</el-menu-item>-->
<!--                </el-submenu>-->
<!--            </el-submenu>-->
            <el-menu-item index="2">车辆管理</el-menu-item>
            <el-menu-item index="3">备件管理</el-menu-item>
            <el-menu-item index="4">员工管理</el-menu-item>
            <el-menu-item index="5">订单管理</el-menu-item>
            <el-menu-item index="6"><img src="../../static/image/admin.svg" /></el-menu-item>
        </el-menu>
        <div style="width: 80%; margin: auto;">
            <router-view></router-view>
        </div>
    </div>
</template>

<style lang="scss">
    body {
        margin: 0px;
        #app {
            ul {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                img {
                    height: 20px;
                    width:  20px;
                }
            }
        }
    }
</style>

<script>
    module.exports = {
        created() {
            this.$router.push("user");
        },
        data() {
            return {
                activeIndex: '1',
            };
        },
        methods: {
            handleSelect(key) {
                switch (key) {
                    case "1" :
                        this.$router.push("user");
                        break;
                }
            },
        }
    }
</script>
