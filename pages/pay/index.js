import regeneratorRuntime from '../../lib/runtime/runtime';
import {
  showToast,
  requestPayment
} from "../../utils/asyncWx";
import {
  request
} from "../../request/index.js";
import {
  getStorageToken
} from "../../utils/storage";
Page({
  data: {
    address: {},
    cart: {},
    // 总价格
    totalPrice: 0,
    // 总数量 勾选了的中数量 
    totalNum: 0,
  },
  onShow() {
    const address = wx.getStorageSync("address") || {};
    const cart = wx.getStorageSync("cart") || {};

    let cartArr = Object.values(cart);
    let totalPrice = 0;
    let totalNum = 0;
    cartArr.forEach(v => {
      if (v.checked) {
        // 选中了
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
  },
  // 点击支付
  async handleOrderPay() {
    try {
      const cart = this.data.cart;
      const token = getStorageToken();
      if (!token) {
        wx.navigateTo({
          url: "/pages/auth/index"
        });
      } else {
        let header = {
          Authorization: token
        };
        let order_price = this.data.totalPrice;
        let consignee_addr = this.data.address.all;
        let goods = [];
        for (const key in cart) {
          if (cart.hasOwnProperty(key)) {
            if (cart[key].checked) {
              goods.push({
                goods_id: cart[key].goods_id,
                goods_number: cart[key].num,
                goods_price: cart[key].goods_price
              })
            }
          }
        }
        let orderParams = {
          order_price,
          consignee_addr,
          goods
        };
        const {
          order_number
        } = await request({
          url: '/my/orders/create',
          data: orderParams,
          method: "post",
          header: header
        });
        const {
          pay
        } = await request({
          url: '/my/orders/req_unifiedorder',
          data: {
            order_number
          },
          method: "post",
          header: header
        });
        const res = await requestPayment(pay);
        const res2 = await request({
          url: '/my/orders/chkOrder',
          data: {
            order_number
          },
          method: "post",
          header: header
        });
        await showToast({
          title: "支付成功！"
        });
        wx.navigateTo({
          url: "/pages/order/index?type=1",
        })
      }
    } catch (error) {
      console.log("error");
      // 发送异步请求 把error 发送到我们的服务器来分析统计错误
      await showToast({
        title: "支付失败！",

      })
    }
  }
})