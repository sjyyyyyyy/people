<template>
  <div class="message-content">
    <div class="message-search">
      <el-select v-model="addressValue" placeholder="请选择">
        <el-option
          v-for="item in addressList"
          :key="item.addressid"
          :label="item.addressname"
          :value="item.addressid"
        >
        </el-option>
      </el-select>
      <el-button class="btn" type="primary" @click="searchMessage"
        >筛选</el-button
      >
      <el-button class="btn" type="primary" @click="resetList">重置</el-button>
    </div>
    <div class="message-list">
      <el-table :data="messageData" v-loading="loading" style="width: 100%">
        <el-table-column prop="jrname" label="姓名"> </el-table-column>
        <el-table-column prop="levelname" label="等级名称"> </el-table-column>
        <el-table-column prop="addressname" label="地址名称"> </el-table-column>
        <el-table-column prop="jrtel" label="电话"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="updateRow(scope.row)"
              type="text"
              size="small"
            >
              修改
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.row)"
              type="text"
              size="small"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getMessage, searchInfo, delInfo } from "@/api/message";
import { getLocation } from "@/api/location";
export default {
  data() {
    return {
      messageData: [],
      loading: false,
      addressList: [],
      addressValue: "",
    };
  },
  methods: {
    //获取信息列表
    getMessageList() {
      this.loading = true;
      getMessage().then((res) => {
        console.log(res);
        this.loading = false;
        this.messageData = res.data;
      });
    },
    // 获取地址列表
    getLocationList() {
      getLocation().then((res) => {
        console.log(res);
        this.addressList = res.data;
      });
    },
    // 根据地址筛选信息
    searchMessage() {
      this.loading = true;
      // console.log(this.addressValue);
      let _addressName = "";
      // 循环当前地址列表
      this.addressList.forEach((val) => {
        // 判断每一项地址的id和选中的地址id是否相等
        if (val.addressid == this.addressValue) {
          // 将选中的地址id对应的地址名称赋值给_addressName
          _addressName = val.addressname;
        }
      });
      // 根据地址id筛选信息列表
      searchInfo({
        searchid: this.addressValue,
      }).then((res) => {
        console.log(res);
        // this.messageData = res.data
        if (res.message == "搜索成功") {
          let _data = res.data;
          // 遍历返回的数据列表 让每一项的数据里都添加一个addressname 对应的是_addressName
          this.messageData = _data.map((val) => {
            val.addressname = _addressName;
            // val.levelname = "无"
            return val;
          });
          this.loading = false;
        } else {
          this.$message("暂无数据！");
          this.messageData = [];
          this.loading = false;
        }
      });
    },
    // 重置信息列表
    resetList() {
      this.addressValue = "";
      this.getMessageList();
    },
    //修改信息
    updateRow(row) {
      console.log(row);
      // 跳转到修改信息页面 并将当前id传过去
      this.$router.push({
        path: "/message/addmessage",
        query: {
          id: row.jrid,
        },
      });
    },
    // 删除信息
    deleteRow(row) {
      console.log(row);
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 执行删除信息的操作
          delInfo({
            id: row.jrid,
          }).then((res) => {
            console.log(res);
            this.$message({
              type: "success",
              message: "删除成功！",
            });
            this.getMessageList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.getMessageList();
    this.getLocationList();
  },
};
</script>

<style scoped>
.message-content {
  width: 80%;
  margin: 30px auto 0;
}
.message-list {
  width: 80%;
  margin: 50px auto 0;
}
.btn {
  margin-left: 20px;
}
</style>
