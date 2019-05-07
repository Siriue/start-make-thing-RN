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
                <el-table-column label="拥有车辆">
                    <template slot-scope="scope">
                        <div v-for="(car) in scope.row.carList">
                           <span>{{car.model}}</span>
                            <span><el-button type="danger" size="mini" @click="deleteCar(scope.row,car)">删除</el-button></span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="comment" label="备注"></el-table-column>
                <el-table-column label="操作" min-width="230">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleModify(scope.row)">修改</el-button>
                        <el-button type="danger" size="mini" @click="deleteUser(scope.row)">删除</el-button>
                        <el-button type="primary" size="mini" @click="handleClickAddCar(scope.row)">添加车辆</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog :visible="addCarDialog" width="50%" title="添加车辆" @close="closeDialog">
            <el-radio v-model="selectedRadio" :label="car.id" v-for="(car) in showCarList">{{car.model}}</el-radio>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addCar">添加</el-button>
                <el-button type="primary" @click="closeDialog">关闭</el-button>
            </div>
        </el-dialog>
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
            table {
                .el-button__danger {
                    padding : 5px 5px;
                }
            }
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
                addCarDialog: false,
                currentUserId: null,
                carList: [],
                showCarList: [],
                selectedRadio: null,
            }
        },

        methods: {
            formatResponse(res) {
                res.forEach(it => {
                    let userCarIdList = [];
                    it.carList.forEach(car => {
                        userCarIdList.push(car.id);
                    });
                    it.userCarIdList = userCarIdList;
                });
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
                    });
                    console.log(res);
                    this.getUserList();
                }).catch(e => {
                    console.log(e);
                    this.$message({
                        type : "error",
                        message: "删除失败"
                    })
                })
            },

            handleModify(row) {
                this.$store.commit("dataTransfer", row);
                this.$router.push("userAdd");
            },

            handleClickAddCar(row) {
                this.axios.post("/api/user/queryAllCar").then(res => {
                    console.log(res);
                    this.carList = res.data;
                    this.showCarList = this.carList.filter(it => {
                        return row.userCarIdList.indexOf(it.id) === -1;
                    })
                    console.log(this.showCarList);
                });
                this.currentUserId = row.userId;
                this.addCarDialog = true;
            },

            closeDialog() {
                this.currentUserId = null;
                this.carList = [];
                this.showCarList = [];
                this.selectedRadio = null;
                this.addCarDialog = false;
            },

            addCar() {
                let payload = {
                    userId: this.currentUserId,
                    carId: this.selectedRadio,
                };
                this.axios.post("/api/user/addCarByUserId", payload).then(res => {
                    console.log(res);
                    this.$message({
                        type : "success",
                        message: "添加成功",
                    });
                    this.getUserList();
                    this.closeDialog();
                });
            },

            deleteCar(row, car) {
                let payload = {
                    userId: row.userId,
                    carId: car.id,
                }
                this.axios.post("/api/user/deleteRelation", payload).then(res => {
                    console.log(res);
                    this.$message({
                        type : "success",
                        message: "删除成功",
                    });
                    this.getUserList();
                });
            }
        }
    }
</script>