<template>
  <div class="add-location">
    <el-form
      :model="addressList"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="地址名称" prop="address">
        <el-input v-model="addressList.address"></el-input>
      </el-form-item>
      <el-form-item label="地址经度" prop="longitude">
        <el-input v-model="addressList.longitude"></el-input>
      </el-form-item>
      <el-form-item label="地址纬度" prop="latitude">
        <el-input v-model="addressList.latitude"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :loading="loading"
          @click="submitForm('ruleForm')"
          >立即添加</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addLocation } from "@/api/location";
export default {
  data() {
    return {
      addressList: {
        address: "", //地址名称
        longitude: "", //经度
        latitude: "", //纬度
      },
      loading: false,
      rules: {
        address: [
          { required: true, message: "请输入地址名称", trigger: "blur" },
        ],
        longitude: [{ required: true, message: "请输入经度", trigger: "blur" }],
        latitude: [{ required: true, message: "请输入纬度", trigger: "blur" }],
      },
    };
  },
  methods: {
    //添加地址
    submitForm(formName) {
      this.loading = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addLocation({
            address: this.addressList.address,
            longitude: this.addressList.longitude,
            latitude: this.addressList.latitude,
          })
            .then((res) => {
              this.loading = false;
              console.log(res);
              this.$message({
                message: res.message,
                type: "success",
              });
              this.$router.push("/location/locationlist");
            })
            .catch((err) => {
              this.loading = false;
              console.log(err);
            });
        } else {
          this.loading = false;
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.add-location {
  width: 60%;
  margin: 50px auto 0;
}
</style>
