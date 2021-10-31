// pages/camera/camera.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isShow: false,
        percent: "0",
        mHeight: "4vh"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    takePhoto() {
        const that = this
        const ctx = wx.createCameraContext()
        ctx.takePhoto({
            quality: 'high',
            success: res => {
                const imgPath = res.tempImagePath
                const tempImageBase64 = wx.getFileSystemManager().readFileSync(res.tempImagePath, "base64")
                const tempImagePrefix = res.tempImagePath.split(".")[1]
                wx.showLoading({
                    title: "识别中"
                })
                that.setData({
                    isShow: true,
                    mHeight: "1vh",
                    percent: "80"
                })
                wx.request({
                    url: 'https://adl.seafishery.com/api/flour', //仅为示例，非真实的接口地址
                    // url: urlArr[res.tapIndex],
                    method: "POST",
                    data: {
                        'img-type': tempImagePrefix,
                        'img': tempImageBase64
                    },
                    success(res) {
                        const jsonData = res.data
                        // const jsonErrMsg = JSON.parse(res.data["err_message"])
                        // console.log(jsonErrMsg)
                        that.setData({
                            isShow: true,
                            mHeight: "1vh",
                            percent: "100",
                        })
                        wx.hideLoading()
                        wx.showToast({
                            title: "识别完成",
                            icon: "success",
                            duration: 1000
                        });
                        wx.navigateTo({
                            url: '../result/result',
                            success: function (res) {
                                // 通过eventChannel向被打开页面传送数据
                                res.eventChannel.emit('acceptDataFromOpenerPage', {
                                    // img: res.tempFilePaths[0],
                                    img: imgPath,
                                    kes: jsonData["err_message"]
                                })
                            }
                        })
                        that.setData({
                            isShow: false,
                            mHeight: "4vh",
                            percent: 0
                        })
                    }
                })
            }
        })
    },

    // goToResult(data) {
    //     wx.navigateTo({
    //         url: '../result/result',
    //         success: function (res) {
    //             // 通过eventChannel向被打开页面传送数据
    //             res.eventChannel.emit('acceptDataFromOpenerPage', data)
    //         }
    //     })
    // }
})
