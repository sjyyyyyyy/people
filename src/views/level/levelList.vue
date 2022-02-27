<!--
  等级列表
  author：lhy
  date: 2022-2-10
 -->
<template>
  <div class="level-list">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="jrid" label="等级id"> </el-table-column>
      <el-table-column prop="levelname" label="等级名称"> </el-table-column>
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
import { getLevel, delLevel } from "@/api/level";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    //获取等级列表
    getLevelList() {
      getLevel().then((res) => {
        // console.log(res);
        this.tableData = res.data;
      });
    },
    //删除等级
    deleteRow(row) {
      console.log(row.jrid);
      this.$confirm("此操作将永久删除该等级, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //确定删除
          delLevel({
            levelid: row.jrid,
          })
            .then((res) => {
              console.log(res);
              this.$message({
                type: "success",
                message: res.message,
              });
              this.getLevelList();
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
    this.getLevelList();
  },
};
</script>

<style scoped>
.level-list {
  width: 60%;
  margin: 50px auto 0;
}
</style>
