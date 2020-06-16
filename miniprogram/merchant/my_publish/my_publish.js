const db = wx.cloud.database()
const book = db.collection('goods')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listItems: []

  },

  del: function(e){
    var that = this
    var listItems = that.data.listItems
    console.log(e.currentTarget.id)
    console.log(listItems[e.currentTarget.id])

    wx.showModal({
      title: '提示',
      content: '确认删除',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          db.collection('goods').doc(listItems[e.currentTarget.id]._id).remove
          ({
            success(res) {
              console.log(res.data)
              console.log("删除成功")
              that.onShow()
            }
          })


        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    var that = this
    var name = getApp()
    console.log(name.globalData.openid)

    db.collection('goods').where({
      _openid: name.globalData.openid
    }).get({
      success(res) {
        console.log(res.data)
        that.setData({
          listItems: res.data
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