Page({
  data: {
    goodsList: []
  },

  onShow: function () {
    const collect = wx.getStorageSync("collect") || [];
    this.setData({
      goodsList: collect
    })
  },

});