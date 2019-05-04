<template>
    <div class="user">
        <div class="header">
            <el-button type="primary" size="mini" @click="goToUserAdd">添加</el-button>
            搜索：<el-input placement="搜索用户" size="mini"></el-input>
        </div>
        <div class="user-table">
            <el-table   :data="userList"
                        stripe
                        style="width: 100%"
                        :border="true">
                <el-table-column prop="userId" label="ID"></el-table-column>
                <el-table-column prop="userName" label="用户名"></el-table-column>
                <el-table-column prop="sex" label="性别"></el-table-column>
                <el-table-column prop="birthday" label="生日">
                    <template slot-scope="scope">
                        {{$dayjs(scope.row.birthday).format("YYYY-MM-DD")}}
                    </template>
                </el-table-column>
                <el-table-column prop="tel" label="电话号码"></el-table-column>
                <el-table-column prop="carInfo" label="拥有车辆"></el-table-column>
                <el-table-column prop="comment" label="备注"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini">修改</el-button>
                        <el-button type="danger" size="mini" @click="deleteUser(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<style lang="scss">
    .user {
        .header {
            margin-top: 20px;
            margin-bottom: 20px;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            .el-button {
                margin-right: 10px;
            }
            .el-input {
                width: 220px;
            }
        }
        width: 100%;
        .user-table {
            width: 100%;
        }
    }
</style>

<script>
    export default {
        created() {
            this.getUserList();
        },
        mounted() {

        },

        data() {
            return {
                userList: [],
            }
        },

        methods: {
            formatResponse(res) {
                res.forEach(it => {
                    let carInfo = "";
                    it.carList.forEach(car => {
                        carInfo = car.model + " ";
                    })
                    it.carInfo = carInfo;
                })
                this.userList = res;
            },

            getUserList() {
                this.axios.get("/api/user").then((response) => {
                    if (response.data && response.data !== "") {
                        this.formatResponse(response.data);
                    }
                })
            },

            goToUserAdd() {
                this.$router.push("userAdd");
            },

            deleteUser(user) {
                this.axios.post("/api/user/delete",{userId: user.userId}).then(res => {
                    this.$message({
                        type : "success",
                        message: "删除成功"
                    })
                    console.log(res);
                    this.getUserList();
                }).catch(e => {
                    console.log(e);
                    this.$message({
                        type : "error",
                        message: "删除失败"
                    })
                })
            }
        }
    }
</script>