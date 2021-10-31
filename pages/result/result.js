// const { data } = require("./flower_detail.js")

// pages/result/result.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        img2:"",
        name:"",
        img1:"",
        alias:"",
        introduction:"",
        shape:"",
        habit:"",

        value:"",
        list: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        var json = require("./flower_detail.js")
        console.log(json,'json')
        const eventChannel = this.getOpenerEventChannel()
        const that = this
        eventChannel.on('acceptDataFromOpenerPage', function (data) {
            var tmp = []
            for (let index = 0; index < json.data.length; index++) {
                if (index == data.kes) {
                    var flower_name =json.data[index].name
                    var flower_img = json.data[index].img
                    var flower_alias= json.data[index].alias
                    var flower_introduction= json.data[index].introduction
                    var flower_shape= json.data[index].shape
                    var flower_habit= json.data[index].habit
                    var flower_value= json.data[index].value

                }
            }
            
            // for (let index = 0; index < json.data.length; index++) {
            // const element = json.data[index];
            // if (data.kes && data.kes.includes(element.code.toLocaleLowerCase())) {
            // tmp.push(element)
            // }
            // }
            that.setData({
                img1: data.img,
                img2:flower_img,
                name:flower_name,

                alias:flower_alias,
                introduction:flower_introduction,
                shape:flower_shape,
                habit:flower_habit,
                value:flower_value,

                list: tmp
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

    gotointroduce () {
        const N = this.data.name
        const url = this.data.img2
        const A = this.data.alias
        const I = this.data.introduction
        const S = this.data.shape
        const H = this.data.habit
        const V = this.data.value
        wx.navigateTo({
            url: '../introduce/introduce',
            success: function (res) {
                // 通过eventChannel向被打开页面传送数据
                res.eventChannel.emit('acceptDataFromOpenerPage', {
                    Imgsrc:url,
                    Name:N,
                    Alias:A,
                    Introduction:I,
                    Shape:S,
                    Habit:H,
                    Value:V,
                })
            }
        })
    }
    // gotobaidu() {
    //     let name=this.data.name;
    //     wx.navigateTo({
    //         url: '../baidubaike/baidubaike?name=' +name
    //     })
    // },

    // onClickMore(e) {
    //     // e.currentTarget.id
    //     const that = this
    //     wx.navigateTo({
    //         url: '../introduce/introduce',
    //         success: function (res) {
    //             // 通过eventChannel向被打开页面传送数据
    //             res.eventChannel.emit('acceptDataFromOpenerPage', e.currentTarget.id)
    //             // res.eventChannel.emit('acceptDataFromOpenerPage', that.data.list[e.currentTarget.id])
    //         }
    //     })
    // }
})
