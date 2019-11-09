<template>
	<view class="noListData">
		<view class="noDataImg"><img src="/static/noData.png" alt=""></view>
		<view class="noDataText">{{noText}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props: {
			noText: {
				type: String,
				default: '还没有数据~'
			}
		}
	}
</script>

<style scoped lang="scss">
	.noListData {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 666;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		.noDataImg {
			width: 224upx;
			height: 158upx;
			margin-bottom: 40upx;
		}
		.noDataText {
			font-size: 28upx;
			color: $uni-text-color-grey;
			text-align: center;
		}
	}
</style>
