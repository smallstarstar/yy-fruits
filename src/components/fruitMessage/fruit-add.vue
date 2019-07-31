<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="openDialog()">添 加</el-button>
    <el-dialog title="添加水果信息" :visible.sync="dialogVisible" width="50%">
      <label for="name">名称</label>
      <el-input class="input" placeholder="请输入水果名称...." v-model="fruitInfo.fruitName"></el-input>
      <label for="name">价格</label>
      <el-input class="input" placeholder="请输入水果价格...." v-model="fruitInfo.fruitPrice"></el-input>
      <label for="name">库存</label>
      <el-input class="input" placeholder="请输入水果名称...." v-model="fruitInfo.fruitCount"></el-input>
      <label for="name">产地</label>
      <el-input class="input" placeholder="请输入水果产地...." v-model="fruitInfo.fruitAddress"></el-input>
      <label for="name">描述</label>
      <el-input
        placeholder="请输入水果描述...."
        v-model="fruitInfo.fruitDes"
        type="textarea"
        resize="none"
      ></el-input>
      <div v-if="showUpload">
        <el-upload
          class="upImg"
          action
          :auto-upload="false"
          list-type="picture-card"
          :on-preview="changeUpload"
          :on-remove="handleRemove"
          :on-change="changeImg"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisibles" :modal="false">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="success" @click="submit()" :disabled="isDisable">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import FruitInfo from "@/model/fruit-info.js";
import FruitService from "@/common/fruit-service.js";
import rxevent from "pubsub-js";
import EventsKey from "@/common/eventsKey.js";
export default {
  data() {
    return {
      dialogVisible: false,
      fruitInfo: FruitInfo,
      dialogImageUrl: "",
      dialogVisibles: false,
      showUpload: false,
      isDisable: true
    };
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
      this.showUpload = true;
    },
    cancel() {
      this.dialogVisible = false;
      this.fruitInfo = {};
      this.showUpload = false;
      this.isDisable = true;
    },
    async submit() {
      this.dialogVisible = false;
      const data = await FruitService.saveFruit(this.fruitInfo);
      this.fruitInfo = {};
      this.showUpload = false;
      rxevent.publish(EventsKey.getFruitInfo, true);
      // 通知时间轴
      rxevent.publish(EventsKey.refreshTimeSheet, true);
      this.isDisable = true;
    },
    changeImg(file) {
      const files = [];
      files.push(file.raw);
      this.file = file;
      this.fileList = files;
      if(this.file) {
        this.isDisable = false;
      }
      const render = new FileReader();
      render.readAsDataURL(file.raw);
      render.onload = e => {
        const dataImg = e.target.result;
        this.fruitInfo.fruitImg = dataImg;
      };
    },
    changeUpload(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisibles = true;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleRemove(file, fileList) {}
  }
};
</script>

<style scoped>
.input {
  display: inline-block;
  width: 44%;
  margin-top: 5px;
}
.upImg {
  width: 100%;
  height: 50px;
  margin-top: 10px;
  text-align: center;
}
</style>
