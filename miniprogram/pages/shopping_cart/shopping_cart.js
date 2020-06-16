Page({
  data: {
    
    goods_list: [
      [{name:"苹果",describe:"计算机科学与技术黄超计算机科学学院计算机",price:2.30,number:2},{flag:0}],
      [{ name: "火龙果", describe: "计算机科学与技术黄超计算机科学学院计算机", price: 3.80, number: 3 }, { flag: 0 }], [{ name: "火龙果", describe: "计算机科学与技术黄超计算机科学学院计算机", price: 3.00, number: 3 }, { flag: 0 }], [{ name: "火龙果", describe: "计算机科学与技术黄超计算机科学学院计算机", price: 3, number: 3 }, { flag: 0 }],
      [{ name: "香蕉", describe: "计算机科学与技术黄超计算机科学学院计算机", price: 9.00, number: 5}, {flag: 0 }]
      ],//后端数据，若flag=1,则上传

      shopping_cart: [],

      add:[],
      all_pay:0,

      number:[],

      cart_num: ''
  },

  del : function(e){
    var that = this
    var shopping_cart = that.data.shopping_cart
    console.log(e.currentTarget.id)
    console.log(shopping_cart[e.currentTarget.id])

    wx.showModal({
      title: '提示',
      content: '确认删除',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          const db = wx.cloud.database()
          const book = db.collection('shopping')
          db.collection('shopping').doc(shopping_cart[e.currentTarget.id]._id).remove
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
    console.log(number)
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
      if (this.data.flag[i] == 1) {
        a.push(this.data.shopping_cart[i]);
      }
    }

    var list = JSON.stringify(a);
    var b = JSON.stringify(b);

    wx.navigateTo({
      url: '/pages/detail_submit/detail_submit?id=' + list + '&number=' + b +'&cart_num=' + this.data.cart_num,
    })
  },




  onLoad: function (options) {

    var random_no = "";
    for (var i = 0; i < 10; i++) //j位随机数，用以加在时间戳后面。
    {
      random_no += Math.floor(Math.random() * 8);
    }
    random_no = new Date().getTime() + random_no;
    this.setData({
      cart_num: random_no
    })
   
  },
  onShow: function () {

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
  }
})