<template>
    <div class="user-add">
        <div class="user-form">
            <el-form :model="userForm" label-position="right" label-width="90px">
                <el-form-item label="用户名：">
                    <el-input v-model="userForm.userName" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="性别：">
                    <el-input v-model="userForm.sex"></el-input>
                </el-form-item>
                <el-form-item label="生日：">
                    <el-date-picker
                            v-model="userForm.birthday"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="电话号码：">
                    <el-input v-model="userForm.tel"></el-input>
                </el-form-item>
                <el-form-item label="备注：">
                    <el-input v-model="userForm.comment"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="add">添加</el-button>
                    <el-button @click="goToLast">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style lang="scss">
    .user-add {
        .user-form {
            .el-form {
                .el-form-item {
                    .el-input {
                        width: 20%;
                    }
                }
            }
        }
    }
</style>

<script>
    export default {
        name: "userAdd",
        created() {
        },

        mounted() {
        },

        data() {
            return {
                userForm: {
                    userName: null,
                    sex: null,
                    birthday: null,
                    tel: null,
                    comment: null,
                }
            }
        },

        methods: {
            goToLast() {
                this.$router.back();
            },
            add() {
                this.axios.post("/api/user/add",this.userForm).then(res => {
                    console.log(res);
                    this.$router.back();
                }).catch(err => {
                    console.log(err);
                    this.$message({
                        type: "error",
                        message: "添加失败！"
                    })
                })
            }
        }
    }
</script>