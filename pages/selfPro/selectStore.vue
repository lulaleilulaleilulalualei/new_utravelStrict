<template>
	<view class="select-store">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">选择门店</block></cu-custom>
		<view class="content-box">
			<view class="search-store">
				<view class="search-icon"><image src="/static/search-icon.png" mode=""></image></view>
				<view class="search-input">
					<input type="text" value="" placeholder="搜索目的地/产品名" placeholder-style="color: #CED2DA" />
				</view>
			</view>
			<view class="store-list">
				<view class="item-store" v-for="(item, idx) in 5" :key="idx" @tap="toSelectStore(idx)">
					<view :class="['item-select-icon', {'item-active-store': curIdx == idx}]"></view>
					<view class="item-store-box">
						<view class="item-store-title">
							<view class="item-sotre-title-txt">益阳去哪儿店</view>
							<view class="item-sotre-title-dis">离您最近0.04km</view>
						</view>
						<view class="item-store-open-time">08:00-20:00</view>
						<view class="item-store-address">湖南省益阳市赫山区秀峰公园518号</view>
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
				curIdx: 0, //
			}
		},
		methods: {
			toSelectStore(idx) {
				this.curIdx = idx
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content-box {
		padding: 30upx;
		.search-store {
			width: 100%;
			height: 64upx;
			display: flex;
			align-items: center;
			padding: 0 30upx;
			border-radius: 32upx;
			overflow: hidden;
			background-color: $img-second-bg;
			.search-icon {
				width: 30upx;
				height: 30upx;
				margin-right: 20upx;
			}
			.search-input {
				flex: 1;
				height: 100%;
				input {
					font-size: 28upx;
					color: $text-main-black;
					display: block;
					height: 100%;
				}
			}
		}
		.store-list {
			.item-store {
				display: flex;
				padding: 30upx 0;
				&:not(:last-child) {
					border-bottom: 1px solid #E5E5E5;
				}
				.item-select-icon {
					width: 28upx;
					height: 28upx;
					background-color: transparent;
					border-radius: 50%;
					margin-right: 20upx;
					position: relative;
					top: 4upx;
				}
				.item-active-store {
					background-color: $main-color;
				}
				.item-store-box {
					flex: 1;
					.item-store-title {
						display: flex;
						justify-content: space-between;
						align-items: flex-end;
						margin-bottom: 20upx;
						.item-sotre-title-txt {
							font-size: 32upx;
							color: $text-main-black;
							font-weight: 700;
						}
						.item-sotre-title-dis {
							font-size: 28upx;
							color: $text-second-black;
						}
					}
					.item-store-open-time {
						font-size: 24upx;
						color: $text-grey;
						margin-bottom: 10upx;
					}
					.item-store-address {
						font-size: 24upx;
						color: $text-grey;
					}
				}
			}
		}
	}
</style>
