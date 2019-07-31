import axios from 'axios';
import userInterface from './url.js'
import store from '../store/store.js';

const fruitIp = store.state.commonurl;
const FruitService = {

    // 保存水果信息
    async saveFruit(fruitInfo) {
        const url = fruitIp + userInterface.saveFruitINnfo;
        return await axios.post(url,fruitInfo);
    },

    // 获取流水信息
    async getTimeSheet() {
        const url = fruitIp + userInterface.getTimeSheetInfo;
        return await axios.get(url);
    },

    // 分页获取水果的集合信息
    async getFruitByPage(page,size) {
        const url = `${fruitIp}` + `${userInterface.getFruitByPage}?` + 'page=' +
        page + '&size=' + size;
        return await axios.get(url);
    }
}

export default FruitService;