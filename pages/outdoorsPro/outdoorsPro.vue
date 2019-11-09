<template>
	<view class="outdoorsPro">
		<cu-custom bgColor="white" :isBack="false"><block slot="content">户外产品</block></cu-custom>
		<view class="contentBox">
			<view class="pro-banner-img">
				<image src="/static/test_img_1.jpeg" mode=""></image>
			</view>
			<view class="pro-type-enter">
				<view class="pro-type-box-1">
					<view class="pro-type-1" @tap="toJumpProList">
						<view class="pro-type-title">服饰馆</view>
						<view class="pro-type-desc">春夏新款一网打尽</view>
						<view class="pro-type-img-1"><image src="/static/test_img_6.jpeg" mode=""></image></view>
					</view>
					<view class="pro-type-double">
						<view class="pro-type-2" @tap="toJumpProList">
							<view class="pro-type-title">鞋靴馆</view>
							<view class="pro-type-desc">爆品推荐</view>
							<view class="pro-type-img-2"><image src="/static/test_img_2.jpeg" mode=""></image></view>
						</view>
						<view class="pro-type-2" @tap="toJumpProList">
							<view class="pro-type-title">露营馆</view>
							<view class="pro-type-desc">露营必备就在这</view>
							<view class="pro-type-img-2"><image src="/static/test_img_2.jpeg" mode=""></image></view>
						</view>
					</view>
				</view>
				<view class="pro-type-box-2">
					<view class="pro-type-3" @tap="toJumpProList">
						<view class="pro-type-title">运动馆</view>
						<view class="pro-type-desc">各种超值单品</view>
						<view class="pro-type-img-3"><image src="/static/test_img_4.jpeg" mode=""></image></view>
					</view>
					<view class="pro-type-3" @tap="toJumpProList">
						<view class="pro-type-title">旅行馆</view>
						<view class="pro-type-desc">箱包特惠抢购</view>
						<view class="pro-type-img-3"><image src="/static/test_img_4.jpeg" mode=""></image></view>
					</view>
					<view class="pro-type-3" @tap="toJumpProList">
						<view class="pro-type-title">装备馆</view>
						<view class="pro-type-desc">各种优质装备</view>
						<view class="pro-type-img-3"><image src="/static/test_img_4.jpeg" mode=""></image></view>
					</view>
				</view>
			</view>
			<view class="hot-pro-title">热门榜单</view>
			<view class="hot-pro-list">
				<view class="item-show-pro" v-for="(item, idx) in 7" :key="idx" @tap="toJumpProDetail(idx)">
					<view class="item-pro-img"><image src="/static/test_img_6.jpeg" mode=""></image></view>
					<view class="item-pro-info">
						<view class="item-pro-title">速干衣金链子</view>
						<view class="item-pro-tags"><text>美食</text> <text>速干</text></view>
						<view class="item-pro-price">
							<view class="item-pro-sell-price">￥<text>2189</text></view>
							<view class="item-pro-ori-price">原价￥2223</view>
						</view>
					</view>
				</view>
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
		methods: {
			toJumpProDetail(idx) {
				uni.navigateTo({
					url: '/pages/outdoorsPro/outProDetail'
				})
			},
			toJumpProList() {
				uni.navigateTo({
					url: '/pages/outdoorsPro/outProList'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.contentBox {
		padding: 30upx 30upx 0;
		.pro-banner-img {
			width: 100%;
			height: 276upx;
			background-color: $img-bg;
			border-radius: 20upx;
			margin-bottom: 50upx;
			overflow: hidden;
		}
		.pro-type-enter {
			margin-bottom: 80upx;
			.pro-type-title {
				font-size: 32upx;
				color: $text-main-black;
				font-weight: 800;
				margin-bottom: 10upx;
			}
			.pro-type-desc {
				font-size: 24upx;
				color: $text-grey;
			}
			.pro-type-img-1 {
				width: 198upx;
				height: 192upx;
				background-color: $img-bg;
				margin: 0 auto;
				margin-top: 30upx;
			}
			.pro-type-img-2 {
				width: 108upx;
				height: 116upx;
				position: absolute;
				right: 0;
				bottom: 0;
				background-color: $img-bg;
			}
			.pro-type-img-3 {
				width: 84upx;
				height: 128upx;
				background-color: $img-bg;
				margin-top: 20upx;
			}
			.pro-type-box-1 {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 348upx;
				margin-bottom: 20upx;
				.pro-type-1 {
					width: 318upx;
					height: 100%;
					border-radius: 20upx;
					overflow: hidden;
					background-color: $img-second-bg;
					padding: 40upx 30upx 0;
				}
				.pro-type-double {
					height: 100%;
					width: 352upx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.pro-type-2 {
						position: relative;
						height: 164upx;
						width: 100%;
						display: flex;
						justify-content: center;
						flex-direction: column;
						padding: 0 40upx;
						background-color: $img-second-bg;
						border-radius: 20upx;
					}
				}
			}
			.pro-type-box-2 {
				display: flex;
				justify-content: space-between;
				.pro-type-3 {
					background-color: $img-second-bg;
					border-radius: 20upx;
					width: 216upx;
					height: 276upx;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
				}
			}
		}
		.hot-pro-title {
			font-size: 40upx;
			color: $text-main-black;
			font-weight: 800;
			margin-bottom: 40upx;
		}
		.hot-pro-list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.item-show-pro {
				width: 334upx;
				border-radius: 12upx;
				overflow: hidden;
				box-shadow: 0 10upx 20upx 0 rgba(0,0,0,0.05);
				background-color: $text-color;
				margin-bottom: 40upx;
				.item-pro-img {
					width: 100%;
					height: 334upx;
					background-color: $img-bg;
				}
				.item-pro-info {
					padding: 10upx 20upx 20upx;
					.item-pro-title {
						font-size: 28upx;
						color: $text-second-black;
						font-weight: 600;
						margin-bottom: 10upx;
					}
					.item-pro-tags {
						display: flex;
						flex-wrap: wrap;
						margin-bottom: 10upx;
						text {
							display: block;
							font-size: 24upx;
							color: #7A8188;
							padding: 2upx 10upx;
							background-color: $img-second-bg;
							&:not(:last-child) {
								margin-right: 10upx;
							}
						}
					}
					.item-pro-price {
						display: flex;
						align-items: center;
						justify-content: space-between;
						.item-pro-sell-price {
							font-size: 24upx;
							color: $text-red;
							font-weight: 600;
							text {
								display: inline-block;
								font-size: 32upx;
							}
						}
						.item-pro-ori-price {
							font-size: 20upx;
							color: $text-grey;
							text-decoration: line-through;
						}
					}
				}
			}
		}
	}
</style>
