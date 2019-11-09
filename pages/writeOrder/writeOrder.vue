<template>
	<view class="writeOrder" :style="[{minHeight: pageMinH}]">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">填写订单</block></cu-custom>
		<view class="order-content">
			<view class="pro-info-box">
				<view class="pro-info-title">长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长长沙长沙长沙</view>
				<view class="pro-batch-time">班期时间：2019-08-30出发2019-09-02返程</view>
				<view class="pro-buy-num">购买数量：成人x1 | 房间x1</view>
			</view>
			<!-- 出行人信息 -->
			<view class="line-out-info">
				<view class="line-order-title">出行信息</view>
				<view class="line-order-user">
					<view class="line-order-user-title">出行人</view>
					<view class="line-order-user-list" @tap="toJumpTraveler">
						<view class="line-order-user-txt">
							<view class="show-select-tvl-list">
								<text class="to-notice-need-num">需添加2位出行人</text>
								<view class="item-select-tvl" v-for="(item, idx) in 3" :key="idx">
									<text class="item-select-tvl-num">出行人{{idx+1}}</text>
									<view class="item-select-tvl-info">思密达 430101011015021236</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 保险选择 -->
			<view class="pro-insurance-box">
				<view class="pro-insurance-box-top">
					<view class="pro-insurance-icon"><image src="/static/insurance_icon.png" mode=""></image></view>
					<view class="pro-insurance-scale">80%的人选择保险，保障出行安全</view>
				</view>
				<view class="pro-insurance-list">
					<view class="item-pro-insurance" v-for="(item, idx) in insuranceArr" :key="idx" @tap="toSelectInsurance(idx)">
						<view class="item-pro-insurance-info">
							<view class="item-pro-ins-title">{{item.name}}</view>
							<view class="item-pro-ins-funtion">{{item.func}}</view>
						</view>
						<view class="item-pro-ins-opt">
							<view class="item-pro-ins-price">
								<view class="item-pro-ins-price-txt">¥ 178</view>
								<view class="item-pro-ins-num">x3份</view>
							</view>
							<view :class="['item-pro-ins-to-select', {'select-pro-ins-active': isInsType == item.type}]">
								<text v-if="isInsType == item.type" class="cuIcon-check lg"></text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 联系人信息 -->
			<view class="order-contact-info">
				<view class="line-order-title">联系人信息</view>
				<view class="item-contact-info">
					<view class="item-contact-info-title">姓名</view>
					<view class="item-contact-info-inp">
						<input type="text" value="" placeholder="用于取得联系" @confirm="toGetName" @blur="toGetName" placeholder-style="color: #909399;" />
					</view>
				</view>
				<view class="item-contact-info">
					<view class="item-contact-info-title">手机号</view>
					<view class="item-contact-info-inp">
						<input type="number" value="" placeholder="接收确认信息" @confirm="toGetTel" @blur="toGetTel" placeholder-style="color: #909399;" />
					</view>
				</view>
				<view class="item-contact-info">
					<view class="item-contact-info-title">验证码</view>
					<view class="item-contact-info-inp">
						<input type="number" value="" @confirm="toGetCode" @blur="toGetCode" placeholder-style="color: #909399;" />
						<view :class="['to-send-tel-code', {'send-active-code': isSendCode}]" @tap="toSendTelCode"><text>{{sendCodeTxt}}</text></view>
					</view>
				</view>
				<view class="item-contact-info">
					<view class="item-contact-info-title">邮箱</view>
					<view class="item-contact-info-inp">
						<input type="text" value="" @confirm="toGetMail" @blur="toGetMail" placeholder="用于接收合同" placeholder-style="color: #909399;" />
					</view>
				</view>
				<view class="item-contact-info">
					<view class="item-contact-info-title">备注</view>
					<view class="item-contact-info-inp">
						<input type="text" value="" @confirm="toGetRemark" @blur="toGetRemark" placeholder="如有特殊需要，请在这留言" placeholder-style="color: #909399;" />
					</view>
				</view>
			</view>
			<!-- 超级会员 -->
			<view class="order-super-member" @tap="toOptBuyMember">
				<view class="order-super-member-box">
					<view class="order-super-member-icon">
						<view class="order-super-member-icon-img"><image src="/static/member_icon.png" mode=""></image></view>
						<view class="order-super-member-icon-title">超级会员</view>
					</view>
					<view class="order-super-member-desc">开通<text>超级会员¥ 369</text>，本单再省¥296元</view>
				</view>
				<view :class="['order-super-member-select', {'to-buy-select-member': isSelectBuyMember}]">
					<text v-if="isSelectBuyMember" class="cuIcon-check lg"></text>
				</view>
			</view>
			<!-- 优惠券 -->
			<view class="line-coupon-box" @tap="toJumpCoupon">
				<view class="line-coupon-title">优惠券</view>
				<view class="line-can-use-coupon">
					<text>暂无可用券</text>
				</view>
			</view>
			<!-- 发票 -->
			<view class="line-invoice-box" @tap="toGetInvoice">
				<view class="line-invoice-title">发票</view>
				<view class="line-invoice-type">
					<text>不需要</text>
				</view>
			</view>
			<!-- 协议 -->
			<view class="ruleNotice" @click="bindAgreeRule">
				<view :class="['ruleNoticeIcon', {toSelectActiveRule: toSelectRule}]">
					<text v-if="toSelectRule" class="cuIcon-check lg"></text>
				</view>
				<view class="ruleNoticeText">
					<view class="ruleNoticeTextBox">
						为支持绿色环保，我同意默认电子合同的有效性，无需再次签署纸质合同。点击去支付表示已阅读并同意
						<text @click.stop="jumpToUtravelService">《优旅家严选平台服务协议》</text>
						<text @click.stop="jumpToSuccurity">《旅游安全须知》</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部操作 -->
		<view class="write-order-bottom">
			<view class="write-order-bottom-left">
				<view class="wirte-order-allprice">¥ 447.00</view>
				<view class="to-look-order-detail" @tap="toShowCostDetail"><text>明细</text></view>
			</view>
			<view class="write-order-bottom-right">
				<view class="write-order-consult">
					<view class="write-order-consult-icon"><image src="/static/consult_icon.png" mode=""></image></view>
					<text>咨询</text>
					<button class="serviceBtn" open-type="contact"></button>
				</view>
				<view class="to-apply-order" @tap="toJumpOrderDetail">提交订单</view>
			</view>
		</view>
		
		<costDetail v-if="isShowCostDetail" @toCloseDetailBox="toCloseDetailBox"></costDetail>
		<!-- 底部顶高 -->
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	import costDetail from './costDetail.vue'
	
	export default {
		data() {
			return {
				insuranceArr: [{
					name: '中国平安中国平安中国平安中国平安中',
					func: '紧急救援、医疗救助',
					type: 1
				}, {
					name: '中国平安中国平安中国平安中国平安中',
					func: '紧急救援、医疗救助',
					type: 2
				}],
				isInsType: null, //是否选择保险类型
				
				userName: '',
				userTel: '',
				userCode: '',
				userMail: '',
				userRemark: '',
				isSendCode: false, //是否发送验证码
				sendCodeTxt: '发送验证码', //
				isSelectBuyMember: false, //是否选择购买会员卡
				toSelectRule: true, //优旅协议
				isShowCostDetail: false, //是否查看消费明细
			}
		},
		components: {costDetail},
		computed: {
			pageMinH() {
				let sys = uni.getSystemInfoSync()
				return sys.windowHeight + 'px'
			}
		},
		onUnload() {
			
		},
		methods: {
			toJumpTraveler() { //跳转到选择出行人
				uni.navigateTo({
					url: '/pages/selectTraveler/selectTraveler'
				})
			},
			toSelectInsurance(idx) { //选择保险
				this.insuranceArr.map((v, i) => {
					if(i == idx) {
						if(v.type == this.isInsType) {
							this.isInsType = null
						}else {
							this.isInsType = v.type
						}
					}
				})
			},
			toGetName(e) { //获取联系人姓名
				this.userName = this.$api.trim(e.detail.value)
			},
			toGetTel(e) { //获取联系人电话
				this.userTel = this.$api.trim(e.detail.value)
			},
			toGetCode(e) { //获取联系人验证码
				this.userCode = this.$api.trim(e.detail.value)
			},
			toGetMail(e) { //获取联系人邮箱
				this.userMail = this.$api.trim(e.detail.value)
			},
			toGetRemark(e) { //获取用户备注
				this.userRemark = this.$api.trim(e.detail.value)
			},
			toSendTelCode() { //发送验证码
				if(!this.isSendCode) {
					this.$api.countDown((txt, status) => {
						this.isSendCode = status
						this.sendCodeTxt = txt
					})
				}
			},
			toOptBuyMember() { //是否购买会员卡
				this.isSelectBuyMember = !this.isSelectBuyMember
			},
			toJumpCoupon() { //到优惠券页面
				uni.navigateTo({
					url: '/pages/discountsCoupon/discountsCoupon'
				})
			},
			toGetInvoice() { //选择是否需要发票
				uni.navigateTo({
					url: '/pages/applyInvoice/applyInvoice'
				})
			},
			bindAgreeRule(e) { //是否选择支持协议
				this.toSelectRule = !this.toSelectRule
			},
			jumpToUtravelService() { //优旅家平台协议
				uni.navigateTo({
					url: '/pages/utravelServiceProtocol/utravelServiceProtocol'
				})
			},
			jumpToSuccurity() {//安全须知
				uni.navigateTo({
					url: '/pages/succurityNotice/succurityNotice'
				})
			},
			toShowCostDetail() {
				this.isShowCostDetail = !this.isShowCostDetail
			},
			toCloseDetailBox(val) {
				this.isShowCostDetail = val
			},
			toJumpOrderDetail() {
				uni.navigateTo({
					url: '/pages/lineOrderDetail/lineOrderDetail'
				})
			},
			toSubmitOrder() {
				if(this.userName != '') {
					if(this.$api.inputTest(this.userTel, 'tel')) {
						if(this.userCode != '') {
							uni.showLoading({
							  title: '调用支付中...',
							  mask: true
							})
							this.toPay()
						}else {
							this.$api.warnNotice('您有验证码未填')
						}
					}
				}else {
					this.$api.warnNotice('您有联系人姓名未填写')
				}
			},
			toPay() {
				const $this = this
				this.$api.ajax({
					url: '',
					method: "POST",
					data: {
						
					}
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						uni.hideLoading();
						uni.requestPayment({
						  'timeStamp': res.data.data.timeStamp || res.data.data.timestamp,
						  'nonceStr': res.data.data.nonceStr,
						  'package': res.data.data.package,
						  'signType': res.data.data.signType,
						  'paySign': res.data.data.paySign,
						  success: (r) => {
						    if (r.errMsg == 'requestPayment:ok') {
						    uni.showToast({
						        title: '支付成功',
						        icon: 'success',
						        success: () => {
						          setTimeout(() => {
									// $this.toJumpOrderList(true)
						            uni.navigateTo({
						            	// url: `/pages/orderDetail/orderDetail?id=${res.data.data.order_id}`
						            })
						          }, 1500)
						        }
						      })
						    }
						  },
						  fail: (err) => {
						    this.$api.warnNotice('支付失败')
						  }
						})
					}else {
						uni.hideLoading();
						this.$api.warnNotice(res.data.message)
					}
				})
				.catch(() => {
					uni.hideLoading();
					this.$api.warnNotice('提交失败')
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.writeOrder {
		width: 100%;
		background-color: #F6F9FA;
		.order-content {
			padding: 30upx 30upx 60upx;
		}
	}
	.pro-info-box {
		padding: 20upx;
		background-color: $text-color;
		border-radius: 20upx;
		margin-bottom: 20upx;
		.pro-info-title {
			font-size: 28upx;
			font-weight: 600;
			color: $text-main-black;
			margin-bottom: 20upx;
			@extend .ellipse2;
		}
		.pro-batch-time {
			font-size: 24upx;
			color: $text-main-black;
			margin-bottom: 10upx;
		}
		.pro-buy-num {
			font-size: 24upx;
			color: $text-main-black;
		}
	}
	.line-order-title {
		font-size: 32upx;
		color: $text-main-black;
		margin-bottom: 20upx;
		font-weight: 600;
	}
	.line-out-info {
		padding: 20upx;
		background-color: $text-color;
		border-radius: 20upx;
		margin-bottom: 20upx;
		.line-order-user {
			display: flex;
			.line-order-user-title {
				font-size: 28upx;
				color: $text-main-black;
				margin-right: 60upx;
			}	
		}
		.line-order-user-list {
			flex: 1;
			overflow: hidden;
			.line-order-user-txt {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				
				&:after {
					content: '';
					display: block;
					width: 12upx;
					height: 12upx;
					border: 1px solid $text-blue;
					border-left-color: transparent;
					border-top-color: transparent;
					transform: rotate(-45deg);
					position: relative;
					left: -4upx;
					margin-left: 16upx;
				}
				.show-select-tvl-list {
					flex: 1;
					height: auto;
					.to-notice-need-num {
						display: inline-block;
						font-size: 28upx;
						color: $text-grey;
					}
					.item-select-tvl {
						width: 100%;
						height: auto;
						padding-top: 20upx;
						&:not(:last-child) {
							padding-bottom: 20upx;
							border-bottom: 1px solid $border-color;
						}
						.item-select-tvl-num {
							display: inline-block;
							font-size: 20upx;
							color: $text-grey;
							margin-bottom: 10upx;
						}
						.item-select-tvl-info {
							font-size: 28upx;
							color: $text-second-black;
						}
					}
				}
			}
		}
	}
	.pro-insurance-box {
		background: $text-color;
		border-radius: 20upx;
		margin-bottom: 20upx;
		.pro-insurance-box-top {
			background: #FFF4C7;
			width: 100%;
			height: 86upx;
			padding: 0 20upx;
			display: flex;
			align-items: center;
			.pro-insurance-icon {
				width: 40upx;
				height: 48upx;
				margin-right: 20upx;
			}
			.pro-insurance-scale {
				font-size: 32upx;
				color: $text-second-black;
				font-weight: 800;
			}
		}
		.pro-insurance-list {
			padding: 0 20upx;
			.item-pro-insurance {
				padding: 20upx 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				&:not(:last-child) {
					border-bottom: 1px solid $border-color;
				}
				.item-pro-insurance-info {
					width: 400upx;
					height: auto;
					.item-pro-ins-title {
						font-size: 28upx;
						color: $text-main-black;
						margin-bottom: 10upx;
					}
					.item-pro-ins-funtion {
						font-size: 24upx;
						color: $text-grey;
					}
				}
				.item-pro-ins-opt {
					display: flex;
					align-items: center;
					.item-pro-ins-price {
						font-size: 28upx;
						font-weight: 700;
						margin-right: 20upx;
						display: flex;
						.item-pro-ins-price-txt {
							color: $text-red;
						}
						.item-pro-ins-num {
							color: $text-main-black;
						}
					}
					.item-pro-ins-to-select {
						width: 36upx;
						height: 36upx;
						border: 1px solid #D8DCE6;
					}
					.select-pro-ins-active {
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 28upx;
						color: $text-main-black;
						font-weight: bold;
						border-color: transparent;
						background-color: $main-color;
					}
				}
			}
		}
	}
	
	.order-contact-info {
		background: $text-color;
		padding: 20upx 20upx 0;
		border-radius: 20upx;
		margin-bottom: 20upx;
		.line-order-title {
			margin: 0;
		}
		.item-contact-info {
			display: flex;
			align-items: center;
			width: 100%;
			height: 80upx;
			&:not(:last-child) {
				border-bottom: 1px solid $border-color;
			}
			.item-contact-info-title {
				width: 144upx;
			}
			.item-contact-info-inp {
				height: 100%;
				flex: 1;
				overflow: hidden;
				display: flex;
				input { flex: 1; height: 100%; font-size: 28upx; color: $text-main-black;}
				.to-send-tel-code {
					display: flex;
					align-items: center;
					height: 100%;
					text {
						display: inline-block;
						font-size: 24upx;
						color: $text-blue;
						padding-left: 30upx;
						border-left: 1px solid $border-color;
						margin-left: 10upx;
					}
				}
				.send-active-code {
					text {
						color: $text-grey;
					}
				}
			}
		}
	}
	
	.order-super-member {
		background-image: linear-gradient(90deg, #FDECCA 0%, #F2D08E 100%);
		border-radius: 12upx;
		width: 100%;
		height: auto;
		padding: 20upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20upx;
		.order-super-member-box {
			.order-super-member-icon {
				display: flex;
				align-items: center;
				margin-bottom: 10upx;
				.order-super-member-icon-img {
					width: 44upx;
					height: 44upx;
					margin-right: 20upx;
				}
				.order-super-member-icon-title {
					font-size: 32upx;
					color: $text-second-black;
					font-weight: 600;
				}
			}
			.order-super-member-desc {
				font-size: 24upx;
				color: $text-second-black;
				text {
					color: $text-red;
					font-weight: 800;
				}
			}
		}
		.order-super-member-select {
			width: 36upx;
			height: 36upx;
			border: 1px solid $text-main-black;
			border-radius: 50%;
			overflow: hidden;
		}
		.to-buy-select-member {
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: $text-main-black;
			font-size: 24upx;
			color: $text-color;
			font-weight: 800;
		}
	}
	
	.line-coupon-box {
		padding: 20upx;
		background: $text-color;
		border-radius: 20upx;
		margin-bottom: 20upx;
		display: flex;
		.line-coupon-title {
			font-size: 32upx;
			color: $text-main-black;
			margin-right: 40upx;
			font-weight: 600;
		}
		.line-can-use-coupon {
			flex: 1;
			overflow: hidden;
			display: flex;
			align-items: center;
			color: $text-grey;
			text {
				flex: 1;
				overflow: hidden;
				font-size: 28upx;
				text-align: right;
			}
			&:after {
				content: '';
				display: block;
				width: 12upx;
				height: 12upx;
				border: 1px solid $text-blue;
				border-left-color: transparent;
				border-top-color: transparent;
				transform: rotate(-45deg);
				position: relative;
				left: -4upx;
				margin-left: 16upx;
			}
		}
	}
	
	.line-invoice-box {
		padding: 20upx;
		background: $text-color;
		border-radius: 20upx;
		margin-bottom: 20upx;
		display: flex;
		.line-invoice-title {
			font-size: 32upx;
			color: $text-main-black;
			margin-right: 40upx;
			font-weight: 600;
		}
		.line-invoice-type {
			flex: 1;
			overflow: hidden;
			display: flex;
			align-items: center;
			color: $text-grey;
			text {
				flex: 1;
				overflow: hidden;
				font-size: 28upx;
				text-align: right;
			}
			&:after {
				content: '';
				display: block;
				width: 12upx;
				height: 12upx;
				border: 1px solid $text-blue;
				border-left-color: transparent;
				border-top-color: transparent;
				transform: rotate(-45deg);
				position: relative;
				left: -4upx;
				margin-left: 16upx;
			}
		}
	}
	
	.ruleNotice {
		padding: 20upx;
		display: flex;
		.ruleNoticeIcon {
			width: 28upx;
			height: 28upx;
			margin-right: 10upx;
			position: relative;
			top: 6upx;
			border: 1px solid #D8DCE6;
			border-radius: 50%;
		}
		.toSelectActiveRule {
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 20upx;
			color: $text-main-black;
			border-color: transparent;
			background-color: $main-color;
			font-weight: 800;
		}
		.ruleNoticeText {
			flex: 1;
			.ruleNoticeTextBox {
				font-size: 24upx;
				color: $text-main-black;
				line-height: 36upx;
				text {
					color: $text-blue;
				}
			}
		}
	}
	
	.write-order-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 99;
		background-color: $text-color;
		width: 100%;
		height: 100upx;
		border-top: 1px solid $border-color;
		display: flex;
		align-items: center;
		padding: 0 20upx;
		justify-content: space-between;
		.write-order-bottom-left {
			display: flex;
			align-items: center;
			.wirte-order-allprice {
				font-size: 40upx;
				color: $text-red;
				font-weight: 700;
				margin-right: 20upx;
			}
			.to-look-order-detail {
				display: flex;
				align-items: center;
				height: 100%;
				font-size: 28upx;
				color: $text-blue;
				&:after {
					content: '';
					display: block;
					width: 12upx;
					height: 12upx;
					border: 1px solid $text-blue;
					border-left-color: transparent;
					border-top-color: transparent;
					margin-left: 10upx;
					transform: rotate(45deg);
					position: relative;
					top: -4upx;
				}
			}
		}
		.write-order-bottom-right {
			display: flex;
			align-items: center;
			height: 100%;
			.write-order-consult {
				padding: 0 20upx;
				margin-right: 20upx;
				display: flex;
				height: 100%;
				position: relative;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				.write-order-consult-icon {
					width: 40upx;
					height: 40upx;
					margin-bottom: 4upx;
				}
				text {
					font-size: 20upx;
					color: #4F4F4F;
				}
				.serviceBtn {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					z-index: 5;
					opacity: 0;
				}
			}
			.to-apply-order {
				width: 192upx;
				height: 84upx;
				border-radius: 42upx;
				background-color: $main-color;
				text-align: center;
				line-height: 84upx;
				font-size: 28upx;
				color: $text-main-black;
			}
		}
	}
</style>
