import {
  request
} from "../../request/index.js";
import {
  getStorageCart,
  setStorageCart
} from "../../utils/storage.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({

  data: {
    goodsInfo: {},
    isCollect: false
  },
  GoodsObj: {},

  onLoad: function (options) {
    this.getGoodsDetail(options.goods_id)
  },
  async getGoodsDetail(goods_id) {
    const result = await request({
      url: "/goods/detail",
      data: {
        goods_id
      }
    });
    this.GoodsObj = result;
    const collect = wx.getStorageSync("collect") || [];
    let isCollect = collect.some(v => v.goods_id === this.GoodsObj.goods_id);
    this.setData({
      goodsInfo: {
        goods_name: result.goods_name,
        goods_price: result.goods_price,
        pics: result.pics,
        goods_introduce: result.goods_introduce.replace(/\.webp/g, '.jpg')
      },
      isCollect
    })
  },
  handlePreviewImage(e) {
    const {
      index
    } = e.currentTarget.dataset;
    const urls = this.data.goodsInfo.pics.map(v => v.pics_big);
    const current = urls[index];
    wx.previewImage({
      current,
      urls
    })
  },
  handleCartAdd() {
    let cart = getStorageCart() || {};
    if (cart[this.GoodsObj.goods_id]) {
      cart[this.GoodsObj.goods_id].num++;
    } else {
      cart[this.GoodsObj.goods_id] = this.GoodsObj;
      cart[this.GoodsObj.goods_id].num = 1;
    }
    setStorageCart(cart);
    wx.showToast({
      title: '购买成功',
      icon: 'success',
      mask: true,
    });
  },
  handleGoodsCollect() {
    let collect = wx.getStorageSync("collect") || [];
    let index = collect.findIndex(v => v.goods_id === this.GoodsObj.goods_id);
    if (index === -1) {
      collect.push(this.GoodsObj);
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
      this.setData({
        isCollect: true
      })
    } else {
      collect.splice(index, 1);
      wx.showToast({
        title: '取消成功',
        icon: "success",
        mask: true
      });
      this.setData({
        isCollect: false
      })
    }
    wx.setStorageSync("collect", collect)
  }
})