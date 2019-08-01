import {
  request
} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightGoodsList: [],
    currentIndex: 0,
    scrollTop: 0
  },
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let cates = wx.getStorageSync("cates");
    if (!cates) {
      this.getCategoryList();
    } else {
      if (Date.now() - cates.time > 1000 * 20) {
        this.getCategoryList()
      } else {
        this.Cates = cates.data;
        let leftMenuList = this.Cates.map((v, i) => ({
          cat_name: v.cat_name,
          cat_id: v.cat_id
        }));
        let rightGoodsList = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightGoodsList
        })
      }
    }
  },
  getCategoryList() {
    request({
        url: "/categories"
      })
      .then(res => {
        console.log(res, "111")
        // 给全局参数 赋值
        this.Cates = res;
        // 把接口的数据存入到本地存储中 
        wx.setStorageSync("cates", {
          time: Date.now(),
          data: this.Cates
        });

        // map 返回新数组  
        let leftMenuList = this.Cates.map((v, i) => ({
          cat_name: v.cat_name,
          cat_id: v.cat_id
        }));
        // 这个是大家电对象 里面的children 数组 
        let rightGoodsList = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightGoodsList
        })

      })
  },
  handleMenuChange(e) {
    const {
      index
    } = e.currentTarget.dataset;
    let rightGoodsList = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightGoodsList,
      scrollTop: 0
    })
  }

})