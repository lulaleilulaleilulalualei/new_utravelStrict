<template>
	<view class="mine">
		<view class="mine-bg"><image src="/static/mine_bg.png" mode="aspectFill"></image></view>
		<view class="mine-content">
			<cu-custom :bgColor="navColor" :isBack="false" :textOpacity="textOpacity"><block slot="content"></block>我的</cu-custom>
			<view class="mine-content-box">
				<view class="mine-top-info">
					<view class="mine-top-head">
						<open-data type="userAvatarUrl"></open-data>
					</view>
					<view class="mine-top-info-box">
						<view class="mine-info-name">
							<open-data v-if="isAuth" type="userNickName"></open-data>
							
							<text v-if="!isAuth">点击登录账户</text>
							<button v-if="!isAuth" class="toAuthBtn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">点击登录账户</button>
						</view>
						<view class="mine-icon-box" v-if="isAuth">
							<view class="mine-item-icon">
								<view class="mine-item-icon-img"><image src="/static/mine_integral_icon.png" mode=""></image></view>
								<view class="mine-item-icon-txt">BP.{{userInfo.integral}}</view>
							</view>
							<view class="mine-item-icon" v-if="userInfo.is_vip == 1">
								<view class="mine-item-icon-img"><image src="/static/mine_member_icon.png" mode=""></image></view>
								<view class="mine-item-icon-txt">超级会员</view>
							</view>
						</view>
					</view>
				</view>
				<view class="mine-open-member" @tap="toJumpMember">
					<view class="mine-open-member-txt">
						<view class="mine-open-member-txt1">
							<view class="mine-open-member-txt1-icon"><image src="/static/member_icon.png" mode="aspectFill"></image></view>
							<view class="mine-open-member-txt1-name">超级会员</view>
						</view>
						<view class="mine-open-member-txt2">超级会员尊享全品类旅游线路会员价</view>
					</view>
					<view class="mine-open-member-btn">立即开通</view>
				</view>
				<view class="mine-opt-box">
					<view class="item-opt-in item-opt-collect" style="background-color: #FFFAF0;" @tap="toJumpMineCollect">
						<view class="item-opt-in-icon"><image src="/static/mine_collect.png" mode="aspectFill"></image></view>
						<view class="item-opt-in-name">我的收藏</view>
					</view>
					<view class="item-opt-in item-opt-order" style="background-color: #EFFFFE;" @tap="toJumpMineOrders">
						<view class="item-opt-in-icon"><image src="/static/mine_order.png" mode="aspectFill"></image></view>
						<view class="item-opt-in-name">我的订单</view>
					</view>
					<view class="item-opt-in item-opt-wallet" style="background-color: #F4F2FE;" @tap="toJumpMineWallet">
						<view class="item-opt-in-icon"><image src="/static/mine_wallet.png" mode="aspectFill"></image></view>
						<view class="item-opt-in-name">我的卡包</view>
					</view>
					<view class="item-opt-in item-opt-address" style="background-color: #FEF7F9;" @tap="toJumpAddress">
						<view class="item-opt-in-icon"><image src="/static/mine_address.png" mode="aspectFill"></image></view>
						<view class="item-opt-in-name">收货地址</view>
					</view>
					<view class="item-opt-in item-opt-info" style="background-color: #F7FCFE;" @tap="toJumpMineInfo">
						<view class="item-opt-in-icon"><image src="/static/mine_info.png" mode="aspectFill"></image></view>
						<view class="item-opt-in-name">个人信息</view>
					</view>
					<view class="item-opt-in item-opt-partner" style="background-color: #F2F6FE;" @tap="toJumpApplyPartner">
						<view class="item-opt-in-icon"><image src="/static/mine_partner.png" mode="aspectFill"></image></view>
						<view class="item-opt-in-name">申请合伙人</view>
					</view>
					<view class="item-opt-in item-opt-integra_ranking" style="background-color: #FEFAF2;" @tap="toJumpIntegralList">
						<view class="item-opt-in-icon"><image src="/static/mine_integra_ranking.png" mode="aspectFill"></image></view>
						<view class="item-opt-in-name">积分排行</view>
					</view>
					<view class="item-opt-in item-opt-data" style="background-color: #EFFFFE;">
						<view class="item-opt-in-icon"><image src="/static/mine_data.png" mode="aspectFill"></image></view>
						<view class="item-opt-in-name">数据分析</view>
					</view>
				</view>
				
			</view>
			<view class="mine-bottom-bg"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navColor: 'white',//导航背景色
				textOpacity: 0, //导航透明度
				userInfo: null, //用户信息
				
				isAuth: false, //未授权
			}
		},
		onLoad() {
			if(this.$userInfo) {
				this.userInfo = this.$userInfo
				this.isAuth = true
			}else {
				this.$api.userLogin((status) => {
					if(status == 1) {
						this.isAuth = true
						this.userInfo = this.$userInfo
					}
				})
			}
		},
		onPageScroll(e) {
			let top = e.scrollTop
			this.textOpacity = top / 200 > 1 ? 1 : top / 200
		},
		methods: {
			getUserInfo: function(e) { //按钮登录授权
			  if (e.detail.errMsg == 'getUserInfo:ok') {
			    uni.showLoading({
			      title: '授权登陆中...',
			      mask: true
			    })
			    const $this = this
			    this.$api.userLogin((status) => {
			      if (status == '1') {
			          uni.hideLoading()
			          uni.showToast({
			            title: '授权登录成功',
			            icon: 'success',
			            mask: true,
			            success: () => {
							$this.userInfo = $this.$userInfo
							$this.isAuth = true
			            }
			          })
			      }
			    })
			  }else {
			    this.$api.warnNotice('您已拒绝授权！')
			    this.isAuth = false
			  }
			},
			toJumpMember() {
				uni.navigateTo({
					url: '/pageMember/utravelMember/utravelMember'
				})
			},
			toJumpMineCollect() { //我的收藏
				if(this.isAuth) {
					uni.navigateTo({
						url: '/pages/collectList/collectList'
					})
				}else {
					this.$api.warnNotice('请先授权登录~')
				}
			},
			toJumpMineOrders() { //我的订单
				if(this.isAuth) {
					uni.navigateTo({
						url: '/pages/myOrders/myOrders'
					})
				}else {
					this.$api.warnNotice('请先授权登录~')
				}
			},
			toJumpMineWallet() { //我的卡包
				if(this.isAuth) {
					uni.navigateTo({
						url: '/pages/mineWallet/mineWallet'
					})
				}else {
					this.$api.warnNotice('请先授权登录~')
				}
			},
			toJumpAddress() { //地址管理
				if(this.isAuth) {
					uni.navigateTo({
						url: '/pages/addressList/addressList'
					})
				}else {
					this.$api.warnNotice('请先授权登录~')
				}
			},
			toJumpMineInfo() { //个人信息
				if(this.isAuth) {
					uni.navigateTo({
						url: '/pages/personalInfo/personalInfo'
					})
				}else {
					this.$api.warnNotice('请先授权登录~')
				}	
			},
			toJumpApplyPartner() { //申请合伙人
				if(this.isAuth) {
					uni.navigateTo({
						url: '/pages/applyPartner/applyPartner'
					})
				}else {
					this.$api.warnNotice('请先授权登录~')
				}
			},
			toJumpIntegralList() { //积分排行
				if(this.isAuth) {
					uni.navigateTo({
						url: '/pages/integralList/integralList'
					})
				}else {
					this.$api.warnNotice('请先授权登录~')
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.mine {
		width: 100%;
		height: 100%;
		position: relative;
		.mine-bg {
			position: relative;
			z-index: 1;
			width: 100%;
			height: 100%;
		}
		.mine-content {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 10;
			width: 100%;
			height: 100%;
			.mine-content-box {
				padding: 40upx 30upx 0;
			}
		}
	}
	.mine-top-info {
		display: flex;
		margin-bottom: 60upx;
		.mine-top-head {
			width: 120upx;
			height: 120upx;
			background-color: $text-color;
			border-radius: 50%;
			overflow: hidden;
			margin-right: 30upx;
		}
		.mine-top-info-box {
			flex: 1;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			justify-content: center;
			.mine-info-name {
				width: 100%;
				position: relative;
				font-size: 40upx;
				color: $text-second-black;
				margin-bottom: 10upx;
				font-weight: 800;
				width: 100%;
				min-height: 52upx;
				@extend .ellipse1;
			}
			.mine-icon-box {
				display: flex;
				align-items: center;
				.mine-item-icon {
					position: relative;
					&:not(:last-child) {
						margin-right: 20upx;
					}
					.mine-item-icon-img {
						position: absolute;
						top: -4upx;
						left: 0;
						z-index: 10;
						width: 48upx;
						height: 48upx;
						border-radius: 50%;
						overflow: hidden;
					}
					.mine-item-icon-txt {
						width: auto;
						height: 40upx;
						line-height: 40upx;
						font-size: 20upx;
						color: $text-second-black;
						padding: 0 20upx 0 58upx;
						background-image: linear-gradient(180deg, #FFED92 0%, #FFE24E 100%);
						border-radius: 20upx;
						position: relative;
						z-index: 1;
					}
				}
			}
		}
	}
	
	.mine-open-member {
		background-image: linear-gradient(135deg, #FDECCA 0%, #F2D08E 100%);
		border-radius: 12px;
		padding: 30upx;
		margin-bottom: 60upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.mine-open-member-txt {
			.mine-open-member-txt1 {
				display: flex;
				align-items: center;
				margin-bottom: 10upx;
				.mine-open-member-txt1-icon {
					width: 44upx;
					height: 44upx;
					margin-right: 20upx;
				}
				.mine-open-member-txt1-name {
					font-size: 32upx;
					color: $text-second-black;
					font-weight: 800;
				}
			}
			.mine-open-member-txt2 {
				font-size: 24upx;
				color: $text-second-black;
			}
		}
		.mine-open-member-btn {
			width: 136upx;
			height: 50upx;
			border-radius: 25upx;
			text-align: center;
			line-height: 50upx;
			background-color: $text-main-black;
			text-align: center;
			line-height: 50upx;
			font-size: 24upx;
			color: #F4D69A;
		}
	}
	
	.mine-opt-box {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 26upx;
		.item-opt-in {
			width: 210upx;
			height: 210upx;
			border-radius: 6px;
			overflow: hidden;
			margin-bottom: 30upx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			&:not(:nth-child(3n)) {
				margin-right: 30upx;
			}
			.item-opt-in-icon {
				width: 68upx;
				height: 68upx;
				margin-bottom: 20upx;
			}
			.item-opt-in-name {
				font-size: 28upx;
				color: $text-second-black;
				font-weight: 600;
			}
		}
	}
	
	.mine-bottom-bg {
		width: 100%;
		height: 130upx;
		overflow: hidden;
		position: relative;
		&:after {
			content: '';
			display: block;
			width: 260upx;
			height: 260upx;
			position: absolute;
			right: -130upx;
			bottom: -130upx;
			border-radius: 50%;
			background-color: #EEF2FF;
		}
	}
</style>
