<template>
	<view class="costDetail" data-sign="detailBox" @tap="outToCloseBox">
		<view class="cost-detail-box">
			<view class="cost-detail-title">费用明细</view>
			<view class="linePro-title">香港一日游香港一日游香港一日游香港一日游香港一日游香港一日游香港一日游香港一日游香港一日游</view>
			<view class="item-cost-type-box">
				<view class="item-cost-box">
					<view class="item-cost-box-title">成人</view>
					<view class="item-cost-box-sum">¥ 497 x 2人</view>
				</view>
				<view class="item-cost-box">
					<view class="item-cost-box-title">小孩</view>
					<view class="item-cost-box-sum">¥ 497 x 2人</view>
				</view>
			</view>
			<view class="item-cost-type-box">
				<view class="item-cost-box">
					<view class="item-cost-box-title">商家优惠券</view>
					<view class="item-cost-box-sum">- ¥ 10</view>
				</view>
				<view class="item-cost-box">
					<view class="item-cost-box-title">限时立减</view>
					<view class="item-cost-box-sum">- ¥ 10</view>
				</view>
			</view>
			<view class="show-total-price">
				订单总额：¥ <text>994</text>
			</view>
			
			<view class="to-colse-cost-box" @tap="toCloseBox">关闭</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
			outToCloseBox(e) {
				let sign = e.target.dataset.sign
				if(sign) {
					this.$emit('toCloseDetailBox', false)
				}
			},
			toCloseBox() {
				this.$emit('toCloseDetailBox', false)
			}
		}
	}
</script>

<style scoped lang="scss">
	.costDetail {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 200;
		background-color: rgba(0,0,0,0.7);
		.cost-detail-box {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 880upx;
			background-color: $text-color;
			border-radius: 20upx 20upx 0 0;
			padding: 30upx;
			.cost-detail-title {
				font-size: 36upx;
				color: $text-third-black;
				font-weight: 700;
				margin-bottom: 60upx;
				text-align: center;
			}
		}
	}
	.linePro-title {
		font-size: 28upx;
		color: $text-main-black;
		padding-bottom: 30upx;
		border-bottom: 1px solid #EFEFEF;
	}
	.item-cost-type-box {
		padding: 30upx 0;
		border-bottom: 1px solid #EFEFEF;
		.item-cost-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.item-cost-box-title {
				font-size: 28upx;
				color: $text-main-black;
			}
			.item-cost-box-sum {
				font-size: 28upx;
				color: $text-main-black;
				font-weight: 600;
			}
		}
	}
	.show-total-price {
		padding-top: 30upx;
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		font-size: 24upx;
		color: $text-main-black;
		text {
			display: inline-block;
			font-size: 48upx;
			line-height: 48upx;
			color: $text-red;
			font-weight: 700;
			margin-left: 10upx;
		}
	}
	.to-colse-cost-box {
		position: absolute;
		left: 30upx;
		bottom: 20upx;
		width: 690upx;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
		background-color: $main-color;
		font-size: 36upx;
		color: $text-third-black;
		border-radius: 50upx;
	}
</style>
