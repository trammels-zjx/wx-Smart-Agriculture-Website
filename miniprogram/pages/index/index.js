const db = wx.cloud.database()
const book = db.collection('goods')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideshow: ['cloud://farming-rhmlt.6661-farming-rhmlt/slideshow/mp50893848_1451268642309_1_th.jpg','cloud://farming-rhmlt.6661-farming-rhmlt/slideshow/195262821.jpg'],
    goods_list: [],

    classify_list: []

  },

  To_item: function (e) {
    var that = this
    var listItems = that.data.goods_list
    console.log(listItems[e.currentTarget.id])
    wx.navigateTo({
      url: '../detail/detail?id=' + listItems[e.currentTarget.id]._id
    })
  },

  To_search:function(e){
    wx.navigateTo({
      url: '../search/search'
    })

  },


  onSearch: function(e){
    console.log(e.detail)
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    db.collection('goods').get({
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