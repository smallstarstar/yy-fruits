<template>
  <div>
    <el-col :span="24">
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-openeds="openeds"
      >
      
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>人员信息</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1" @click="userMessgage()">
              <i class="el-icon-s-custom"></i>
              用户信息
            </el-menu-item>
            <el-menu-item index="1-2" @click="fruitMessage()">
              <i class="el-icon-grape"></i>
              水果信息
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

       
          <el-menu-item index="2" @click="routerManager()">
            <i class="el-icon-menu"></i>
            <span slot="title">路由管理</span>
          </el-menu-item>
       
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>



<script>
export default {
  data() {
    return {
      openeds: ["1"]
    };
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    // 用户信息路由
    userMessgage() {
      this.$router.push({
        path: "/home/userMessgage"
      });
    },
    fruitMessage() {
      this.$router.push({
        path: "/home/fruitMessage"
      });
    },
    routerManager() {
      this.$router.push({
        path: "/home/routerInfo"
      });
    }
  }
};
</script>
