<template>
  <div>
    <el-container>
      <el-header>
          <header-component></header-component>
      </el-header>
      <el-container>
        <el-aside width="202px">
          <side-menu></side-menu>
        </el-aside>
         <el-main>
           <router-view></router-view>
         </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HeaderComponent from "@/components/headerComponent.vue";
import SideMenu from '@/components/sideMenu.vue';
export default {
  components: {
    HeaderComponent,
    SideMenu
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  line-height: 400px;
}

.el-main {
  background-color: #e9eef3;
  height: 500px;
}
</style>


