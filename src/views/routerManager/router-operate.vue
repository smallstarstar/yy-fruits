<template>
  <div>
    <el-table :data="tableData" border style="width: 100%" v-loading="loading">
      <el-table-column prop="routerName" label="路由名称" width="180"></el-table-column>
      <el-table-column prop="routerPath" label="路由路径" width="180"></el-table-column>
      <el-table-column prop="routerIcon" label="路由图标"></el-table-column>
      <el-table-column label="子路由" show-overflow-tooltip>
        <template slot-scope="scope">
          <div
            v-for="(item,index) in scope.row.routerSubModelList"
          >{{item.name}},{{item.path}},{{item.icon}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import userService from "@/common/user-service.js";
import EventsKey from "@/common/eventsKey.js";
import rxevents from "pubsub-js";
export default {
  data() {
    return {
      tableData: [],
      loading: true
    };
  },
  async created() {
    await this.getRouter();
  },
  mounted() {
    rxevents.subscribe(EventsKey.routerRefresh, async () => {
      await this.getRouter();
    });
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    // 获取元数据
    async getRouter() {
      const data = await userService.getRouterInfo();
      if (data.data) {
        this.loading = false;
        this.tableData = data.data;
      }
    }
  }
};
</script>

<style scoped>
</style>
