<template>
  <div>
    <el-form
      :model="routerForm"
      :rules="rules"
      ref="routerForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="路由名称" prop="routerName">
        <el-input v-model="routerForm.routerName"></el-input>
      </el-form-item>

      <el-form-item label="路由路径" prop="routerPath">
        <el-input v-model="routerForm.routerPath"></el-input>
      </el-form-item>

      <el-form-item label="路由图标" prop="routerIcon">
        <el-input v-model="routerForm.routerIcon"></el-input>
      </el-form-item>&nbsp;
      <el-button @click="addSubRouter()" type="primary">添加子路由</el-button>
      <el-form-item
        class="submeun"
        v-for="(item,index) in routerForm.routerSubModelList"
        v-if="routerForm.routerSubModelList"
        :key="index"
      >
        <div class="subRouter">
          <el-input v-model="item.name" placeholder="请输入子路由名称" class="input"></el-input>
          <el-input v-model="item.path" placeholder="请示如子路由路径" class="input"></el-input>
          <el-input v-model="item.icon" placeholder="请输入子路由图标" class="input"></el-input>
          &nbsp; &nbsp;
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteData(index)"></el-button>
        </div>
      </el-form-item>
      <el-form-item class="created">
        <el-button type="info" @click="submitForm('routerForm')">立即创建</el-button>
        <el-button @click="resetForm('routerForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import userService from "@/common/user-service.js";
import EventsKey from '@/common/eventsKey.js';
import rxevents from 'pubsub-js';
export default {
  data() {
    return {
      routerForm: {
        routerName: "",
        routerPath: "",
        routerIcon: "",
        routerSubModelList: []
      },
      rules: {
        routerName: [{ required: true, message: "请输入路由名称", trigger: "blur" }],
        routerPath: [{ required: true, message: "请输入路由路径", trigger: "blur" }],
        routerIcon: [{ required: true, message: "请输入路由图标", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
         const data = await userService.saveRouterInfo((this.routerForm));
         if(data) {
           this.$message.success('添加信息成功')
           this.resetForm(formName);
           rxevents.publish(EventsKey.routerRefresh, true);
         } else {
           this.$message.error('添加信息失败')
         }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.routerForm.routerSubModelList = [];
    },
    addSubRouter() {
      let object = {};
      object.use = true;
      this.routerForm.routerSubModelList.push(object);
    },
    deleteData(e) {
      this.routerForm.routerSubModelList.splice(e,1);
    }
  }
};
</script>

<style scoped>
</style>

<style scoped>
/deep/ .el-input {
  width: 100%;
}
/deep/ .el-form-item {
  float: left;
}
.submeun {
  width: 100%;
  display: block;
}
.submeun .subRouter {
  width: 100%;
  margin-left: -9%;
}
.input {
  width: 30%;
  float: left;
  margin-left: 13px;
}
.created {
    float: right;
    margin-right:8%;
}
</style>