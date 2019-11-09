<template>
	<view class="getMoney" data-sign="moneyBox" @tap="toOutCloseMoneyBox">
		<view class="get-money-box">
			<view class="get-money-title">提现到微信钱包</view>
			<view class="to-input-sum">
				<view class="to-input-sum-icon">￥</view>
				<input type="number" placeholder="最低1元起提" placeholder-style="color: #D8DCE6;"/>
				<view class="to-input-btn">全部</view>
			</view>
			<view class="to-get-money-btn">立即提现</view>
			<view class="to-get-money-notice">预计1个工作日内到账</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toOutCloseMoneyBox(e) {
				let sign = e.target.dataset.sign
				if(sign) {
					this.$emit('toCloseMoneyBox', false)
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.getMoney {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 200;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0,0,0,0.7);
		.get-money-box {
			width: 690upx;
			height: auto;
			border-radius: 20upx;
			background-color: $text-color;
			padding: 40upx 60upx;
			.get-money-title {
				text-align: center;
				font-size: 28upx;
				color: $text-second-black;
				margin-bottom: 60upx;
			}
			.to-input-sum {
				width: 100%;
				height: 68upx;
				display: flex;
				align-items: center;
				margin-bottom: 60upx;
				.to-input-sum-icon {
					font-size: 36upx;
					color: $text-blue;
					margin-right: 20upx;
					font-weight: 800;
				}
				input {
					flex: 1;
					height: 100%;
					font-size: 36upx;
					color: $text-second-black;
				}
				.to-input-btn {
					height: 100%;
					width: 112upx;
					border: 1px solid #FF7F89;
					border-radius: 8upx;
					margin-left: 20upx;
					text-align: center;
					line-height: 68upx;
					color: #FF7F89;
				}
			}
			.to-get-money-btn {
				width: 470upx;
				height: 92upx;
				border-radius: 46upx;
				margin: 0 auto;
				line-height: 92upx;
				text-align: center;
				background-color: $main-color;
				font-size: 32upx;
				color: $text-main-black;
				margin-bottom: 30upx;
			}
			.to-get-money-notice {
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 24upx;
				color: $text-grey;
				&:before {
					content: '';
					display: block;
					width: 8upx;
					height: 8upx;
					background-color: $text-grey;
					margin-right: 20upx;
					border-radius: 50%;
				}
			}
		}
	}
</style>
