// miniprogram/pages/search/search.js
const db = wx.cloud.database()
const book = db.collection('goods')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_list: []

  },

  To_item: function (e) {
    var that = this
    var listItems = that.data.goods_list
    console.log(listItems[e.currentTarget.id])
    wx.navigateTo({
      url: '../detail/detail?id=' + listItems[e.currentTarget.id]._id
    })
  },


  onSearch: function (e) {
    console.log(e.detail)

    var that = this
    db.collection('goods').where({
      goods_name: e.detail
    })
    .get({
      success(res) {
        console.log(res.data)
        that.setData({
          goods_list: res.data
        })
        if(res.data==0){
          wx.showToast({
            title: '没有这个物品',
            icon: 'none',
            duration: 1000,
          })
          console.log('查询错误')

        }
      },     
      
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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