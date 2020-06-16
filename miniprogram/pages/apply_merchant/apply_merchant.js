// miniprogram/pages/apply_merchant/apply_merchant.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  formSubmit(e) {
    var that = this
    var imgPath = that.data.imgPath
    var cloudPath = that.data.cloudPath

    var good_classes = that.data.goods_classes

    if (e.detail.value.name == 0) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 1000
      })
    } else if (e.detail.value.tel == 0) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 1000
      })

    } else if (e.detail.value.textarea == 0) {
      wx.showToast({
        title: '请输入申请商家原因',
        icon: 'none',
        duration: 1000
      })
    } 

    else {
      const db = wx.cloud.database()
      const todos = db.collection('apply_merchant')
      db.collection('apply_merchant').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          name: e.detail.value.name,
          tel: e.detail.value.tel,
          textarea: e.detail.value.textarea,   

          agreement: false,    

        },

        success(res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res)
          wx.showToast({
            title: '申请提交成功',
            icon: 'success',
            duration: 1000,
            success(res) {
              console.log('成功')

              setTimeout(function () {
                wx.reLaunch({
                  url: '../index/index',
                })
              }, 1000)
            }
          })
        }
      })
    }

      
    console.log('form发生了submit事件，携带数据为：', e.detail.value)

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var merchant = getApp()

    var that = this
    const db = wx.cloud.database()
    const book = db.collection('apply_merchant')
    db.collection('apply_merchant').where({
      _openid: merchant.globalData.openid
    })
      .get({
        success(res) {
          console.log(res.data)
          if(res.data[0].agreement){
            wx.navigateTo({
              url: '../../merchant/classify/classify'
            })
          }
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