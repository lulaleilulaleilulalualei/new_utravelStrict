<template>
	<view class="backHome" @click="toBackHome">
		<view class="homeIcon"><img src="/static/home_icon.png" alt=""></view>
		<view class="homeText">首页</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toBackHome() {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.backHome {
		position: fixed;
		right: 40upx;
		bottom: 140upx;
		z-index: 888;
		border-radius: 10upx;
		background-color: rgba(0,0,0,0.2);
		padding: 2upx 16upx 6upx;;
		.homeIcon {
			width: 40upx;
			height: 40upx;
			margin-bottom: 4upx;
		}
		.homeText {
			font-size: 16upx;
			color: $uni-text-color;
			text-align: center;
		}
	}
</style>
