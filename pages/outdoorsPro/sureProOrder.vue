<template>
	<view class="sureProOrder" :style="[{minHeight: pageMinH}]">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">确认订单</block></cu-custom>
		<view class="pro-order-box">
			<view class="show-address-box" @tap="toSelectAddress">
				<view class="show-address-txt">
					<view class="show-address-txt-1">佩琦 13117569925</view>
					<view class="show-address-txt-2">湖南省长沙市岳麓区天祥水晶湾</view>
				</view>
				<view class="to-add-address" v-if="false">
					<text class="cuIcon-add lg"></text>
					<view class="to-add-address-text">点击添加收货地址</view>
				</view>
			</view>
			<view class="show-pro-box">
				<view class="show-pro-store-info">
					<view class="show-pro-store-img"><image src="" mode=""></image></view>
					<view class="show-pro-store-title">商家名称</view>
				</view>
				<view class="item-show-buy-pro" v-for="(item, idx) in 2" :key="idx">
					<view class="item-show-pro-img"><image src="" mode=""></image></view>
					<view class="item-show-pro-info">
						<view class="item-show-pro-name">东鹏卫浴惠普能尽可能点点滴的将南京弗兰克斯废旧塑料</view>
						<view class="item-show-pro-size">颜色：粉色</view>
						<view class="item-show-pro-size">尺码：xl</view>
						<view class="item-show-pro-price-num">
							<view class="item-show-pro-price">价格：¥149</view>
							<view class="item-show-pro-num">x1</view>
						</view>
					</view>
				</view>
				<view class="show-pro-freight">
					<view class="pro-freight-title">运费</view>
					<view class="pro-freight-price">¥0</view>
				</view>
				<view class="show-pro-total-price">
					共2件商品，小计<text>¥ 27</text>
				</view>
			</view>
			<view class="to-show-pro-remark">
				<view class="show-pro-remark-title">特殊备注</view>
				<view class="show-pro-remark-content" @tap="toJumpProOrderRemark"></view>
			</view>
		</view>
		<view class="pro-bottom-box">
			<view class="show-order-total">
				<view class="show-order-total-1">待支付</view>
				<view class="show-order-total-2">¥ <text>27</text></view>
			</view>
			<view class="show-order-to-pay">微信支付</view>
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
			toJumpProOrderRemark() {
				uni.navigateTo({
					url: '/pages/outdoorsPro/orderRemarks'
				})
			},
			toSelectAddress() {
				uni.navigateTo({
					url: '/pages/addressList/addressList'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.sureProOrder {
		width: 100%;
		background-color: #F6F9FA;
		.pro-order-box {
			padding: 30upx 30upx 0;
			.show-address-box {
				padding: 30upx;
				background-color: $text-color;
				border-radius: 20upx;
				display: flex;
				align-items: center;
				margin-bottom: 20upx;
				&:after {
					content: '';
					display: block;
					width: 12upx;
					height: 12upx;
					border: 2upx solid #B5B5B5;
					border-top-color: transparent;
					border-left-color: transparent;
					transform: rotate(-45deg);
					margin-right: 10upx;
				}
				.show-address-txt {
					flex: 1;
					overflow: hidden;
					.show-address-txt-1 {
						font-size: 28upx;
						color: $text-second-black;
						margin-bottom: 10upx;
					}
					.show-address-txt-2 {
						font-size: 24upx;
						color: $text-grey;
					}
				}
			}
			.to-add-address {
				flex: 1;
				display: flex;
				align-items: center;
				.cuIcon-add {
					width: 40upx;
					height: 40upx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 28upx;
					color: $text-main-black;
					margin-right: 20upx;
					background-color: $main-color;
					border-radius: 50%;
				}
				.to-add-address-text {
					font-size: 28upx;
					color: $text-grey;
				}
			}
			.show-pro-box {
				padding: 30upx;
				background-color: $text-color;
				border-radius: 20upx;
				margin-bottom: 20upx;
				.show-pro-store-info {
					display: flex;
					align-items: center;
					.show-pro-store-img {
						width: 30px;
						height: 30upx;
						margin-right: 10upx;
						background-color: $img-bg;
					}
					.show-pro-store-title {
						font-size: 28upx;
						color: $text-second-black;
					}
				}
				.item-show-buy-pro {
					width: 100%;
					height: auto;
					display: flex;
					align-items: center;
					padding: 30upx 0;
					border-bottom: 1px solid $border-color;
					.item-show-pro-img {
						width: 166upx;
						height: 166upx;
						background-color: $img-bg;
						margin-right: 20upx;
					}
					.item-show-pro-info {
						height: 166upx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						flex: 1;
						overflow: hidden;
						.item-show-pro-name {
							width: 100%;
							font-size: 24upx;
							color: $text-main-black;
							@extend .ellipse1;
						}
						.item-show-pro-size {
							font-size: 24upx;
							color: $text-grey;
						}
						.item-show-pro-price-num {
							display: flex;
							align-items: center;
							justify-content: space-between;
							.item-show-pro-price {
								font-size: 24upx;
								color: $text-grey;
							}
							.item-show-pro-num {
								font-size: 24upx;
								color: $text-main-black;
							}
						}
					}
				}
				.show-pro-freight {
					padding: 30upx 0;
					width: 100%;
					height: auto;
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 28upx;
					color: $text-main-black;
					border-bottom: 1px solid $border-color;
				}
				.show-pro-total-price {
					padding-top: 30upx;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					font-size: 24upx;
					color: $text-second-black;
					text {
						display: inline-block;
						margin-left: 20upx;
						font-size: 28upx;
						font-weight: 600;
					}
				}
			}
			.to-show-pro-remark {
				padding: 30upx;
				background-color: $text-color;
				display: flex;
				align-items: center;
				.show-pro-remark-title {
					font-size: 28upx;
					color: $text-second-black;
					margin-right: 20upx;
				}
				.show-pro-remark-content {
					flex: 1;
					height: 40upx;
					line-height: 40upx;
					overflow: hidden;
					font-size: 28upx;
					color: $text-second-black;
					@extend .ellipse1;
				}
			}
		}
		.pro-bottom-box {
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 10;
			width: 100%;
			height: 100upx;
			display: flex;
			background-color: $text-color;
			.show-order-total {
				height: 100%;
				flex: 1;
				padding: 0 30upx;
				display: flex;
				align-items: center;
				.show-order-total-1 {
					font-size: 28upx;
					color: $text-grey;
					margin-right: 20upx;
				}
				.show-order-total-2 {
					font-size: 32upx;
					color: $text-second-black;
					text {
						display: inline-block;
						font-size: 46upx;
						font-weight: 600;
						margin-left: 10upx;
					}
				}
			}
			.show-order-to-pay {
				height: 100%;
				width: 260upx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 32upx;
				color: $text-second-black;
				background-color: $main-color;
			}
		}
	}
</style>
