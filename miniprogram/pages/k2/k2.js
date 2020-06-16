// miniprogram/pages/k2/k2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_list: [],
    classes:''

  },

  to:function(e){
    var that = this
    var listItems = that.data.goods_list
    var classes = that.data.classes
    console.log(listItems[e.currentTarget.id])
    wx.navigateTo({
      url: '../k2_index/k2_index?id=' + listItems[e.currentTarget.id]._id+'&classes='+classes
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options.id)
    that.setData({
      classes: options.id
    })
    const db = wx.cloud.database()
    const book = db.collection(options.id)
    db.collection(options.id).get({
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