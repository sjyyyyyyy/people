<!--
  地址列表
  author：lhy
  date: 2022-2-11
 -->
<template>
  <div class="location-list">
    <el-table :data="locationData" v-loading="loading" style="width: 100%">
      <el-table-column prop="addressid" label="地址id"> </el-table-column>
      <el-table-column prop="addressname" label="地址名称"> </el-table-column>
      <el-table-column prop="longitude" label="经度"> </el-table-column>
      <el-table-column prop="latitude" label="纬度"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.row)"
            type="text"
            size="small"
          >
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getLocation, delAddress } from "@/api/location";
export default {
  data() {
    return {
      locationData: [],
      loading: false,
    };
  },
  methods: {
    //获取地址列表
    getLocationList() {
      this.loading = true;
      getLocation()
        .then((res) => {
          console.log(res);
          this.locationData = res.data;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    deleteRow(row) {
      this.$confirm("此操作将永久删除该等级, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //确定删除
          delAddress({
            addressid: row.addressid,
          })
            .then((res) => {
              console.log(res);
              this.$message({
                type: "success",
                message: res.message,
              });
              this.getLocationList();
            })
            .catch((err) => {
              console.log(err);
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
    this.getLocationList();
  },
};
</script>

<style scoped>
.location-list {
  width: 60%;
  margin: 50px auto 0;
}
</style>
