<template>
	<view class="selectProSize" data-sign="sizeBox" @tap="toOutCloseBox">
		<view class="pro-size-box">
			<view class="show-pro-size">
				<view class="show-pro-img"><image src="" mode=""></image></view>
				<view class="show-pro-price">
					<text class="show-pro-price-txt">¥ 1999</text>
					<view class="show-pro-size-txt">
						选择 颜色 尺码
					</view>
				</view>
			</view>
			<view class="show-size-box">
				<scroll-view class="show-size-box-scroll" :scroll-y="true">
					<view class="show-pro-size-1">
						<view class="show-pro-size-title">颜色</view>
						<view class="show-pro-size-1-list">
							<view class="item-show-size-1">
								<view class="item-show-size-img"><image src="" mode=""></image></view>
								<view class="item-show-size-name">本黑</view>
							</view>
							<view class="item-show-size-1 select-active-size">
								<view class="item-show-size-img"><image src="" mode=""></image></view>
								<view class="item-show-size-name">本黑黑</view>
							</view>
						</view>
					</view>
					<view class="show-pro-size-2">
						<view class="show-pro-size-title">尺码</view>
						<view class="show-pro-size-2-list">
							<view class="item-size-2-tag select-active-size">XL</view>
							<view class="item-size-2-tag">S</view>
						</view>
					</view>
					<view class="to-buy-pro-num">
						<view class="show-pro-size-title">购买数量</view>
						<view class="show-select-num-box">
							<view class="show-mul-num-box">
								<text class="cuIcon-move lg"></text>
							</view>
							<view class="show-num-box">1</view>
							<view class="show-add-num-box">
								<text class="cuIcon-add lg"></text>
							</view>
						</view>
					</view>
					<!-- 底部顶高 -->
					<view class="cu-tabbar-height"></view>
				</scroll-view>
			</view>
			<view class="to-sure-btn" @tap="toSureSelectSize">确定</view>
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
			toOutCloseBox(e) {
				let sign = e.target.dataset.sign
				if(sign) {
					this.$emit('toCloseSizeBox', {status: false, sizeData: null})
				}
			},
			toSureSelectSize() {
				this.$emit('toCloseSizeBox', {status: false, sizeData: {}})
			}
		}
	}
</script>

<style scoped lang="scss">
	.selectProSize {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 200;
		background-color: rgba(0,0,0,0.6);
		.pro-size-box {
			position: absolute;
			left: 0;
			bottom:0;
			width: 100%;
			height: 840upx;
			background-color: #F7F7F7;
			border-radius: 20upx 20upx 0 0;
			display: flex;
			flex-direction: column;
			overflow: hidden;
			.show-pro-size {
				padding: 30upx;
				background-color: $text-color;
				display: flex;
				align-items: center;
				margin-bottom: 20upx;
				.show-pro-img {
					width: 162upx;
					height: 162upx;
					background-color: $img-bg;
					margin-right: 30upx;
				}
				.show-pro-price {
					flex: 1;
					position: relative;
					height: 162upx;
					font-size: 32upx;
					color: $text-red;
					.show-pro-price-txt {
						line-height: 162upx;
					}
					.show-pro-size-txt {
						position: absolute;
						left: 0;
						bottom: 0;
						font-size: 24upx;
						color: $text-main-black;
					}
				}
			}
		}
		.to-sure-btn {
			position: absolute;
			bottom: 0;
			left: 0;
			height: 100upx;
			width: 100%;
			text-align: center;
			line-height: 100upx;
			font-size: 28upx;
			color: $text-main-black;
			background-color: $main-color;;
		}
	}
	.show-size-box {
		padding: 0 30upx;
		background-color: $text-color;
		flex: 1;
		overflow: hidden;
		width: 100%;
		.show-size-box-scroll {
			width: 100%;
			height: 100%;
			.show-pro-size-title {
				font-size: 28upx;
				color: $text-main-black;
			}
			.show-pro-size-1 {
				padding: 30upx 30upx 10upx;
				border-bottom: 1px solid $border-color;
				.show-pro-size-1-list {
					margin-top: 20upx;
					display: flex;
					flex-wrap: wrap;
					.item-show-size-1 {
						display: flex;
						align-items: center;
						padding: 10upx 20upx 10upx 10upx;
						border-radius: 8upx;
						background: #F7F5F6;
						margin: 0 20upx 20upx 0;
						.item-show-size-img {
							width: 44upx;
							height: 44upx;
							background-color: $text-third-black;
							margin-right: 10upx;
						}
						.item-show-size-name {
							font-size: 24upx;
							color: $text-grey;
						}
					}
					.select-active-size {
						background-color: $main-color;
						.item-show-size-name {
							color: $text-main-black;
						}
					}
				}
			}
			.show-pro-size-2 {
				padding: 30upx 30upx 10upx;
				border-bottom: 1px solid $border-color;
				.show-pro-size-2-list {
					margin-top: 20upx;
					display: flex;
					flex-wrap: wrap;
					.item-size-2-tag {
						padding: 14upx 20upx;
						border-radius: 8upx;
						border-radius: 4px;
						font-size: 24upx;
						color: $text-grey;
						margin: 0 20upx 20upx 0;
						background: #F7F5F6;
					}
					.select-active-size {
						background-color: $main-color;
						color: $text-main-black;
					}
				}
			}
			.to-buy-pro-num {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30upx 0;
				.show-select-num-box {
					display: flex;
					align-items: center;
					.show-mul-num-box {
						width: 66upx;
						height: 64upx;
						margin-right: 2upx;
						display: flex;
						align-items: center;
						justify-content: center;
						background: #FBFBFB;
						border-radius: 4upx 0 0 4upx;
						font-size: 28upx;
						color: #D8DCE6;
					}
					.show-num-box {
						width: 76upx;
						height: 64upx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 28upx;
						color: $text-second-black;
						font-weight: 700 ;
						background: #F7F5F6;
					}
					.show-add-num-box {
						width: 66upx;
						height: 64upx;
						margin-left: 2upx;
						display: flex;
						align-items: center;
						justify-content: center;
						background: #F7F5F6;
						border-radius: 0 4upx 4upx 0;
						font-size: 28upx;
						color: #909399;
					}
				}
			}
		}
	}
</style>
