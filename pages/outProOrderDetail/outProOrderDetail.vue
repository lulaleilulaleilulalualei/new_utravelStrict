<template>
	<view class="outProOrderDetail" :style="[{minHeight: pageMinH}]">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">订单详情</block></cu-custom>
		<view class="out-order-content">
			<view class="out-order-top">
				<view class="out-order-no">单号：1562156</view>
				<view class="out-order-createTime">2019-06-04</view>
			</view>
			<view class="out-order-flow-info">
				<view class="out-order-flow-title">物流信息：</view>
				<view class="out-order-flow-content">
					<view class="out-order-flow-content-box">
						<view class="out-order-flow-desc">您的快递已由长沙麓云路还是不好的不是不好不菜鸟驿站代收。请凭你就吃顿饭能呼呼（查询伺服电机科技网）</view>
						<view class="out-order-flow-updateTime">2018-12-26 11:52:38</view>
					</view>	
				</view>
			</view>
			<view class="out-order-consignee-info">
				<view class="item-consignee-info"><text>收货人：</text>   <view>蒋嘉俊 / 13114545454</view></view>
				<view class="item-consignee-info"><text>收货地址：</text><view>湖南 /长沙 /岳麓区 /什么什么什么接到58楼</view></view>
				<view class="item-consignee-info"><text>备注：</text>     <view>在这和我们捎些话</view></view>
			</view>
			<view class="out-order-info-box">
				<view class="item-out-pro" v-for="(item, idx) in  2" :key="idx">
					<view class="item-out-pro-img"><image src="" mode="aspectFill"></image></view>
					<view class="item-out-pro-info">
						<view class="item-out-pro-info-top">
							<view class="item-out-pro-info-title">东鹏卫浴惠普能尽可能将南京打广南第十六届开发</view>
							<view class="item-out-pro-size">规格：常规</view>
							<view class="item-out-pro-size">型号：JJP10265</view>
						</view>
						<view class="item-out-pro-price-num">
							<view class="item-out-pro-price">￥14999</view>
							<view class="item-out-pro-num">x1</view>
						</view>
					</view>
				</view>
			</view>
			<view class="out-order-freight-cost">
				<text>运费</text>
				<text>¥ 14999</text>
			</view>
			<view class="out-order-real-pay">
				<text class="out-order-real-pay-title">实付：</text>
				<text class="out-order-real-pay-sum">￥14999</text>
			</view>
		</view>
		<!-- 底部顶高 -->
		<view class="cu-tabbar-height"></view>
		
		<view class="line-order-bottom">
			<view class="item-line-order-btn">
				<view class="item-line-btn-icon"><image src="" mode=""></image></view>
				<view class="item-line-btn-title">首页</view>
			</view>
			<view class="item-line-order-btn">
				<view class="item-line-btn-icon"><image src="" mode=""></image></view>
				<view class="item-line-btn-title">客服</view>
			</view>
			<view class="item-line-order-btn">
				<view class="item-line-btn-icon"><image src="" mode=""></image></view>
				<view class="item-line-btn-title">再次购买</view>
			</view>
			<view class="item-line-order-btn" @tap="toJumpWriteComment">
				<view class="item-line-btn-icon"><image src="" mode=""></image></view>
				<view class="item-line-btn-title">评价</view>
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
		},
		toJumpWriteComment() {
			uni.navigateTo({
				url: '/pages/writeComment/writeComment'
			})
		}
	}
</script>

<style scoped lang="scss">
	.outProOrderDetail {
		width: 100%;
		background-color: #F6F9FA;
		.out-order-content {
			padding: 0 30upx;
			background-color: $text-color;
			margin-bottom: 30upx;
			.out-order-top {
				padding: 30upx 0;
				border-bottom: 1px solid #D8DCE6;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 28upx;
				color: $text-main-black;
			}
			.out-order-flow-info {
				padding: 30upx 0;
				border-bottom: 1px solid #D8DCE6;
				display: flex;
				.out-order-flow-title {
					font-size: 24upx;
					color: $text-blue;
					display: block;
					width: 120upx;
				}
				.out-order-flow-content {
					display: flex;
					align-items: center;
					flex: 1;
					overflow: hidden;
					.out-order-flow-content-box {
						flex: 1;
						overflow: hidden;
						.out-order-flow-desc {
							font-size: 24upx;
							color: $text-blue;
							margin-bottom: 10upx;
						}
						.out-order-flow-updateTime {
							font-size: 24upx;
							color: $text-grey;
						}
					}
					&:after {
						content: '';
						display: block;
						width: 14upx;
						height: 14upx;
						border: 4upx solid $text-grey;
						margin-left: 40upx;
						border-left-color: transparent;
						border-top-color: transparent;
						transform: rotate(-45deg);
						position: relative;
						left: -4upx;
						border-radius: 2upx;
					}
				}
			}
			.out-order-consignee-info {
				padding-top: 30upx;
				.item-consignee-info {
					display: flex;
					font-size: 24upx;
					color: $text-grey;
					text {
						display: block;
						width: 120upx;
						text-align: right;
					}
					view {
						flex: 1;
						overflow: hidden;
					}
					&:not(:last-child) {
						margin-bottom: 10upx;
					}
				}
				&:after {
					content: '';
					display: block;
					width: 100%;
					height: 10upx;
					background-color: #F6F9FA;
					margin-top: 30upx;
				}
			}
			.out-order-info-box {
				padding-top: 30upx;
				&:after {
					content: '';
					display: block;
					width: 100%;
					height: 10upx;
					background-color: #F6F9FA;
				}
				.item-out-pro {
					display: flex;
					align-items: center;
					margin-bottom: 30upx;
					.item-out-pro-img {
						width: 180upx;
						height: 180upx;
						background-color: $img-bg;
						margin-right: 20upx;
					}
					.item-out-pro-info {
						flex: 1;
						height: 180upx;
						overflow: hidden;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						.item-out-pro-info-top {
							.item-out-pro-info-title {
								font-size: 24upx;
								color: $text-main-black;
								font-weight: 800;
								@extend .ellipse1;
							}
							.item-out-pro-size {
								font-size: 26upx;
								color: $text-grey;
								margin-top: 4upx;
							}
						}
						.item-out-pro-price-num {
							display: flex;
							align-items: center;
							justify-content: space-between;
							font-size: 26upx;
							color: $text-main-black;
						}
					}
				}
			}
			.out-order-freight-cost {
				padding-top: 30upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 24upx;
				color: $text-grey;
			}
			.out-order-real-pay {
				padding: 20upx 0 30upx 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.out-order-real-pay-title {
					font-size: 32upx;
					color: $text-grey;
				}
				.out-order-real-pay-sum {
					font-size: 32upx;
					color: $text-red;
					font-weight: 600;
				}
			}
		}
	}
	.line-order-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 50;
		width: 100%;
		height: 100upx;
		background-color: $text-color;
		border-top: 1px solid $border-color;
		display: flex;
		padding: 30upx 0;
		.item-line-order-btn {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			&:not(:last-child) {
				border-right: 1px solid $border-color;
			}
			.item-line-btn-icon {
				width: 32upx;
				height: 32upx;
				background-color: $img-bg;
				margin-right: 10upx;
			}
			.item-line-btn-title {
				font-size: 28upx;
				color: $text-second-black;
				font-weight: 700;
			}
		}
	}
</style>
