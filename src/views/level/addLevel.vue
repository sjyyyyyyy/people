<!--
  添加等级
  author：lhy
  date: 2022-2-10
 -->
<template>
  <div class="add-level">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="等级名称" prop="levelname">
        <el-input v-model="ruleForm.levelname"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即添加</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addLevel } from "@/api/level";
export default {
  data() {
    return {
      ruleForm: {
        levelname: "",
      },
      rules: {
        levelname: [
          { required: true, message: "请输入等级名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //添加等级
    submitForm(formName) {
      // console.log(this.$refs.box);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //   alert("submit!");
          //执行添加等级操作
          // addLevel({
          //   ...this.ruleForm
          // })
          addLevel({
            levelname:this.ruleForm.levelname
          })
            .then((res) => {
              console.log(res);
              // 添加成功之后 提示信息
              this.$message({
                message: "等级添加成功！",
                type: "success",
              });
              this.$refs[formName].resetFields();
              this.$router.push('/level/levellist')
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
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
.add-level {
  width: 500px;
  margin: 100px auto 0;
}
</style>
