// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    img:"",
    alias:"",
    introduction:"",
    shape:"",
    habit:"",
    value:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const eventChannel = this.getOpenerEventChannel()
    const that = this
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      console.log(data.Alias,'ss')
      that.setData({
        name:data.Name,
        img:data.Imgsrc,
        alias:data.Alias,
        introduction:data.Introduction,
        shape:data.Shape,
        habit:data.Habit,
        value:data.Value,
      })
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

  },
})