//app.js

App({
  data: {
    message: ({
      name: "",
      phone: "",
      dress: "",
      sign: "",
    }),
    my_message_flag: false
  },

  
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    this.globalData = {}
    //获取openid
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        // console.log('[云函数] [login] user openid: ', res.result.openid)
        this.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    });


    //查询数据库(个人信息已存入)
    const db = wx.cloud.database()
    db.collection('my_message').where({
      _openid: this.globalData.openid
    }).get({
      success: res => {
        // console.log('[数据库] [查询记录] 成功: ', res.data);
        if (res.data[0]) {
          this.data.my_message_flag = true;
          this.data.message.sign = res.data[0].sign;
          this.data.message.name = res.data[0].name;
          this.data.message.phone = res.data[0].phone;
          this.data.message.dress = res.data[0].dress;
        }
        fail: err => {
          console.error('[数据库] [查询记录] 失败：', err)
        }
      }
    })
  },
})
