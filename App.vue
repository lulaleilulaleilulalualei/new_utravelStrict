<script>
	import Vue from 'vue'
	
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					if(wx.getMenuButtonBoundingClientRect) {
						let custom = wx.getMenuButtonBoundingClientRect()
						Vue.prototype.Custom = custom;
						Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					}else {
						Vue.prototype.Custom = wx.getMenuButtonBoundingClientRect() || null
						Vue.prototype.CustomBar = e.statusBarHeight + ((e.system.indexOf('iOS') != -1)? 44: 48)
					}
					// #endif		
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
		},
		onShow: function(res) {
			Vue.prototype.$isSharePage = false //默认非分享
			// console.log('App Show')
			if (res.scene == 1008 || res.scene == 1007) {
			  // Vue.prototype.$isSharePage = true
			} else if (res.scene == 1012 || res.scene == 1013 || res.scene == 1047) { //长按图片识别二维码 手机相册选取二维码 扫码小程序码
			  // this.globalData.isSharePage = true
			}else if (res.scene == 1058) { //公众号文章
				// Vue.prototype.$isSharePage = true
			}
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "common/common.css";
</style>
