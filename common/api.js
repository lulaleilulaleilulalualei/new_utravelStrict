/*
  通用方法
*/
import Vue from 'vue'
const config = require('../config.js')

class Api { //数据请求简单封装

  static warnNotice(title) {
	  // #ifdef MP-WEIXIN
	  uni.getSystemInfo({
		  success: (res) => {
			let sysInfoVer = res.SDKVersion
			if (sysInfoVer.split('.')[0] <= 1) {
			  if (sysInfoVer.split('.')[1] >= 9) {
			    uni.showToast({
			      title: title,
			      icon: 'none'
			    })
			  } else {
			    uni.showToast({
			      title: title,
			      icon: 'loading'
			    })
			  }
			} else {
			  uni.showToast({
			    title: title,
			    icon: 'none'
			  })
			}
		  }
	  })
	// #endif
	// #ifndef MP-WEIXIN
		uni.showToast({
		  title: title,
		  icon: 'none'
		})
	// #endif
	
  }
	
  static ajax(dataObj) {
    const promise = new Promise((resolve, reject, defaults) => {
		if(Vue.prototype.$userInfo) {
			if(!dataObj.data) dataObj.data = {}
			dataObj.data.token = Vue.prototype.$userInfo.token
			// dataObj.data.token = '3b383cb74edb3e9dfca157d5c518386f'
		}
		uni.request({
			url: dataObj.url,
			method: dataObj.method || 'GET',
			header: dataObj.header || {},
			data: dataObj.data,
			success: resolve,
			fail: reject,
			complete: defaults
		})
    })
    return promise
  }

  static interleave(str) {//回车空格替换
    return str.replace(/(\r\n)|(\n)/g, '\n')
  }
  
  static formatTime(time) {
	  var a = time.split(' ')[0]
	  return a.replace(/-/g, '/')
  }

  static userLogin(callBack) { //wx.canIUse('button.open-type.getUserInfo') botton授权兼容处理
    const $this = this
    // 获取用户信息
    uni.login({
      timeout: 10000,
      success: (_res) => {
        uni.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              uni.getUserInfo({
                lang: 'zh_CN',
                success: res => {
                  $this.ajax({
                    url: config.login,
                    method: 'POST',
                    data: {
						code: _res.code,
						encryptedData: res.encryptedData,
						iv: res.iv
					  }
                  })
                    .then((resolve) => {
                      if (resolve.statusCode == 200 && resolve.data.code == 0) {
                        Vue.prototype.$userInfo = resolve.data.data
                        typeof callBack == 'function' && callBack('1')
                      }else {
                        $this.warnNotice(resolve.data.message)
                      }
                    })
                    .catch((err) => {
                      $this.warnNotice('登录失败，请重新登录')
                    })
                },
                fail: () => {
                  $this.warnNotice('获取用户信息失败，请重新登录')
                }
              })
            } else if (res.authSetting['scope.userInfo'] !== undefined && !res.authSetting['scope.userInfo']) { //已拒绝授权
              typeof callBack == 'function' && callBack('0')
            }else { //未授权
              typeof callBack == 'function' && callBack()
            }
          },
          fail: () => {
            $this.warnNotice('登录异常，请重新登录')
          }
        })
      },
      fail: () => {
        $this.warnNotice('登录异常，请重新登录')
      }
    })
  }

  static trim (strs){
    if (Object.prototype.toString.call(strs) === "[object String]") {
      return strs.replace(/(^\s*)|(\s*$)/g, '');
    }
  }

  static countDownTime(afterDate,callback) {
    let timer = setInterval(() => {
      let newDate = new Date().getTime(),
        times = Math.floor((afterDate - newDate)/1000)

      if (times <= 0) {
        clearInterval(timer)
        return
      }

      let day = Math.floor(Math.floor(times / 86400)),
        hour = day*24 + Math.floor(times % 86400 / 3600),
        minute = Math.floor((times % 3600) / 60) ,
        second = times % 60

      if (hour < 10) hour = '0' + hour
      if (minute < 10) minute = '0' + minute
      if (second < 10) second = '0' + second

      typeof callback == 'function' && callback(hour, minute, second)
    },1000)
  }

  static countDown(callback) {
    var downObj = {
      maxTime: 60,
      countTxt: '',
      status: false,
      timer: '',
      downTime: function () {
        var $this = this
        if (this.maxTime > 1) {
          this.maxTime--
          this.countTxt = this.maxTime + '秒后获取'
          this.status = true
          typeof callback == 'function' && callback($this.countTxt, $this.status)
          this.timer = setTimeout(function () {
            $this.downTime()
          }, 1000)
        } else {
          this.status = false
          this.timer = setTimeout(function () {
            typeof callback == 'function' && callback('获取验证码', $this.status)
          }, 1000)
        }
      }
    }
    downObj.downTime()
  }

  static pointProblem(arg1, arg2, type) {
    if (arg1 == '') arg1 = 0
    if (arg2 == '') arg2 = 0
    if(type == 'add') {
      let r1, r2, m;
      try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
      try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
      m = Math.pow(10, Math.max(r1, r2))
      return (arg1 * m + arg2 * m) / m 
    }
    if(type == 'sub') {
      var r1, r2, m, n;
      try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
      try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
      m = Math.pow(10, Math.max(r1, r2));
      n = (r1 >= r2) ? r1 : r2;
      return ((arg1 * m - arg2 * m) / m).toFixed(n);
    }
    if(type == 'mul') {
      let m = 0, s1 = '', s2 = '';
      if (arg1 && arg1 != null)
        s1 = arg1.toString();

      if (arg2 && arg2 != null)
        s2 = arg2.toString();

      try { m += s1.split('.')[1].length } catch (e) { }
      try { m += s2.split('.')[1].length } catch (e) { }

      return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
    }
  }
  
  static inputTest(val, type) {
	  var telReg = /^\s*1[3456789]\d{9}$/,
		codeReg = /^\d{4}$/,
		cardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
		mailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
		
		if(type == 'tel') {
			if(telReg.test(val)) {
				return true
			}else {
				this.warnNotice('请输入正确的手机号码')
				return false
			}
		}else if(type == 'card') {
			if(cardReg.test(val)) {
				return true
			}else {
				this.warnNotice('请输入正确的身份证号码')
				return false
			}
		}else if(type == 'mail') {
			if(mailReg.test(val)) {
				return true
			}else {
				this.warnNotice('请输入正确的邮箱')
				return false
			}
		}else if(type == 'code') {
			if(codeReg.test(val)) {
				return true
			}else {
				this.warnNotice('请输入正确位数的验证码')
				return false
			}
		}
	  
  }
  
}

module.exports = Api