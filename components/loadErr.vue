<template>
	<view class="loadErr">
		<view class="loadErrImg"><img src="/static/noInternet.png" alt=""></view>
		<view class="loadErrText">好像出错了~</view>
		<view class="reloadBtn" @click="toRelaod">重新加载</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toRelaod() {
				this.$emit('toRelaodData', true)
			}
		}
	}
</script>

<style scoped lang="scss">
	.loadErr {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		.loadErrImg {
			width: 258upx;
			height: 206upx;
			margin-bottom: 40upx;
		}
		.loadErrText {
			font-size: 28upx;
			color: $uni-text-color-grey;
			text-align: center;
		}
		.reloadBtn {
			width: 200upx;
			height: 70upx;
			text-align: center;
			line-height: 70upx;
			border-radius: 12upx;
			font-size: 32upx;
			color: $uni-text-color;
			background-color: $main-color;
			position: absolute;
			bottom: 200upx;
			left: 50%;
			margin-left: -100upx;
		}
	}
</style>
