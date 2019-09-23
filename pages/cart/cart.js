// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:{},
    total:'',
    number:'',
  },
  //购物车接口请求
  init(){
    let that = this
    let token = wx.getStorageSync('token')
    wx.request({
      url: 'http://localhost:3000/carts',
      header: {
        Authorization: token,
      },
      success: (res) => {
        console.log(res)
        that.setData({
          product: res.data.data,
          total: res.data.total,
          number: res.data.number,
        })
        console.log(this.data.product)
      }
    })
  },
  //增加，减少商品数量
  changeNum:function(e){
    console.log(e)
    let cart_id = e.target.dataset.cart_id;
    let type = e.target.dataset.type;
    let token = wx.getStorageSync('token');
    wx.request({
      url: 'http://localhost:3000/carts',
      method:"PUT",
      header: {
        'Authorization': token
      },
      data: {
        cart_id: cart_id,
        type: type
      },
      success: (res) => {
        this.init()
      }
    })
  },
//点击结算添加订单
  account:function(){
    let token = wx.getStorageSync('token');
    wx.request({
      url: 'http://localhost:3000/orders',
      header:{
        'Authorization': token,
      },
      method: "POSt",
      success: (res) => {
       console.log(res)
        wx.navigateTo({
          url: "../../pages/indent/indent?id=" + res.data.orderId,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})