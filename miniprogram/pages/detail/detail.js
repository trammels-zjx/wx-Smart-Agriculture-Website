// pages/detail/detail.js
const db = wx.cloud.database()
const book = db.collection('goods')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_list: []
  },

  toshop: function(e){
    wx.switchTab({
      url: '../shopping_cart/shopping_cart'
    })
  },

  toindex: function(e){
    wx.switchTab({
      url: '../index/index'
    })
  },
  
  onClickButton: function(e){
    var that = this
    var goods = that.data.goods_list[0]
    const db = wx.cloud.database()
    const todos = db.collection('shopping')
    db.collection('shopping').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        good_id : goods._id,
        name:goods.goods_name,
        price: goods.goods_money,
        num: goods.num,
        img: goods.img,
      },
      success(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
        wx.showToast({
          title: '加入购物车成功',
          icon: 'success',
          duration: 1000,
          success(res) {
            console.log('成功')
          }
        })
      },
      fail(res){
        wx.showToast({
          title: '商品在购物车中',
          icon: 'none',
          duration: 1000,
          success(res) {
            console.log('成功')
          }
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    var that = this
    db.collection('goods').where({
      _id: options.id
    }).get({
      success(res) {
        console.log(res.data)
        that.setData({
          goods_list: res.data
        })
      }
    })

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