<template>
	<view class="sureOrder" :style="[{minHeight: pageMinH}]">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">确认订单</block></cu-custom>
		
		<view class="contentBox">
			<view class="order-store-info">
				<view class="order-store-name">益阳快马加鞭俱乐部</view>
				<view class="order-store-address">湖南省益阳市赫山区秀峰公园518号</view>
			</view>
			<view class="select-order-list">
				<view class="item-select-pro" v-for="item in 4" :key="item">
					<view class="item-pro-img"><image src="../../static/test_img_2.jpeg" mode=""></image></view>
					<view class="item-pro-info">
						<view class="item-pro-name">梅梅芝士茉香绿茶</view>
						<view class="item-pro-size">已选：大杯 / 冰 / 全糖</view>
						<view class="item-pro-price-info">
							<view class="item-pro-price">价格：¥149</view>
							<view class="item-pro-num">x1</view>
						</view>
					</view>
				</view>
				<view class="select-all-pro">共2件商品，小计 <text>￥27</text></view>
			</view>
			<view class="order-remarks" @tap="toJumpRemarks">
				<view class="order-remarks-title">特殊备注</view>
				<view class="order-remarks-text"><text></text></view>
			</view>
		</view>
		
		
		<view class="bottom-pay-btn">
			<view class="bottom-pay-price">
				<view class="bottom-pay-price1">待支付</view>
				<view class="bottom-pay-price2">￥<text class="bottom-pay-price-num">27</text></view>
			</view>
			<view class="to-pay-btn" @tap="toJumpOrdersDetail">微信支付</view>
		</view>
		<!-- 底部顶高 -->
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			pageMinH() {
				let sys = uni.getSystemInfoSync()
				return sys.windowHeight + 'px'
			}
		},
		methods: {
			toJumpRemarks() {
				uni.navigateTo({
					url: '/pages/selfPro/orderRemarks'
				})
			},
			toJumpOrdersDetail() {
				uni.navigateTo({
					url: '/pages/selfPro/selfOrderDetail'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.sureOrder {
		width: 100%;
		background-color: #F6F9FA;
	}
	.contentBox {
		padding: 40upx 30upx;
		.order-store-info {
			padding: 30upx;
			background-color: $text-color;
			border-radius: 20upx;
			overflow: hidden;
			margin-bottom: 20upx;
			.order-store-name {
				font-size: 28upx;
				color: $text-second-black;
				margin-bottom: 4upx;
			}
			.order-store-address {
				font-size: 24upx;
				color: $text-grey;
			}
		}
		.select-order-list {
			padding: 0 30upx;
			background-color: $text-color;
			border-radius: 20upx;
			overflow: hidden;
			margin-bottom: 20upx;
			.item-select-pro {
				padding: 30upx 0;
				height: 182upx;
				width: 100%;
				border-bottom: 1px solid #E5E5E5;
				display: flex;
				.item-pro-img {
					width: 122upx;
					height: 100%;
					background-color: $img-bg;
					margin-right: 20upx;
				}
				.item-pro-info {
					flex: 1;
					overflow: hidden;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					height: 100%;
					.item-pro-name {
						font-size: 24upx;
						color: $text-main-black;
						width: 100%;
						@extend .ellipse1;
					}
					.item-pro-size {
						font-size: 24upx;
						color: $text-grey;
					}
					.item-pro-price-info {
						display: flex;
						justify-content: space-between;
						.item-pro-price {
							font-size: 24upx;
							color: $text-grey;
						}
						.item-pro-num {
							font-size: 24upx;
							color: $text-main-black;
						}
					}
				}
			}
			.select-all-pro {
				padding: 30upx 0;
				display: flex;
				justify-content: flex-end;
				font-size: 24upx;
				color: $text-second-black;
				text {
					display: inline-block;
					font-size: 28upx;
					font-weight: 600;
					margin-left: 20upx;
				}
			}
		}
		.order-remarks {
			padding: 30upx;
			background-color: $text-color;
			border-radius: 20upx;
			display: flex;
			.order-remarks-title {
				font-size: 28upx;
				font-size: $text-second-black;
				margin-right: 40upx;
			}
			.order-remarks-text {
				flex: 1;
				overflow: hidden;
				display: flex;
				justify-content: space-between;
				align-items: center;
				@extend .ellipse1;
				&::after {
					content: '';
					display: block;
					width: 12upx;
					height: 12upx;
					border: 2upx solid $text-second-black;
					border-left-color: transparent;
					border-top-color: transparent;
					transform: rotate(-45deg);
					margin: 0 10upx;
				}
			}
		}
	}
	.bottom-pay-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 100upx;
		width: 100%;
		background-color: $text-color;
		box-shadow: 0 4upx 8upx 0 rgba(0,0,0,0.50);
		display: flex;
		.bottom-pay-price {
			flex: 1;
			overflow: hidden;
			padding: 0 30upx;
			display: flex;
			align-items: center;
			.bottom-pay-price1 {
				font-size: 28upx;
				color: $text-grey;
				margin-right: 20upx;
			}
			.bottom-pay-price2 {
				font-size: 32upx;
				color: $text-main-black;
				font-weight: 600;
				.bottom-pay-price-num {
					display: inline-block;
					margin-left: 10upx;
					font-size: 46upx;
				}
			}
		}
		.to-pay-btn {
			width: 260upx;
			height: 100%;
			background-color: $main-color;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 32upx;
			color: $text-second-black;
		}
	}
</style>
