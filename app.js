App({
	globalData: {
		//自己的服务器网址
		ipw: "wss://adl.seafishery.com/api/socket/web-socket", 
		limit: 0,
		timeout: 10000,
		timeoutObj: null,
		serverTimeoutObj: null,
		callback: function () {},
	},
	onLaunch: function () {
		// this.linkSocket();
	},
	//建立websocket连接
	linkSocket() {
		var that = this
		wx.connectSocket({
			url: that.globalData.ipw,
			header: {
				Cookie: 'gfsessionid=14r0id6145l910ca8r6oz436nw1003hl;'
			},
			success(info) {
				console.log(info)
				that.initEventHandle()
			},
			fail(err) {
				console.log(err)
			}
		})
	},
	//绑定事件
	initEventHandle() {
		var that = this
		wx.onSocketMessage((res) => {
			if (res.data == "heartbeat") {
				that.reset()
				that.start()
			} else {
				that.globalData.callback(res)
			}
		})
		wx.onSocketOpen(() => {
			console.log('WebSocket连接打开')
			that.reset()
			that.start()
		})
		wx.onSocketError((res) => {
			console.log('WebSocket连接打开失败')
			that.reconnect()
		})
		wx.onSocketClose((res) => {
			console.log('WebSocket 已关闭！')
			that.reconnect()
		})
	},

	//重新连接
	reconnect() {
		var that = this;
		if (that.lockReconnect) return;
		that.lockReconnect = true;
		clearTimeout(that.timer)
		if (that.globalData.limit < 10) { //连接10次后不再重新连接
			that.timer = setTimeout(() => {
				that.linkSocket();
				that.lockReconnect = false;
				console.log("次数:" + that.globalData.limit)
			}, 5000); //每隔5秒连接一次
			that.globalData.limit = that.globalData.limit + 1
		}
	},

	//心跳包开始
	reset: function () {
		var that = this;
		clearTimeout(that.globalData.timeoutObj);
		clearTimeout(that.globalData.serverTimeoutObj);
		return that;
	},

	start: function () {
		var that = this;
		that.globalData.timeoutObj = setTimeout(() => {
			that.globalData.serverTimeoutObj = setTimeout(() => {
				wx.closeSocket();
			}, that.globalData.timeout);
		}, that.globalData.timeout);
	},
	//心跳包结束
})