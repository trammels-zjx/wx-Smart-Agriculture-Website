// pages/detail_submit/detail_submit.js
var util = require('../../utils/util.js');  
Page({
  data: {
    list:[],
    pay_all:0,
    number:[],
    order_num: '',
    time:'',
    cart_num:'',
    vip_num:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var temp=0;
    this.data.list=JSON.parse(options.id);
    this.data.number = JSON.parse(options.number);


    console.log(options.number[0])
    for (var i = 0; i < this.data.list.length; i++){
      temp = temp + this.data.list[i].price*this.data.number[i]
    }
    this.setData({
      list:this.data.list,
      pay_all:temp*100
    });

    this.setData({
      number:this.data.number
    })
    console.log(this.data.list[0].name)



    var random_no = "";
    for (var i = 0; i < 10; i++) //j位随机数，用以加在时间戳后面。
    {
      random_no += Math.floor(Math.random() * 10);
    }
    random_no = new Date().getTime() + random_no;
    this.setData({
      order_num: random_no
    })

    let a = new Date().getTime()
    let curDate = new Date(a)
    let time = `${curDate.getFullYear()}-${curDate.getMonth() +
      1}-${curDate.getDate()} ${curDate.getHours()}:${curDate.getMinutes()}:${curDate.getSeconds()}`;


    // var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      time: time
    })
    console.log(time)

    this.setData({
      cart_num: options.cart_num
    })
    
  var app = getApp()
    const db = wx.cloud.database()
    const book = db.collection('vip')
    db.collection('vip').where({
      _openid: app.globalData.openid
    })
    .get({
      success(res) {
        console.log(res.data[0].vip_num)
        that.setData({
          vip_num: res.data[0].vip_num
        })
      }
    })
  },


  onSubmit:function(){
    const db = wx.cloud.database();
    for (var i = 0; i < this.data.list.length;i++){
    db.collection('all_order').add({
        data: {
          goods_message: this.data.list[i],
          number: this.data.number,
          money: this.data.list[i].price * this.data.number[i],
          flag:0,   //0表示未发货，1表示已发货，2表示订单已完成
          order_num: this.data.order_num,
          time: this.data.time,
          cart_num: this.data.cart_num,
          vip_num: this.data.vip_num
        },
        success: res => {
          wx.showToast({
            title: '已下单',
            icon: 'success',
            duration: 3000,
            success(res){
              wx.switchTab({
                url: '/pages/shopping_cart/shopping_cart'
              })
            }
            
          })
        },
        fail: err => {
          console.error('下单失败', err)
        }
     })
    }
  },
  onShow: function () {

  }
})