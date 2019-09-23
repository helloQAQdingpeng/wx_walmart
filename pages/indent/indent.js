// pages/indent/indent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_products:[],
    total:'',
    number:'',
    out_trade_no:''
  },

  init(id){
    let that = this
    let token = wx.getStorageSync('token');
    wx.request({
      url: 'http://localhost:3000/orders?id=' + id,
      header: {
        'Authorization': token
      },
      success:(res) =>{
        console.log(res)
        that.setData({
          order_products: res.data.order.Order_products,
          total: res.data.total,
          number: res.data.number,
          out_trade_no: res.data.order.out_trade_no
        })
      }

    })
  },
  wxpay(){
    // console.log(123)
    wx.request({
      url: 'http://localhost:3000/orders/pay',
      method:"POST",
      header:{
        'Authorization': wx.getStorageSync('token')
      },
      data:{
        out_trade_no: this.data.out_trade_no
      },
      success: (res)=>{
        console.log(res);
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success(res) { 
            wx.navigateTo({
              url: '../../pages/index/index'
            })
          },
          fail(res) { 
            wx.showToast({
              title: '已取消支付',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }


    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let id = options.id
    this.init(id)
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