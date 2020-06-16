const app = getApp()
Page({
  data: {
   
    site: '',
    flag: false
  },
  //点击获取地址按钮获取微信地址
  site: function (e) {
    var that = this
    wx.chooseAddress({
      success(res) {
        console.log(res.userName)//姓名
        console.log(res.postalCode)//邮政编码
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        //手机号
        console.log(res.telNumber)
        that.setData({
          site: res.provinceName + res.cityName + res.countyName
            + res.detailInfo
        })
      }
    })
  },

  //提交数据向数据库更新信息
  submit: function (e) {
    var that = this
    var vip_name = that.data.vip_name
    var vip_num = that.data.vip_num
    var site = that.data.site
    if (vip_name == 0) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 1000
      })
    } else if (site == 0) {
      wx.showToast({
        title: '请输入地址',
        icon: 'none',
        duration: 1000
      })
    }
    else {
      const db = wx.cloud.database()
      db.collection('my_message').doc(this.data.id).update({
        data: {
          name: vip_name,
          vip_num: vip_num,
          dress: site,
          Vip: true
        },
        success: res => {
          wx.showToast({
            title: '申请成功',
            icon: 'success',
            duration: 4000,
          });
          that.setData({ is_Vip: true });
          wx.navigateBack({
            delta: 1
          });
        },
        fail: err => {
          console.error('申请失败：', err)
        }
      })
    }
  },

  onLoad: function (options) {

  },


  onShow: function () {

  },
  onShareAppMessage: function () {

  }
})