<template>
	<view class="applyInvoice">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">发票申请</block></cu-custom>
		<view class="showInvoice">
		  <text>发票形式</text>
		  <view class="showInvoiceType">
		    <view :class="['itemInvoiceType', {activeShow: item.type == changeInvoiceType}]" 
		          v-for="(item, idx) in invoiceType"
		          :key="idx"
		          @tap="cutInvoiceType(idx)">
		      <view>{{item.name}}</view>
		      <text>{{item.textIntro}}</text>
		    </view>
		  </view>
		
		  <view class="paperInvoice" v-if="changeInvoiceType !== 0">
		    <view class="itemInvoiceInfo">
		      <text>发票抬头</text>
		      <input type="text" placeholder='请填写发票抬头' :value="invoiceTitle"  @confirm="getInvoiceTitle" @blur="getInvoiceTitle" placeholder-style='color: #909399;'></input>
		      <view class="getWxInvoice" @tap="getWxInvoice">获取发票</view>
		      <!-- <button class="getWxInvoice" v-if="isDefaultAgree == 2" open-type="openSetting">获取授权</button> -->
		      <!-- <button class="getWxInvoice" v-if="isDefaultAgree == 3" bindtap="toOpenSetting">获取授权</button> -->
		    </view>
		    <view class="itemInvoiceInfo">
		      <text>纳税人识别号</text>
		      <input type="text" placeholder='请填写纳税人识别号' :value="invoiceCode" @confirm="getInvoiceCode" @blur="getInvoiceCode" placeholder-style='color: #909399;'></input>
		    </view>
		    <view class="itemInvoiceInfo">
		      <text>发票明细</text>
		      <view>旅游服务费</view>
		    </view>
		    <view class="itemInvoiceInfo" v-if="changeInvoiceType == 1">
		      <text>E-mail</text>
		      <input placeholder="电子发票将发送至此邮箱" @confirm="getEmailUrl" @blur="getEmailUrl" placeholder-style="color: #909399;;" type="text"></input>
		    </view>
		    <view class="itemInvoiceInfo" v-if="changeInvoiceType == 2">
		      <text>配送费用</text>
		      <view class="invoicePrice">¥10</view>
		    </view>
		    <view class="itemInvoiceAddressInfo" v-if="changeInvoiceType == 2">
		      <text>配送地址</text>
		      <view class="toShowSendAddress" @tap="jumpToSendAddress">
		        <view class="sendAddressInfo">{{addressObj? addressObj.userName: ''}}<text>{{addressObj? addressObj.userPhone: '请填写配送地址'}}</text></view>
		        <view class="sendDetailAddress">{{addressObj? addressObj.address: ''}}</view>
		      </view>
		    </view>
		  </view>
		
		</view>
		<view class="getInvoiceBtn" @tap="bindGetInvoice"><text>{{btnText}}</text></view>
		<view class="getInvoiceIntro">{{invoiceNotice}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				invoiceType: [
				  {
				    name: '不需要发票',
				    textIntro: '',
					type: 0,
					intro: '发票由 湖南省同程亲和力旅游国际旅行社有限公司 开具，发票金额不含优惠券支付部分。',
				  },
				  {
				    name: '电子发票',
				    textIntro: '免费',
					type: 1,
					intro: '发票由 湖南省同程亲和力旅游国际旅行社有限公司 开具，发票金额不含优惠券支付部分。电子发票将在游玩结束后1个工作日内发送至您的邮箱。',
				  },
				  {
				    name: '纸质发票',
				    textIntro: '快递￥10',
					type: 2,
					intro: '发票由 湖南省同程亲和力旅游国际旅行社有限公司 开具，发票金额不含优惠券或礼品卡支付部分。纸质发票预计将于游玩结束后3-7个工作日内以快递方式送达。',
				  }
				],
				changeInvoiceType: 0,//0代表不开，1代表电子，2代表纸质
				btnText: '保存',
				invoiceNotice: '',
				
				invoiceTitle: '',
				invoiceCode: '',
				// isDefaultAgree: 1,// 状态1主动获取授权，2为拒绝授权状态，3为显示不支持open-type="openSetting"情况
				emailUrl: '', //email地址
				address: null,//配送地址
			}
		},
		onLoad() {
			const $this = this
			uni.getSetting({
			  success: res => {
			    if (res.authSetting['scope.invoiceTitle']) {
			      uni.chooseInvoiceTitle({
					  sucess: (res) => {
						  $this.invoiceTitle = res.title
						  $this.invoiceCode = res.taxNumber
					  }
				  })
			    }
			  }
			})
		},
		methods: {
			cutInvoiceType: function (idx) {
			  this.invoiceType.map((v, i) => {
				if(idx == i) {
					this.changeInvoiceType  = v.type
					this.invoiceNotice = v.intro
					if(v.type == 0) {
						this.btnText = '保存'
					}else {
						this.btnText = '索取'
					}
				}
			  })
			},
			getInvoiceTitle: function(e) {
			  this.invoiceTitle = this.$api.trim(e.detail.value)
			},
			getInvoiceCode: function(e) {
			  this.invoiceCode = this.$api.trim(e.detail.value)
			},
			getEmailUrl: function (e) {
			  this.emailUrl = this.$api.trim(e.detail.value)
			},
			getWxInvoice: function() {
			  const $this = this
			  uni.authorize({
			    scope: 'scope.invoiceTitle',
			    success: () => {
			      uni.chooseInvoiceTitle({
			        success: (res) => {
					  $this.invoiceTitle = res.title
					  $this.invoiceCode = res.taxNumber
			        },
			        fail: () => {
			          $this.$api.warnNotice('获取发票抬头失败,请重新获取')
			        }
			      })
			    },
			    fail: () => {
			      $this.$api.warnNotice('您已拒绝获取发票授权')
			    }
			  })
			},
			jumpToSendAddress: function() {
			  uni.navigateTo({
			    url: `/pages/addressList/addressList`,
			  })
			},
			bindGetInvoice: function() {
			      let raisedJson = {
			        title: this.data.invoiceTitle,
			        taxNumber: this.data.invoiceCode
			      }
			  
			  if (this.invoiceTitle != '') {
			    if (this.invoiceCode != '') {
				  if (this.changeInvoiceType == 1) {
					  //索取电子发票
					  if (this.$api.inputTest(this.emailUrl, 'mail')) {
					    this.applyInvoiceInfo(raisedJson)
					  }
				  }else if(this.changeInvoiceType == 2) {
					  if (this.addressObj) {
					    //索取纸质发票
					    this.applyInvoiceInfo(raisedJson)
					  }else {
					    this.$api.warnNotice('请填写配送地址')
					  }
				  }
			    }else {
			      this.$api.warnNotice('请填写纳税人识别号')
			    }
			  }else  {
			    this.$api.warnNotice('请填写发票抬头')
			  }
			},
			applyInvoiceInfo() { //提交
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.applyInvoice {
	  width: auto;
	  height: 100%;
	  background: #F1F1F5;
	  padding: 30upx 20upx;
	}
	.showInvoice {
	  width: auto;
	  height: auto;
	  padding: 30upx 20upx 0;
	  background: #FFFFFF;
	  border-radius: 8upx;
	  margin-bottom: 30upx;
	  overflow: hidden;
	}
	.showInvoice>text {
	  display: block;
	  font-size: 28upx;
	  color: #222222;
	  margin-bottom: 30upx; 
	}
	.showInvoiceType {
	  display: flex;
	  padding-bottom: 30upx
	}
	.itemInvoiceType {
	  width: 206upx;
	  height: 96upx;
	  border: 2upx solid #9F9F9F;
	  border-radius: 8upx;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  position: relative;
	  transition: all 0.2s;
	}
	.itemInvoiceType:not(:last-child) {
	  margin-right: 20upx;
	}
	.itemInvoiceType>view {
	  font-size: 28upx;
	  color: #222222;
	  transition: all 0.2s;
	}
	.itemInvoiceType>text {
	  display: block;
	  font-size: 24upx;
	  color: #A7A7A7;
	}
	.itemInvoiceType.activeShow {
	  border-color: #FFDA4C;
	}
	.itemInvoiceType.activeShow>view {
	  color: #FFDA4C;
	}
	
	.itemInvoiceInfo {
	  width: auto;
	  height: 100upx;
	  border-top: 1px solid #EFEFEF;
	  display: flex;
	  align-items: center;
	}
	.itemInvoiceInfo>text, .itemInvoiceAddressInfo>text {
	  display: block;
	  font-size: 28upx;
	  color: #222222;
	  width: 168upx;
	  margin-right: 40upx;
	}
	.itemInvoiceInfo>input {
	  flex: 1;
	  height: 40upx;
	  font-size: 28upx;
	  color: #222222;
	}
	.itemInvoiceInfo>view:not(.getWxInvoice) {
	  flex: 1;
	  font-size: 28upx;
	  color: #222222;
	}
	.itemInvoiceInfo>view.invoicePrice {
	  font-size: 28upx;
	  color: #F7372C;
	}
	.itemInvoiceAddressInfo {
	  width: auto;
	  height: auto;
	  padding: 30upx 0;
	  border-top: 1px solid #EFEFEF;
	  display: flex;
	  align-items: center;
	}
	.itemInvoiceAddressInfo>.toShowSendAddress .sendAddressInfo {
	  font-size: 32upx;
	  color: #222222;
	  display: flex;
	}
	.itemInvoiceAddressInfo>.toShowSendAddress .sendAddressInfo>text {
	  display: block;
	  font-size: 28upx;
	  color: #B0B0B0;
	  margin-left: 10upx;
	}
	.itemInvoiceAddressInfo>.toShowSendAddress .sendDetailAddress {
	  font-size: 28upx;
	  color: #222222;
	}
	.toShowSendAddress {
	  flex: 1;
	}
	.getWxInvoice {
	  padding: 0 10upx;
	  height: 50upx;
	  width: 140upx;
	  text-align: center;
	  line-height: 50upx;
	  font-size: 28upx;
	  color: #222222;
	  background: #FFDA4C;
	  border-radius: 8upx;
	  margin-left: 10upx;
	}
	
	
	.getInvoiceBtn {
	  width: auto;
	  height: 88upx;
	  background: #FFDA4C;
	  border-radius: 4upx;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  font-size: 32upx;
	  color: #000000;
	  margin-bottom: 30upx;
	}
	.getInvoiceIntro {
	  width: auto;
	  height: auto;
	  font-size: 28upx;
	  color: #000000;
	}
</style>
