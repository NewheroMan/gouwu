import {
  getStorageUserInfo
} from "../../utils/storage.js";
Page({
  data: {
    userinfo: {},
    collectLegnth: 0,
  },
  //options(Object)
  onShow() {
    const userinfo = getStorageUserInfo();
    if (!userinfo) {
      wx.navigateTo({
        url: '/pages/login/index'
      });
      return;
    }
    const collect = wx.getStorageSync("collect") || []
    this.setData({
      userinfo,
      collectLegnth: collect.length
    })
  },

});