<template>
  <div>
    <el-dialog title="编辑用户信息" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
      <div>
        <el-form>
          <el-form-item label="姓名">
            <el-input  v-model="userInfo.userName" maxlength="20" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="userInfo.userPassword" maxlength="11" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="userInfo.userAddress" maxlength="50" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="userInfo.userPhone" maxlength="11" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="userInfo.userEmail" maxlength="20" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="生日">
            <el-input v-model="userInfo.userBirth"></el-input>
          </el-form-item>
          <el-form-item label="时间">
            <el-input v-model="userInfo.cTime" disabled></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-input v-model="userInfo .userRole" disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import rxevent from "pubsub-js";
import EventsKey from "@/common/eventsKey.js";
import userService from "@/common/user-service.js";
export default {
  data() {
    return {
      dialogVisible: false,
      userInfo: {}
    };
  },
  created() {},
  mounted() {
    rxevent.subscribe(EventsKey.editorOpenDialog, (val, element) => {
      this.dialogVisible = element.key;
      this.userInfo = element.value;
    });
  },
  methods: {
    cancel() {
      this.dialogVisible = false;
    },
    handleClose() {
      this.dialogVisible = false;
    },
   async submit() {
     const user = await userService.updataUserInfo(this.userInfo.id,this.userInfo);
     rxevent.publish(EventsKey.refreshData, true);
     this.dialogVisible = false;
     this.$message.success('编辑用户成功');
    }
  },
  destroyed() {
    rxevent.unsubscribe(EventsKey.editorOpenDialog);
  }
};
</script>

<style scoped>

</style>

<style scoped>
/deep/ .el-input {
  width:80%;
}
</style>

