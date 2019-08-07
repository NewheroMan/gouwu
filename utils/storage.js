export const getStorageCart = () => {
  return wx.getStorageSync("cart");
}
export const setStorageCart = (obj) => {
  wx.setStorageSync("cart", obj)
}
export const getStorageCate = () => {
  return wx.getStorageSync("cate");
}
export const setStorageCate = (obj) => {
  wx.setStorageSync("cate", obj);
}
export const getStorageAddress = () => {
  return wx.getStorageSync("address")
}
export const setStorageAddress = (address) => {
  wx.setStorageSync("address", address);
}
export const setStorageToken = (token) => {
  wx.setStorageSync("token", token);
}
export const getStorageToken = () => {
  return wx.getStorageSync("token");
}
export const setStorageUserInfo = (userinfo) => {
  wx.setStorageSync("userinfo", userinfo);
}
export const getStorageUserInfo = () => {
  return wx.getStorageSync("userinfo");
}