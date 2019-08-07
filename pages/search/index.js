import regeneratorRuntime from '../../lib/runtime/runtime';
import {
  request
} from "../../request/index.js";
Page({

  data: {
    inputValue: "",
    isFocus: false,
    goods: []
  },
  TimeId: -1,
  handeSearchInput(e) {
    const {
      value
    } = e.detail;
    if (!value.trim()) {
      this.setData({
        goods: [],
        inputValue: "",
        isFocus: false
      })
      return;
    }
    this.setData({
      isFocus: true
    })
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.getQSearch(value);
    }, 1000);
  },
  async getQSearch(query) {
    const goods = await request({
      url: "/goods/qsearch",
      data: {
        query
      }
    })
    this.setData({
      goods
    })
  },
  handleCancel() {
    this.setData({
      goods: [],
      inputValue: "",
      isFocus: false
    })
  }
})