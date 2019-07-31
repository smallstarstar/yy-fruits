<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="配置管理" name="first">
        <router-add></router-add>
      </el-tab-pane>
      <el-tab-pane label="操作管理" name="second">
        <router-operate></router-operate>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import RouterAdd from "./router-add.vue";
import RouterOperate from "./router-operate.vue";
export default {
  components: {
    RouterAdd,
    RouterOperate
  },
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {}
  }
};
</script>

<style scoped>
</style>
