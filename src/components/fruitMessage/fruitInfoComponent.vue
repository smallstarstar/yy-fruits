<template>
  <div>
    <fruit-add></fruit-add>
    <div class="fruitInfo">
      <div v-for="(item,index) in fruitList" :key="index" class="fruitInfoMessage">
        <img :src="item.fruitImg" alt="水果" class="FruitImg">
        <div class="fruitMessage">
          <div>名称：{{item.fruitName}}</div>
          <div>价格：{{item.fruitPrice}}</div>
          <div>产地：{{item.fruitAddress}}</div>
          <div>库存：{{item.fruitCount}}</div>
          <div>描述：{{item.fruitDes}}</div>
        </div>
      </div>
    </div>
    <!-- 分页器 -->
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="100"
        layout="total, prev, pager, next, jumper"
        :total="totalData"
      ></el-pagination>
    </div>
    <div class="timeSheet">
      <time-sheet></time-sheet>
    </div>
  </div>
</template>

<script>
import FruitAdd from "./fruit-add.vue";
import FruitService from "@/common/fruit-service.js";
import TimeSheet from "@/components/TimeSheet.vue";
import rxevent from "pubsub-js";
import EventsKey from "@/common/eventsKey.js";
export default {
  components: {
    FruitAdd,
    TimeSheet
  },
  data() {
    return {
      page: 1,
      size: 4,
      fruitList: [],
      totalData: 0
    };
  },
  async mounted() {
    await this.getFruitMessage();
    rxevent.subscribe(EventsKey.getFruitInfo, async () => {
      await this.getFruitMessage();
    });
  },
  methods: {
    async getFruitMessage() {
      const data = await FruitService.getFruitByPage(this.page, this.size);
      this.totalData = data.data.totalElements;
      this.fruitList = data.data.content;
    },
    async handleCurrentChange(val) {
      this.page = val;
      const data = await FruitService.getFruitByPage(this.page, this.size);
    }
  },
  destroyed() {
    rxevent.unsubscribe(EventsKey.getFruitInfo, true);
  }
};
</script>

<style scoped>
.timeSheet {
  position: absolute;
  width: 20%;
  top: 10%;
  right: 10px;
  height: 415px;
  box-shadow: 1px 1px 1px black;
}
.FruitImg {
  width: 200px;
  height: 120px;
}
.fruitInfo {
  margin-top: 10px;
}
.fruitInfoMessage {
  position: relative;
  width: 35%;
  height: 180px;
  display: inline-block;
  box-shadow: 1px 1px 1px #f2874b;
  margin-left: 1%;
  margin-top: 10px;
}
.fruitMessage {
  position: absolute;
  left: 200px;
  top: 0px;
}
.block {
  position: absolute;
  right: 21%;
}
</style>
