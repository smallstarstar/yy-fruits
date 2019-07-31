const getTimes = {

  // 时间器
  getLocalTime() {
    var t = new Date();
    var year = t.getFullYear();
    var mon = t.getMonth() + 1;
    var day = t.getDate();
    var h = t.getHours();
    var min = t.getMinutes();
    var sec = t.getSeconds();

    mon = mon < 10 ? '0' + mon : mon;
    day = day < 10 ? '0' + day : day;
    h = h < 10 ? '0' + h : h;
    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;
    var dayTime = {};
    dayTime.yearTime = year + '-' + mon + '-' + day;
    dayTime.dayTime = h + ':' + min + ':' + sec;
    return dayTime;
  },

  timeTranfer(time) {
    var t = new Date(time);
    var year = t.getFullYear();
    var mon = t.getMonth() + 1;
    var day = t.getDate();
    var h = t.getHours();
    var min = t.getMinutes();
    var sec = t.getSeconds();

    mon = mon < 10 ? '0' + mon : mon;
    day = day < 10 ? '0' + day : day;
    h = h < 10 ? '0' + h : h;
    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;
    var times = year + '-' + mon + '-' + day + ' ' +  h + ':' + min + ':' + sec;
    return times;
  }
}


export default getTimes;
