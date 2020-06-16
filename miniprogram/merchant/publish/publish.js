// miniprogram/merchant/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgPath: [],   //文件临时路径
    cloudPath: [],     //文件摘要，文件信息
    fileID: [],  //存储返回的文件ID


    goods_classes:'',

    commodity_num: ''

  },


  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },


  img_item: function (e) {
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // console.log(res.tempFilePaths)
        // that.setData({
        //   imgPath: res.tempFilePaths
        // })

        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        that.setData({
          imgPath: that.data.imgPath.concat(tempFilePaths)
        });



        // that.setData({
        //           ['tempFilePaths[' + e.target.id + ']']: res.tempFilePaths[0]
        //   })
      }
    })
  },


  formSubmit(e) {
    var that = this
    var imgPath = that.data.imgPath
    var cloudPath = that.data.cloudPath

    var good_classes = that.data.goods_classes

    var num = that.data.commodity_num

    if (e.detail.value.goods_name == 0) {
      wx.showToast({
        title: '请输入名称',
        icon: 'none',
        duration: 1000
      })
    } else if (e.detail.value.goods_money == 0) {
      wx.showToast({
        title: '请输入价格',
        icon: 'none',
        duration: 1000
      })

    } else if (e.detail.value.content == 0) {
      wx.showToast({
        title: '请输入简介',
        icon: 'none',
        duration: 1000
      })
    } else if (imgPath.length == 0) {
      wx.showToast({
        title: '请添加图片',
        icon: 'none',
        duration: 1000
      })
    }

    else {
      imgPath.forEach((item, i) => {
        wx.getFileInfo({
          filePath: imgPath[i],
          success(res) {
            console.log(res.size)
            console.log(res.digest)
            that.setData({
              cloudPath: cloudPath.push(res.digest)
            })
            console.log(cloudPath)


            console.log(cloudPath[i])
            console.log(imgPath[i])
            var fileID = that.data.fileID
            var db_name = 'goods/' + cloudPath[i]
            wx.cloud.uploadFile({
              cloudPath: db_name, // 上传至云端的路径
              filePath: imgPath[i], // 小程序临时文件路径
              success: res => {
                // 返回文件 ID
                console.log(res.fileID)

                that.setData({
                  fileID: fileID.push(res.fileID)
                })
                console.log(fileID)

                wx.getUserInfo({
                  success(res) {
                    const userInfo = res.userInfo
                    var nickName = userInfo.nickName
                    var avatarUrl = userInfo.avatarUrl
                    console.log("用户信息调取成功")

                    if (fileID.length == imgPath.length) {
                      const db = wx.cloud.database()
                      const todos = db.collection('goods')
                      db.collection('goods').add({
                        // data 字段表示需新增的 JSON 数据
                        data: {
                          goods_name: e.detail.value.goods_name,
                          goods_money: e.detail.value.goods_money,
                          content: e.detail.value.content,
                          img: fileID,
                          goods_classes: good_classes,

                          nickName: nickName,
                          avatarUrl: avatarUrl,

                          num : num,

                        },

                        success(res) {
                          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                          console.log(res)
                          wx.showToast({
                            title: '发布成功',
                            icon: 'success',
                            duration: 1000,
                            success(res) {
                              console.log('成功')

                              setTimeout(function () {
                                wx.reLaunch({
                                  url: '../classify/classify',
                                })
                              }, 1000)
                            }
                          })
                        }
                      })
                    }
                  },
                  fail() {
                    console.log("yonghushibao")
                  }
                  
                })
              }
            })
          }
        })
      })
    }
    console.log('form发生了submit事件，携带数据为：', e.detail.value)

  },



  // 图片预览
  previewImage: function (e) {
    //console.log(this.data.images);
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imgPath
    })
  },


  delete: function (e) {
    var index = e.currentTarget.dataset.index;
    var images = this.data.imgPath;
    images.splice(index, 1);
    this.setData({
      imgPath: images
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      goods_classes: options.id
    })

    var random_no = "";
    for (var i = 0; i < 10; i++) //j位随机数，用以加在时间戳后面。
    {
      random_no += Math.floor(Math.random() * 10);
    }
    random_no = new Date().getTime() + random_no;
    this.setData({
      commodity_num: random_no

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