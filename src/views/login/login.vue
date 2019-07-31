<template>
  <div v-loading="loading">
    <div class="form">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="userName">
          <el-input type="text" v-model="ruleForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPassword">
          <el-input type="password" v-model="ruleForm.userPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="success" @click="openPassword()">找回密码</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="找回密码" :visible.sync="dialogVisible" width="30%">
      <el-input placeholder="请输入姓名" v-model="userName"></el-input>
      <div style="width:100%;height:10px;"></div>
      <el-input placeholder="请输入手机号码" v-model="userPhone"></el-input>
      <div class="userPassword">{{userPassword}}</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="submit()" :disabled="isDisabled">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import userService from "@/common/user-service.js";
export default {
  data() {
    var checkText = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.userPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        userName: "",
        userPassword: "",
        checkPass: ""
      },
      rules: {
        userPassword: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        userName: [{ validator: checkText, trigger: "blur" }]
      },
      loading: false,
      dialogVisible: false,
      userName: "",
      userPhone: "",
      userPassword: "",
      userInfo: {},
      isDisabled: true
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const result = await userService.userLogin(
            this.ruleForm.userName,
            this.ruleForm.userPassword
          );
          if (result.data) {
            this.loading = true;
            // 将用户信息存进store中
            this.$store.dispatch(
              "saveUserInfo",
              JSON.parse(JSON.stringify(result.data))
            );
            // 路由跳转
            setTimeout(() => {
              this.$router.push({
                path: "/home"
              });
              this.loading = false;
              this.$message.success("登陆成功");
            }, 3000);
          } else {
            this.$message.error("请输入正确的账号或密码");
            this.ruleForm = {};
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm = {};
    },
    openPassword() {
      this.dialogVisible = true;
    },
    cancel() {
      this.dialogVisible = false;
      this.userName = "";
      this.userPhone = "";
      this.userPassword = "";
      this.isDisabled = true;
    },
    async submit() {
      // this.dialogVisible = false;
      const result = await userService.getUserInfo(
        this.userName,
        this.userPhone
      );
      if (result.data.code) {
        this.$message.error("信息错误");
        this.userPassword = "";

      } else {
        this.$message.success("信息正确");
        this.userPassword = result.data.userPassword;
      }
    }
  },
  watch: {
    userName(val) {
      if (this.userName && this.userPhone) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
    userPhone(val) {
      if (this.userName && this.userPhone) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    }
  }
};
</script>

<style scoped>
.form {
  width: 30%;
  margin: 100px auto;
}
.userPassword {
  width: 100%;
  height: 30px;
  margin-top: 10px;
  border: 1px solid #ddd;
  line-height: 30px;
  color: #f2874b;
  text-indent: 15px;
}
</style>
