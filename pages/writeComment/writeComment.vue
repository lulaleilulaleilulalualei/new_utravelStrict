<template>
	<view class="writeComment" :style="[{minHeight: pageMinH}]">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">{{navTitle}}</block></cu-custom>
		<view class="pro-info">
			<view class="pro-info-img"><image src="" mode=""></image></view>
			<view class="pro-info-box">
				<view class="pro-info-title">香港一日游香港一日游香港一日游香港一日游香港一日游香港一日游香港一日游香港一日游</view>
				<view class="pro-info-time">订购日期： 2019-08-08</view>
			</view>
		</view>
		<view class="pro-grade">
			<view class="pro-grade-title">产品评分</view>
			<view class="pro-grade-list">
				<!-- <text class="seleted-star cuIcon-favorfill lg"></text> -->
				<text :class="[{'cuIcon-favorfill': starIdx >= idx+1}, {'cuIcon-favor': starIdx < idx+1}, 'lg', {'seleted-star': starIdx >= idx+1}]" v-for="(item, idx) in 5" :key="idx" @tap="seletProStar(idx)"></text>
			</view>
		</view>
		<view class="pro-text-inp">
			<textarea value="" placeholder="请输入您的评价" placeholder-style="color: #909399;"/>
		</view>
		<view class="to-upload-img">
			<view class="upload-img-list">
				<view class="item-upload-img" v-for="(item, idx) in 9" :key="idx">
					<image src="" mode="aspectFill"></image>
					<text class="cuIcon-roundclosefill lg text-gray"></text>
				</view>
				<view class="to-upload-btn">
					<text class="cuIcon-camera lg"></text>
				</view>
			</view>
		</view>
		<view class="show-commom-tags">
			<view class="item-com-tag">服务很好</view>
			<view class="item-com-tag item-active-com-tag">值得买</view>
			<view class="item-com-tag">服务很好</view>
			<view class="item-com-tag">值得买</view>
			<view class="item-com-tag item-active-com-tag">服务很好</view>
			<view class="item-com-tag">值得买</view>
		</view>
		
		<view class="to-complete-btn">完成</view>
		<!-- 底部顶高 -->
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navTitle: '评价产品',
				starIdx: null, //评分
			}
		},
		computed: {
			pageMinH() {
				let sys = uni.getSystemInfoSync()
				return sys.windowHeight + 'px'
			}
		},
		methods: {
			seletProStar(idx) {
				this.starIdx = idx+1
			}
		}
	}
</script>

<style scoped lang="scss">
	.writeComment {
		width: 100%;
		background-color: #F6F9FA;
	}
	.pro-info {
		padding: 30upx;
		margin-bottom: 20upx;
		background-color: $text-color;
		display: flex;
		align-items: center;
		.pro-info-img {
			width: 260upx;
			height: 180upx;
			background-color: $img-bg;
			margin-right: 20upx;
		}
		.pro-info-box {
			height: 180upx;
			flex: 1;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.pro-info-title {
				font-size: 32upx;
				color: $text-second-black;
				font-weight: 700;
				@extend .ellipse2;
			}
			.pro-info-time {
				font-size: 24upx;
				color: $text-grey;
			}
		}
	}
	.pro-grade {
		padding: 30upx;
		background-color: $text-color;
		margin-bottom: 20upx;
		display: flex;
		align-items: center;
		.pro-grade-title {
			font-size: 28upx;
			color: $text-main-black;
			font-weight: 600;
			margin-right: 40upx;
		}
		.pro-grade-list {
			display: flex;
			align-items: center;
			.cuIcon-favorfill {
				font-size: 40upx;
				color: #E6E6E6;
				&:not(:last-child) {
					margin-right: 30upx;
				}
			}
			.seleted-star {
				color: $main-color
			}
		}
	}
	.pro-text-inp {
		width: 100%;
		height: 240upx;
		border-bottom: 1px solid $border-color;
		background-color: $text-color;
		padding: 30upx;
		textarea {
			display: block;
			width: 100%;
			height: 100%;
			font-size: 28upx;
			color: $text-main-black;
		}
	}
	.to-upload-img {
		padding: 30upx;
		background-color: $text-color;
		.upload-img-list {
			display: flex;
			flex-wrap: wrap;
			.item-upload-img {
				width: 165upx;
				height: 165upx;
				background-color: $img-bg;
				position: relative;
				margin-bottom: 10upx;
				&:not(:nth-child(4n)) {
					margin-right: 10upx;
				}
				.cuIcon-roundclosefill {
					position: absolute;
					top: 0;
					right: 0;
					z-index: 1;
					font-size: 40upx;
				}
			}
		}
		.to-upload-btn {
			width: 165upx;
			height: 165upx;
			border: 1px dashed $border-color;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 40px;
			color: $text-grey;
		}
	}
	.show-commom-tags {
		display: flex;
		padding: 30upx;
		flex-wrap: wrap;
		.item-com-tag {
			padding: 6upx 20upx;
			background: $text-color;
			border-radius: 8upx;
			font-size: 24upx;
			color: $text-grey;
			margin: 0 20upx 20upx 0;
		}
		.item-active-com-tag {
			background-color: $main-color;
			color: $text-main-black;
		}
	}
	.to-complete-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 10;
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
		font-size: 32upx;
		color: $text-main-black;
		background-color: $main-color;
	}
	
</style>
