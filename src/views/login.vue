<template>
    <div class="login">
        <el-form label-position="right" label-width="80px" size="small" :model="formLogin">
            <el-form-item label="用户名">
                <el-input v-model="formLogin.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formLogin.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style lang="scss">
    .login {
        background-image: url("../../static/image/ac86.jpg");
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .login {
            width: 365px;
            .el-form-item__label {
                color: #409EFF;
            }
        }
    }
</style>

<script>
    module.exports = {
        created() {

        },
        data() {
            return {
                formLogin: {
                    userName: '',
                    password: '',
                }
            }
        },
        methods: {
            login() {
                this.axios.post("/api/user/login",{
                    userName: this.formLogin.userName,
                    password: this.formLogin.password
                }).then(response => {
                    if (response.data === "") {
                        this.$message({
                            type: "error",
                            message: "您不是管理员，不能登陆"
                        })
                    } else {
                        this.$router.push("profile");
                    }
                })
            }
        }
    }
</script>
