<template>
  <div>
    <div class="topHeaderMessage">
      <!-- 时间器 -->
      <div class="yearTime">{{localTime.yearTime}}</div>
      <div class="dayTime">{{localTime.dayTime}}</div>
      <!-- 用户头像 -->
      <div class="userInfo">
        <span class="username" @click="openInfo()">{{firstName.toUpperCase()}}</span>
        <div class="useMessage">
          <div>{{userName.toUpperCase()}}</div>
          <div class="userRole">{{userRole}}</div>
        </div>
      </div>
      <div class="fixMessage" v-if="userInfoMessageShow">
        <div class="fixmessageInfo">可修改</div>
        <div class="usermessage">
          <label for="name">姓名</label>
          <el-input class="input" v-model="username"></el-input>
          <br>
          <label for="name">密码</label>
          <el-input class="input" v-model="userPassword"></el-input>
        </div>
        <div class="buttonGroup">
          <el-button @click="cancel()">取消</el-button>
          <el-button type="primary" @click="submitInfo()">确定</el-button>
        </div>
      </div>
      <!-- 消息通知 -->
      <!-- 退出登陆 -->
      <div class="back">
        <i class="el-icon-switch-button" @click="backSystem()"></i>
      </div>
    </div>
  </div>
</template>


<script>
import getTimes from "@/common/getTime.js";
import { setInterval } from "timers";
import userService from "@/common/user-service.js";
export default {
  data() {
    return {
      localTime: {},
      firstName: "",
      userName: "",
      userRole: "",
      username: "",
      userPassword: "",
      userInfoMessageShow: false
    };
  },
  created() {
    this.localTime = getTimes.getLocalTime();
    this.getLocalTime();
    const userInfo = this.$store.getters.userInfo;
    this.username = userInfo.userName;
    this.userPassword = userInfo.userPassword;
    this.userRole = userInfo.userRole;
    this.userName = userInfo.userName;
    const username = userInfo.userName;
    this.firstName = username[0];
  },
  methods: {
    getLocalTime() {
      setInterval(() => {
        this.localTime = getTimes.getLocalTime();
      }, 1000);
    },
    /**
     * 退出系统
     */
    backSystem() {
      this.$confirm("确定退出系统", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          // 清空store以及清楚缓存。
          this.$router.push({
            path: "/"
          });
        })
        .catch(() => {
          return;
        });
    },
    openInfo() {
      const userInfo = this.$store.getters.userInfo;
      this.username = userInfo.userName;
      this.userPassword = userInfo.userPassword;
      this.userInfoMessageShow = !this.userInfoMessageShow;
    },
    cancel() {
      this.userInfoMessageShow = false;
    },
    async submitInfo() {
      const userInfo = this.$store.getters.userInfo;
      const userId = userInfo.id;
      const result = await userService.fixUserInfo(
        userId,
        this.username,
        this.userPassword
      );
      console.log(result);
      // 保存到store中
      this.$store.dispatch(
        "saveUserInfo",
        JSON.parse(JSON.stringify(result.data))
      );
      if (result) {
        const userInfo = this.$store.getters.userInfo;
        this.username = userInfo.userName;
        this.userPassword = userInfo.userPassword;
        this.userRole = userInfo.userRole;
        this.userName = userInfo.userName;
        const username = userInfo.userName;
        this.firstName = username[0];
        this.userInfoMessageShow = false;
        this.$message.success('修改信息成功');
      } else {
        this.$message.error('修改信息失败')
      }
    }
  }
};
</script>


<style scoped>
.topHeaderMessage {
  width: 35%;
  height: 60px;
  position: absolute;
  right: 0;
}
.yearTime {
  margin-top: -16px;
  font-size: 25px;
  color: #f2784b;
}
.dayTime {
  margin-top: -30px;
  margin-left: 30px;
  font-size: 20px;
  color: black;
}
.userInfo {
  width: 160px;
  height: 60px;
  position: absolute;
  top: 0px;
  left: 160px;
}
.username {
  margin-top: 3px;
  width: 50px;
  height: 50px;
  margin-left: 10px;
  display: block;
  border-radius: 50%;
  border: 1px solid #f2784b;
  text-align: center;
  line-height: 50px;
  font-size: 26px;
  cursor: pointer;
  color: #303133;
}
.useMessage {
  position: relative;
  top: -65px;
  left: 70px;
  color: #606266;
}
.userRole {
  margin-top: -35px;
  color: #606266;
}
.back {
  position: absolute;
  right: 20px;
  top: 8px;
}
.el-icon-switch-button {
  font-size: 35px;
  cursor: pointer;
  color: black;
}
.fixMessage {
  width: 200px;
  height: 220px;
  position: relative;
  left: 35%;
  top: -20px;
  z-index: 99;
  display: block;
  background-color: #e6a23c;
}
.fixMessage .input {
  width: 70%;
}
.buttonGroup {
  float: right;
  margin-right: 10px;
}
.usermessage {
  margin-top: -20px;
  margin-left: 5px;
}
.fixmessageInfo {
  margin-left: 5px;
}
</style>
