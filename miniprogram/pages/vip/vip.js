
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vip_name:'',
    vip_num :'',
    site: ''

  },

 

  name: function(e){  
    this.setData({
      vip_name: e.detail
    })
  },

  site: function(e){
    var that = this
    wx.chooseAddress({
      success(res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
        that.setData({
          site: res.provinceName + res.cityName + res.countyName + res.detailInfo

        })

      }
    })
  },


  submit: function(e){
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
    else{
      const db = wx.cloud.database()
      const todos = db.collection('vip')
      db.collection('vip').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          vip_name: vip_name,
          vip_num: vip_num,
          site: site

        },

        success(res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res)
          wx.showToast({
            title: '申请会员成功',
            icon: 'success',
            duration: 1000,
            success(res) {
              console.log('成功')
              setTimeout(function () {
                wx.reLaunch({
                  url: '../user_mine/user_mine',
                })
              }, 1000)
            }
          })
        },
        fail() {
            console.log("yonghushibao")
        }
      })
    }  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var random_no = "";
    for (var i = 0; i < 10; i++) //j位随机数，用以加在时间戳后面。
    {
      random_no += Math.floor(Math.random() * 10);
    }
    random_no = 'vip'+ random_no;
    this.setData({
      vip_num :random_no 

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