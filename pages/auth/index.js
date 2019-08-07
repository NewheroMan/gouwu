/* 
1 获取用户信息 button的功能来获取 
 */

import {
  request
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import {
  login
} from "../../utils/asyncWx";
Page({

  async handleGetUserInfo(e) {
    // 1 获取参数    encryptedData rawData iv signature
    const {
      encryptedData,
      rawData,
      iv,
      signature
    } = e.detail;
    // 2 获取登录后的code属性
    const {
      code
    } = await login();
    // 2.5 把要提交的参数封装成一个对象
    const postParams = {
      encryptedData,
      rawData,
      iv,
      signature,
      code
    };
    // 3 发送请求获取token值
    const {
      token
    } = await request({
      url: "/users/wxlogin",
      method: "post",
      data: postParams
    });
    // 4 把token存入到缓存中
    wx.setStorageSync("token", token);
    // 5 从哪里来 跳回到哪里去
    wx.navigateBack({
      // 返回上一个页面 
      delta: 1
    });
  }
});