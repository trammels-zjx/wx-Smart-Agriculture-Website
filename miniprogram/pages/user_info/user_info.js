//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: '/images/user_unlogin.png',
    disabled:false,
    list: [{ text: "姓 名"}, { text: "联系方式"},
           {text: "收货地址"}, { text: "个性签名"}],
    message:[{value: ""},{value:""},{value:""},{value: ""}],
    my_id: "",
    color:"rgb(18, 233, 18)"
  },
data_change:function(){
    this.setData({
      disabled:false,
      color:"#ccc"
    })
  },
site: function (e) {
    var that = this;
  if (this.data.disabled == false) {
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
        console.log(res.telNumber);
        that.data.message[2].value = res.provinceName + res.cityName + res.countyName
          + res.detailInfo;
        that.setData({
          message: that.data.message
        })
      }
    })
  }
  },

onLoad: function() {
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
    if (app.data.my_message_flag==true) 
    {
        this.data.message[0].value = app.data.message.name,
        this.data.message[1].value = app.data.message.phone,
        this.data.message[2].value=app.data.message.dress,
        this.data.message[3].value=app.data.message.sign,
        this.setData({
          message:this.data.message,
          disabled:true
         });
          console.log(this.data.message); 
          console.log("app.data.my_message_flag"+app.data.my_message_flag);
    }
},
formName: function (e) {
  var i = e.currentTarget.dataset.index;
  this.data.message[i].value =e.detail.value;
  this.setData({
    message: this.data.message,
  })
},
submit:function(e){
    //第一次填写信息
    const db = wx.cloud.database();
    if (app.data.my_message_flag==false){
        db.collection('my_message').add({
          data: {
            name: this.data.message[0].value,
            phone: this.data.message[1].value,
            dress: this.data.message[2].value,
            sign: this.data.message[3].value,
            Vip:false,
            vip_num:"",
            chermant:false
          },
          success: res => { 
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 3000
            });
            this.setData({
              disabled: true,
              my_id: res._id
            });
            app.data.my_message_flag = true;
            wx.navigateBack({
              delta: 1
            })
          },
          fail: err => {
            console.error('[数据库] [新增记录] 失败：', err)
          }
        })
    }
    //更改信息
    else{
      if (this.data.disabled==false){
        db.collection('my_message').doc(this.data.id).update({
          data: {
            name: this.data.message[0].value,
            phone: this.data.message[1].value,
            dress: this.data.message[2].value,
            sign: this.data.message[3].value
          },
          success: res => { 
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 10000,
            });
            this.setData({ disabled: true });
              wx.navigateBack({
              delta: 1
            });
          },
          fail: err => {
            icon: 'none',
            console.error('[数据库] [更新记录] 失败：', err)
          }
        })
      }
     }
    app.data.message.name = this.data.message[0].value;
    app.data.message.phone = this.data.message[1].value;
    app.data.message.dress = this.data.message[2].value;
    app.data.message.sign = this.data.message[3].value;   
}
})
