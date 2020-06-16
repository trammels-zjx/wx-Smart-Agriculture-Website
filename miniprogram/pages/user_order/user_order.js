// pages/user_order/user_order.js
const app = getApp()
Page({
  data: {
   active:0,
   array_0:[],
   array_1: [],
   array_2: []
  },
  onLoad: function (options) {
    var that = this;
    var a_0 = [];
    var a_1 = [];
    var a_2 = [];
    const db = wx.cloud.database()
    db.collection('all_order').limit(20)
      .where({
        _openid: app.globalData.openid
      })
      .get({
        success: function (res) {
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].flag == 0) a_0.push(res.data[i]);
            if (res.data[i].flag == 1) a_1.push(res.data[i]);
            if (res.data[i].flag == 2) a_2.push(res.data[i]);
          }
          console.log(res.data);
          that.setData({
            array_0: a_0,
            array_1: a_1,
            array_2: a_2
          });
          console.log("待发货" + that.data.array_0.length + "  待收货" + that.data.array_1.length + "  已完成" + that.data.array_2.length);
          console.log(that.data.array_0);
        },
        fail: console.error
      })
      console.log(app.globalData.openid)
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
})