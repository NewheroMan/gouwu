export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err)
      }
    });
  })
}

export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (res) => {
        resolve(res);
        console.log(res, "4423123")
      },
      fail: (err) => {
        reject(err)
      }
    });
  })
}

export const showModal = ({
  content
}) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      success(res) {
        resolve(res)
      }
    })
  })
}

export const showToast = ({
  title
}) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      icon: 'none',
      success: (result) => {
        resolve(result);
      }
    });
  })
}

export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success: (result) => {
        resolve(result)
      },
      fail(err) {
        reject(err);
      }
    });
  })
}

export const requestPayment = (pay) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...pay,
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}