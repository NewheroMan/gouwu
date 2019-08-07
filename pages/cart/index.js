import regeneratorRuntime from '../../lib/runtime/runtime';
import {
  getSetting,
  openSetting,
  chooseAddress,
  showModal,
  showToast
} from "../../utils/asyncWx";
Page({
  data: {
    address: {},
    isAllChecked: false,
    totalPrice: 0,
    hasGoods: false,
    cart: {},
    totalNum: 0
  },
  async handleChooseAddress() {
    const res1 = await getSetting();
    const scopeAddress = res1.authSetting["scope.address"];
    if (scopeAddress === true || scopeAddress === undefined) {

    } else {
      await openSetting()
    }
    const res2 = await chooseAddress();
    console.log(res2, "323123")
    res2.all = res2.provinceName + res2.cityName + res2.countyName + res2.detailInfo;
    wx.setStorageSync("address", res2);
  },
  onShow() {
    const address = wx.getStorageSync("address") || {};
    const cart = wx.getStorageSync("cart") || {};
    this.setData({
      address,
      cart
    });
    this.setCart(cart)
  },
  setCart(cart) {
    let cartArr = Object.values(cart);
    let isAllChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cartArr.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        isAllChecked = false
      }
    })
    isAllChecked = cartArr.length === 0 ? false : isAllChecked;
    const hasGoods = cartArr.length ? true : false;
    this.setData({
      cart,
      isAllChecked,
      totalPrice,
      totalNum,
      hasGoods
    });
    wx.setStorageSync('cart', cart)
  },
  handleCartCheck(e) {
    // 1 获取要修改的商品的id
    const {
      id
    } = e.currentTarget.dataset;
    // 2 获取data中的购物车对象
    let {
      cart
    } = this.data;
    // 3 选中状态的取反
    cart[id].checked = !cart[id].checked;
    // 4 把cart重新设置回 data中和 缓存中

    // 5 重新计算 全选状态。。
    this.setCart(cart);
  },
  handleCartAllCheck() {
    let {
      isAllChecked,
      cart
    } = this.data;
    isAllChecked = !isAllChecked;
    for (const key in cart) {
      if (cart.hasOwnProperty(key)) {
        cart[key].checked = isAllChecked;
      }
    }
    this.setCart(cart)
  },
  async handleCartNumEdit(e) {
    const {
      id,
      operation
    } = e.currentTarget.dataset;
    let {
      cart
    } = this.data;
    if (cart[id].num === 1 && operation === -1) {
      const res = await showModal({
        content: "您确定删除吗?"
      });
      if (res.confirm) {
        delete cart[id];
        this.setCart(cart);
      } else {
        console.log('用户点击取消')
      }
    } else {
      cart[id].num += operation;
      this.setCart(cart);
    }
  },
  async handlePay() {
    const {
      address,
      totalNum
    } = this.data;
    if (!address.all) {
      await showToast({
        title: "您没有选择收货地址"
      })
    } else if (totalNum <= 0) {
      await showToast({
        title: "您没有要结算的商品"
      });
    } else {
      wx.navigateTo({
        url: '/pages/pay/index'
      })
    }
  }
})