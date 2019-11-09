<template>
	<view class="mineWallet" :style="[{minHeight: pageMinH}]">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">我的钱包</block></cu-custom>
		
		<view class="show-card">
			<view class="show-card-box">
				<view class="show-card-box-top">
					<view class="card-box-small-title">总金额（元）</view>
					<view class="card-wallet-sum">120,000.00</view>
					<veiw class="card-wallet-earnings">今日收益 +598</veiw>
				</view>
				<view class="show-card-box-bottom">
					<view class="item-wallet-earnings">
						<view class="card-box-small-title">累计收益</view>
						<view class="item-wallet-earnings-sum">100000.00</view>
					</view>
					<view class="item-wallet-earnings">
						<view class="card-box-small-title">累计收益</view>
						<view class="item-wallet-earnings-sum">100000.00</view>
					</view>
				</view>
			</view>
		</view>
		<view class="wallet-record-coupon">
			<view class="item-wallet-record" @tap="toGetMoneyRecord">
				<view class="item-wallet-record-icon"><image src="/static/money_record_icon.png" mode=""></image></view>
				<view class="item-record-name">提现记录</view>
			</view>
			<view class="item-waller-coupon" @tap="toJumpCoupon">
				<view class="item-waller-coupon-icon"><image src="/static/coupon_icon.png" mode=""></image></view>
				<view class="item-coupon-name">我的优惠券 7张</view>
			</view>
		</view>
		
		<view class="opt-record-list">
			<view class="item-record-box" v-for="(item, idx) in 5" :key="idx">
				<veiw class="item-record-box-left">
					<view class="item-opt-title">柳叶湖活动柳叶湖活动</view>
					<view class="item-opt-num">购买人数：52</view>
				</veiw>
				<veiw class="item-record-box-right">
					<view class="item-opt-money">+500</view>
					<view class="item-opt-time">05-07 17:52</view>
				</veiw>
			</view>
		</view>
		
		<view class="to-get-money-btn">
			<view class="get-money-box" @tap="toShowGetMoneyBox">提现</view>
		</view>
		
		<getMoneyBox v-if="isShowGetMoneyBox" @toCloseMoneyBox="toCloseMoneyBox"></getMoneyBox>
		<!-- 底部顶高 -->
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	import getMoneyBox from './getMoneyBox.vue'
	
	export default {
		data() {
			return {
				isShowGetMoneyBox: false
			}
		},
		components: {getMoneyBox},
		computed: {
			pageMinH() {
				let sys = uni.getSystemInfoSync()
				return sys.windowHeight + 'px'
			}
		},
		methods: {
			toGetMoneyRecord() {
				uni.navigateTo({
					url: '/pages/mineWallet/getMoneyRecord'
				})
			},
			toJumpCoupon() {
				uni.navigateTo({
					url: '/pages/discountsCoupon/discountsCoupon'
				})
			},
			toShowGetMoneyBox() {
				this.isShowGetMoneyBox = !this.isShowGetMoneyBox
			},
			toCloseMoneyBox(val) {
				this.isShowGetMoneyBox = val
			}
		}
	}
</script>

<style scoped lang="scss">
	.mineWallet {
		width: 100%;
		background-color: #F6F9FA;
	}
	.show-card {
		width: 100%;
		height: auto;
		background-color: $text-color;
		padding: 30upx 30upx 40upx;
		.show-card-box {
			width: 100%;
			height: 386upx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			background-image: linear-gradient(-90deg, #FAD171 0%, #DAA753 100%);
			box-shadow: 0 16upx 28upx 0 rgba(226,161,40,0.32);
			border-radius: 20upx;
			padding: 50upx 30upx;
			.card-box-small-title {
				font-size: 24upx;
				color: $text-color;
			}
			.show-card-box-top {
				.card-wallet-sum {
					font-size: 66upx;
					color: $text-color;
					font-weight: 800;
					margin-bottom: 10upx;
				}
				.card-wallet-earnings {
					font-size: 24upx;
					color: #F5E3C6;
				}
			}
			.show-card-box-bottom {
				display: flex;
				align-items: center;
				.item-wallet-earnings {
					flex: 1;
					overflow: hidden;
					.item-wallet-earnings-sum {
						font-size: 36upx;
						color: $text-color;
					}
				}
			}
		}
	}
	.wallet-record-coupon {
		padding: 20upx 30upx 30upx;
		background-color: $text-color;
		display: flex;
		margin-bottom: 20upx;
		.item-wallet-record {
			flex: 1;
			display: flex;
			align-items: center;
			border-right: 1px solid $border-color;
			.item-wallet-record-icon {
				width: 30upx;
				height: 34upx;
				margin-right: 30upx;
			}
			.item-record-name {
				font-size: 28upx;
				color: $text-second-black;
				font-weight: 600;
			}
		}
		.item-waller-coupon {
			flex: 1;
			display: flex;
			align-items: center;
			padding-left: 30upx;
			.item-waller-coupon-icon {
				width: 38upx;
				height: 30upx;
				margin-right: 30upx;
			}
			.item-coupon-name {
				font-size: 28upx;
				color: $text-second-black;
				font-weight: 600;
			}
		}
	}
	.opt-record-list {
		width: 100%;
		height: auto;
		.item-record-box {
			display: flex;
			justify-content: space-between;
			padding: 50upx 30upx 26upx;
			background-color: $text-color;
			margin-bottom: 20upx;
			box-shadow: 0 10upx 20upx 0 rgba(246,249,250,0.32);
			.item-record-box-left {
				.item-opt-title {
					font-size: 36upx;
					color: $text-second-black;
					font-weight: 600;
				}
				.item-opt-num {
					font-size: 28upx;
					color: $text-grey;
				}
			}
			.item-record-box-right {
				.item-opt-money {
					font-size: 44upx;
					color: $text-red;
					margin-bottom: 40upx;
					font-weight: 700;
				}
				.item-opt-time {
					font-size: 24upx;
					color: $text-grey;
				}
			}
		}
	}
	.to-get-money-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 100;
		width: 100%;
		height: auto;
		background-color: $text-color;
		padding: 0 30upx 20upx;
		.get-money-box {
			width: 100%;
			height: 100upx;
			background-color: $text-red;
			line-height: 100upx;
			text-align: center;
			font-size: 32upx;
			color: $text-color;
		}
	}
</style>
