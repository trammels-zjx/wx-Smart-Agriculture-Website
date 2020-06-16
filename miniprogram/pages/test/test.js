// miniprogram/pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopping_cart:[],
    flag: [],
    number:[]

  },

  


  pay_add: function (e) {
    this.setData({
      all_pay: 0
    });
    var t = this.data;
    var q = e.currentTarget.dataset.item;
    var all_money = 0;
    //当前物品未选中
    if (t.flag[q] == 0)
      t.flag[q] = 1;
    else t.flag[q] = 0;
    this.setData({
      flag: t.flag,
    });
    for (var i = 0; i < t.shopping_cart.length; i++) {
      if (t.flag[i] == 1)
        all_money = t.number[i] * t.shopping_cart[i].price + all_money;
    }
    this.setData({
      all_pay: all_money
    });
    console.log(t.all_pay);
  },


  onChange: function (e) {
    this.setData({
      all_pay: 0
    });
    var all_m = 0;
    var number = e.detail;
    var index = e.currentTarget.dataset.index;
    this.data.number[index] = number;
    this.setData({
      number: this.data.number
    });
    for (var i = 0; i < this.data.shopping_cart.length; i++) {
      if (this.data.flag[i] == 1)
        all_m = this.data.number[i] * this.data.shopping_cart[i].price + all_m;
    }
    this.setData({
      all_pay: all_m
    });
    console.log(this.data.all_pay);



  },


  submit: function (e) {
    var a = [];
    var b = this.data.number;
    var temp = ({
      name: "",
      price: "",
      number: ""
    });
    for (var i = 0; i < this.data.shopping_cart.length; i++) {
      if (this.data.flag[i]==1) {
        a.push(this.data.shopping_cart[i]);
      }
    }

    var list = JSON.stringify(a);
    var b = JSON.stringify(b);
    
    wx.navigateTo({
      url: '/pages/detail_submit/detail_submit?id=' + list+'&number='+b,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var app = getApp()
    const db = wx.cloud.database()
    const book = db.collection('shopping')
    db.collection('shopping').where({
      _openid: app.openid
    }).get({
      success(res) {
        console.log(res.data)
        var a = []
        var b = []
        var c = []
        for (var i = 0; i < res.data.length; i++) {
          a.push(res.data[i])
          b.push('0')
          c.push('1')
        }
        that.setData({
          shopping_cart: a
        })
        that.setData({
          flag: b
        })
        that.setData({
          number: c
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