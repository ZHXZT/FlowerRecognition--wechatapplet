//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        returnImg: undefined,
        returnFileUrl: "",
        isShow: false,
        percent: "10",
    },
    onLoad: function () {
        var that = this;
        app.globalData.callback = function (res) {
            const jsonData = JSON.parse(res.data)
            console.log(jsonData)
            if (jsonData.message.includes("time") && jsonData.message != "time0") {
                that.setData({
                    isShow: true,
                    percent: jsonData.message.split("time")[1] * 20
                })
            } else if (jsonData.message == "output" && jsonData.data.err_message != "size") {
                // var jsonErrMsg = JSON.parse(jsonData.data.err_message)
                wx.showToast({
                    title: "识别成功",
                    icon: "success",
                    duration: 1000
                });
                that.setData({
                    isShow: false,
                    percent: 0
                })
                wx.navigateTo({
                    url: '../result/result',
                    success: function (res) {
                        // 通过eventChannel向被打开页面传送数据
                        res.eventChannel.emit('acceptDataFromOpenerPage', {
                            img: res.tempFilePaths[0],
                            // ke: jsonErrMsg.ke
                            kes: res.data["err_message"]
                        })
                    }
                })
            }
        }
    },
    goToCamera() {
        wx.navigateTo({
            url: '../camera/camera',
        })
    },
    clickImg: function (e) {
        var imgUrl = this.data.returnFileUrl;
        wx.previewImage({
            urls: [imgUrl], //需要预览的图片http链接列表，注意是数组
            // current: '', // 当前显示图片的http链接，默认是第一个
            success: function (res) {},
            fail: function (res) {},
            complete: function (res) {},
        })
    },
    uploadImg: function (e) {
        var that = this
        wx.chooseImage({
            count: 1,
            sourceType: ['album'],
            success(res) {
                // console.log(res)
                const tempFilePath=res.tempFilePaths[0]
                const tempImageBase64 = wx.getFileSystemManager().readFileSync(tempFilePath, "base64")
                const tempImagePrefix = tempFilePath.split(".")[1]
                // console.log(tempImagePrefix)
                // wx.showActionSheet({
                // itemList: ['精准模式', '快速模式'],
                // success(res) {
                // var urlArr = [];
                // urlArr [0]='https://adl.seafishery.com/api/ssd'
                // urlArr [1]='https://adl.seafishery.com/api/upload-img'
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
                        console.log(res,'后台数据')
                        const jsonErrMsg = JSON.stringify(res.data["err_message"])
                        that.setData({
                            isShow: true,
                            mHeight: "1vh",
                            percent: "100"
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
                                    img: tempFilePath,
                                    // kes: jsonErrMsg.ke.split(" "),
                                    kes: jsonData["err_message"],
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
                // }
                // fail(res) {
                // console.log(res.errMsg)
                // }
                // })
            }
        })
    }
})
