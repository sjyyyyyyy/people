<template>
  <div class="add-message">
    <el-form
      :model="messageData"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="姓名" prop="uname">
        <el-input v-model="messageData.uname"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="addressid">
        <el-select v-model="messageData.addressid" placeholder="请选择">
          <el-option
            v-for="item in addressData"
            :key="item.addressid"
            :label="item.addressname"
            :value="item.addressid"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="等级" prop="levelid">
        <el-select v-model="messageData.levelid" placeholder="请选择">
          <el-option
            v-for="item in levelData"
            :key="item.jrid"
            :label="item.levelname"
            :value="item.jrid"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话" prop="tel">
        <el-input v-model="messageData.tel"></el-input>
      </el-form-item>
      <el-form-item label="上传头像">
        <el-upload
          class="upload-demo"
          action="http://39.105.160.25:4000/getMessageA"
          name="sfile"
          :on-success="successUpload"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="上传二维码">
        <el-upload
          class="upload-demo"
          action="http://39.105.160.25:4000/getMessageB"
          name="sweixin"
          :on-success="successUpload"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button
         v-if="isUpdate"
          type="primary"
          :loading="loading"
          @click="updateForm('ruleForm')"
          >立即修改</el-button
        >
        <el-button
         v-else
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
import { getLocation } from "@/api/location";
import { getLevel } from "@/api/level";
import { addInfo,showInfo,updateInfo } from "@/api/message";
export default {
  data() {
    return {
      isUpdate:false,//判断显示修改还是添加按钮
      messageData: {
        uname: "", //姓名
        addressid: "", //地址
        levelid: "", //等级
        tel: "", //电话
        tcoin: "", //微信头像
        weixin: "", //二维码
      },
      loading: false,
      addressData: [], //地址列表
      levelData: [], //等级列表
      rules: {
        uname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        tel: [{ required: true, message: "请输入电话", trigger: "blur" }],
        addressid: [
          { required: true, message: "请选择地址", trigger: "change" },
        ],
        levelid: [{ required: true, message: "请选择等级", trigger: "change" }],
      },
    };
  },
  methods: {
    // 图片上传成功
    successUpload(response) {
      console.log(response);
      // 判断是上传头像还是二维码
      if (response.headerurl) {
        // 上传头像 将返回的headerurl复制给tcoin
        this.messageData.tcoin = response.headerurl;
      } else {
        // 上传二维码 将返回的weixinurl复制给weixin
        this.messageData.weixin = response.weixinurl;
      }
    },
    //获取地址列表
    getLocationList() {
      getLocation().then((res) => {
        console.log(res);
        this.addressData = res.data;
      });
    },
    // 获取等级列表
    getLevelList() {
      getLevel().then((res) => {
        console.log(res);
        this.levelData = res.data;
      });
    },
    //添加信息
    submitForm(formName) {
      this.loading = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //   console.log(123);
          //   console.log(this.messageData);
          addInfo({
            ...this.messageData,
          }).then((res) => {
            console.log(res);
            this.loading = false;
            this.$message({
              message: res.message,
              type: "success",
            });
            this.$router.push("/message/messagelist");
          });
        } else {
          this.loading = false;
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 修改信息
    updateForm(formName) {
      this.loading = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.messageData);
          let { uname,addressid,tel,levelid } = this.messageData
          // 信息修改
          updateInfo({
            id:this.$route.query.id,
            uname,
            addressid,
            tel,
            levelid
          }).then((res)=>{
            console.log(res);
            this.loading = false;
            this.$message({
                message: "信息修改成功！",
                type: "success",
            });
            this.$router.push('/message/messagelist')
          })
        } else {
          this.loading = false;
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 根据id获取信息
    showMessage(id){
      showInfo({
        id:id
      }).then((res)=>{
        console.log(res);
        let _data = res.data[0];
        // 信息回显
        this.messageData = {
          uname:_data.jrname,
          tel:_data.jrtel,
          addressid:_data.jraddressesid,
          levelid:_data.jrlevel
        }
      })
    }
  },
  created() {
    this.getLocationList();
    this.getLevelList();
    // 接收信息列表页面传递过来的id值
    console.log(this.$route.query.id);
    // 判断当前页面是要执行修改还是添加信息
    if(this.$route.query.id){
      // 执行修改信息
      this.isUpdate = true
      let _id = this.$route.query.id;
      this.showMessage(_id)
    }
  },
};
</script>

<style scoped>
.add-message {
  width: 60%;
  margin: 50px auto 0;
}
</style>
