import axios from 'axios';
import userInterface from './url.js'
import store from '../store/store.js';

const fruitIp = store.state.commonurl;

const userService = {
  // 用户登陆
  async userLogin(userName, userPassword) {
    const url = `${fruitIp}` + `${userInterface.userLogin}?` + 'userName=' +
      userName + '&userPassword=' + userPassword;
    return await axios.get(url);
  },

  // 获取用户信息
  async userMessageInfo(page, size) {
    const url = `${fruitIp}` + `${userInterface.userMessageInfo}?` + 'page=' +
      page + '&size=' + size;
    return await axios.get(url);
  },

  // 删除用户信息
  async deleteByUserId(userId) {
    const url = `${fruitIp}` + `${userInterface.deleteUserInfoById}?` + 'userId=' + userId;
    return axios.delete(url);
  },

  // 更新用户信息
  async updataUserInfo(userId, userInfo) {
    const url = `${fruitIp}` + `${userInterface.updataUserInfo}?` + 'userId=' + userId;
    return axios.put(url, userInfo);
  },

  // 用户根据手机号码，用户名获取用户密码
  async getUserInfo(userName, userPhone) {
    const url = `${fruitIp}` + `${userInterface.getUserPassword}?` + 'userName=' +
      userName + '&userPhone=' + userPhone;
    return await axios.get(url);
  },

  // 添加路由信息
  async saveRouterInfo(routerInfo) {
    const url = fruitIp + userInterface.saveRouterInfo;
    return await axios.post(url, routerInfo);
  },

  // 获取路由信息集合
  async getRouterInfo() {
    const url = fruitIp + userInterface.getRouterInfo;
    return await axios.get(url);
  },

  // 更新用户姓名以及密码
  async fixUserInfo(userId,userName,userPassword) {
    const url = `${fruitIp}` + `${userInterface.refreshUserMessage}?` + 'userId=' +
    userId + '&userName=' + userName + '&userPassword=' + userPassword;
    return await axios.put(url);
  }
}

export default userService;
