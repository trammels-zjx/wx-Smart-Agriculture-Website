const app = getApp()
Page({
  data: {
    message: ({
      Vip: "",
      merchant: "",
      vip_num:"",
    }),
    sign:" ",
    avatarUrl: '/images/user_unlogin.png',
    userInfo: {},
    a: [
      { name: "我的信息", src: "/images/mine_1.png" },
      { name: "订单管理", src: "/images/mine_2.png" },
      { name: "成为商家", src: "/images/mine_3.png" },
      { name: "开通会员", src: "/images/mine_5.png" }
    ]
  },

  onLoad: function (options) {
    //获取用户信息
      wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
       }
       });
    const db = wx.cloud.database()
    db.collection('my_message').where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        // console.log('[数据库] [查询记录] 成功: ', res.data);
        if (res.data[0]) {
          this.data.message.sign = res.data[0].sign;
          this.data.message.Vip = res.data[0].Vip;
          this.data.message.merchant = res.data[0].merchant;
        }
        if (this.data.message.Vip == true){
          this.data.a[3].name = "会员详情";
          this.data.message.vip_num = res.data[0].vip_num;
        }
        else this.data.a[3].name = "开通会员";
        if (this.data.message.merchant == true)
          this.data.a[2].name = "我的店铺";
        else this.data.a[2].name = "成为商家";
        this.setData({
          a: this.data.a,
          message: this.data.message
        })
        fail: err => {
          console.error('[数据库] [查询记录] 失败：', err)
        }
      }
    })
    console.log(this.data.message);  
  },
  //获取用户信息
  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  onShow:function(){
    this.setData({
      sign: app.data.message.sign
    }) 
  },
  mine_message:function(e){
    wx.navigateTo({ url: '/pages/user_info/user_info' });
  },
  //页面跳转
  url_choose: function (e) {
    var i = e.currentTarget.dataset.index;
    if (i == 0) wx.navigateTo({ url: '/pages/user_info/user_info' });
    if (app.data.my_message_flag)
    {
    if (i == 1) wx.navigateTo({ url: "/pages/user_order/user_order" });
      if (i == 2) wx.navigateTo({ url: "/pages/apply_merchant/apply_merchant" });
    if (i == 3 &&this.data.message.Vip==true) wx.navigateTo({ url: "/pages/vip/vip?id="+this.data.message.vip_num });
    if (i == 3&&this.data.message.Vip==false) wx.navigateTo({ url: "/pages/vip/vip?id=false" });
     }
    else wx.showToast({
      title: '请先填写我的信息',
      icon: 'none',
      duration: 1500
    })
  }
  
})