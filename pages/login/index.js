import {
  setStorageUserInfo
} from "../../utils/storage.js";
Page({
  handleGetUserInfo(e) {
    setStorageUserInfo(e.detail.userInfo);
    wx.navigateBack({
      delta: 1
    });

  }
})