<template>
	<view class="selfOrderDetail" :style="[{minHeight: pageMinH}]">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">订单详情</block></cu-custom>
		
		<view class="show-take-code">
			<view class="show-take-code-1">立即取餐</view>
			<view class="show-take-code-2">取餐号</view>
			<view class="show-take-code-3">B15</view>
			<view class="show-take-code-4">请向商家出示取餐号</view>
		</view>
		
		<view class="show-store-info">
			<view class="order-store-name">益阳快马加鞭俱乐部</view>
			<view class="order-store-address">湖南省益阳市赫山区秀峰公园518号</view>
		</view>
		
		<view class="show-order-list-box">
			<view class="show-order-No">
				<text>订单号：456235656</text>
				<text>2019-05-06 15:00</text>
			</view>
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
			<view class="select-all-pro">
				<view>共2件商品</view>
				<view>实付 <text>￥27</text></view>
			</view>
		</view>
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
		}
	}
</script>

<style scoped lang="scss">
	.selfOrderDetail {
		width: 100%;
		background-color: #F6F9FA;
		padding-bottom: 50upx;
		.show-take-code {
			width: 100%;
			padding: 50upx 0 60upx;
			margin-bottom: 10upx;
			background-color: $text-color;
			.show-take-code-1 {
				font-size: 36upx;
				color: $text-second-black;
				text-align: center;
				margin-bottom: 40upx;
				font-weight: 700;
			}
			.show-take-code-2 {
				font-size: 28upx;
				color: $text-grey;
				text-align: center;
				margin-bottom: 10upx;
			}
			.show-take-code-3 {
				font-size: 68upx;
				color: $main-color;
				text-align: center;
				margin-bottom: 10upx;
			}
			.show-take-code-4 {
				font-size: 28upx;
				color: $text-second-black;
				text-align: center;
			}
		}
		.show-store-info {
			padding: 30upx;
			background-color: #fff;
			margin-bottom: 10upx;
			.order-store-name {
				font-size: 28upx;
				color: $text-second-black;
				margin-bottom: 10upx;
				font-weight: 600;;
			}
			.order-store-address {
				font-size: 24upx;
				color: $text-second-black;
			}
		}
	}
	.show-order-list-box {
		padding: 0 30upx;
		background-color: $text-color;
		.show-order-No {
			padding: 30upx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 24upx;
			color: $text-grey;
			border-bottom: 1px solid #E5E5E5;
		}
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
			justify-content: space-between;
			align-items: center;
			font-size: 28upx;
			color: $text-second-black;
			text {
				display: inline-block;
				font-size: 36upx;
				font-weight: 600;
				margin-left: 20upx;
			}
		}
	}
</style>
