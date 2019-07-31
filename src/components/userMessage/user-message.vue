<template>
  <div>
    <!--新增加查询添加功能 -->
    <div class="fun">
      <el-input placeholder="请输入关键字..." v-model="searchKeyWord" @keyup.enter.native="searchKey()"></el-input>
      <el-button @click="search()" type="primary">查询</el-button>
    </div>
    <el-table :data="userData" style="width: 100%;" v-loading="loading">
      <el-table-column prop="userName" label="姓名" sortable width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="userPassword" label="密码" sortable width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="userAddress" label="地址" sortable width="130" show-overflow-tooltip></el-table-column>
      <el-table-column prop="userPhone" label="电话" sortable show-overflow-tooltip></el-table-column>
      <el-table-column prop="userEmail" label="邮箱" sortable show-overflow-tooltip></el-table-column>
      <el-table-column prop="userBirth" label="生日" sortable show-overflow-tooltip width="100"></el-table-column>
      <el-table-column prop="cTime" label="时间" sortable show-overflow-tooltip></el-table-column>
      <el-table-column prop="userRole" label="角色" sortable width="80" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[7, 14, 20, 30]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalData"
      ></el-pagination>
    </div>
    <!-- 编辑弹窗 -->
    <editor-message></editor-message>
  </div>
</template>

<script>
import userService from "@/common/user-service.js";
import EditorMessage from "@/components/userMessage/editorMessage.vue";
import rxevent from "pubsub-js";
import EventsKey from "@/common/eventsKey.js";
import getTimes from "@/common/getTime.js";
export default {
  components: {
    EditorMessage
  },
  data() {
    return {
      page: 1,
      size: 7,
      totalData: 0,
      userData: [],
      closeDialog: true,
      searchKeyWord: "",
      loading: true
    };
  },
  async created() {
    await this.queryByPage();
  },
  mounted() {
    // 刷新数据
    rxevent.subscribe(EventsKey.refreshData, async () => {
      await this.queryByPage();
    });
  },
  methods: {
    handleEdit(index, row) {
      const data = {};
      data.key = true;
      data.value = row;
      rxevent.publish(
        EventsKey.editorOpenDialog,
        JSON.parse(JSON.stringify(data))
      );
    },
    /**
     * 删除操作
     */
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("确定删除用户", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(async () => {
          const result = await userService.deleteByUserId(row.id);
          console.log(result);
          if (result) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            await this.queryByPage();
          }
        })
        .catch(() => {
          return;
        });
    },
    async handleSizeChange(val) {
      this.size = val;
      await this.queryByPage();
    },
    async handleCurrentChange(val) {
      this.page = val;
      await this.queryByPage();
    },
    // 回车查询数据
    searchKey() {
      this.search();
    },
    // 添加人员信息
    add() {},
    // 按钮搜索
    search() {
      const values = this.searchKeyWord;
      this.userData = this.userData.filter(el => {
        return el.userName.includes(values);
      });
       this.totalData = this.userData.length;
    },
    // 分页查询的公共的方法
    async queryByPage() {
      const result = await userService.userMessageInfo(this.page, this.size);
      if (result) {
        this.userData = result.data.content;
        this.loading = false;
        this.userData.forEach(el => {
          el.cTime = getTimes.timeTranfer(el.cTime);
        });
        this.totalData = result.data.totalElements;
      }
    }
  },
  watch: {
    searchKeyWord(val) {
      if (!val) {
        this.queryByPage();
      }
    }
  }
};
</script>

<style scoped>
</style>

<style scoped>
.block {
  position: absolute;
  top: 525px;
  right: 30px;
}
.fun {
  margin-bottom: 10px;
}
/deep/ .el-input {
  width: 30%;
}
</style>
