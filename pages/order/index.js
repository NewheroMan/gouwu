import regeneratorRuntime from '../../lib/runtime/runtime';
import {
  request
} from "../../request/index.js";
import {
  getStorageToken
} from "../../utils/storage.js";
Page({
  data: {
    tabs: [{
        id: 0,
        title: "全部",
        isActive: true
      },
      {
        id: 1,
        title: "待付款",
        isActive: false
      },
      {
        id: 2,
        title: "待发货",
        isActive: false
      },
      {
        id: 3,
        title: "退款/退货",
        isActive: false
      }
    ],
    orderList: []
  },
  handleItemChange(e) {
    const {
      index
    } = e.detail;
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    });
  },
  onLoad: function (options) {

  },

  onShow: function () {
    const token = getStorageToken();
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }
    let pageList = getCurrentPages();
    let currentPage = pageList[pageList.length - 1];
    const {
      type
    } = currentPage.options;
    this.getOrderList(type);
  },
  async getOrderList(type) {
    let header = {
      Authorization: getStorageToken()
    }
    let {
      orders
    } = await request({
      url: "/my/orders/all",
      data: {
        type
      },
      header: header
    })
    orders.forEach(v => {
      v.create_time_cn = (new Date(v.create_time * 1000)).toLocaleString();
    })
    this.setData({
      orderList: orders
    })
  }
});