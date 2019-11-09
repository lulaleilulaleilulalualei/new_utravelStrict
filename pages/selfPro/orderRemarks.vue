<template>
	<view class="order-remarks">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">订单备注</block></cu-custom>
		
		<view class="contentBox">
			<view class="remarks-box">
				<textarea class="remarks-textarea" placeholder="请输入您的备注需求" />
			</view>
			<view class="remarks-history">
				<view class="item-remarks" v-for="(item, idx) in remarksArr" :key="idx">{{item}}</view>
			</view>
		</view>
		
		
		<view class="to-complete-btn" @tap="toCompleteRemarks">完成</view>
		<!-- 底部顶高 -->
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				remarksArr: ['多放点茶叶', '少放点珍珠']
			}
		},
		methods: {
			toCompleteRemarks() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.order-remarks {
		width: 100%;
		height: auto;
		.contentBox {
			width: 100%;
			height: auto;
			padding: 30upx;
		}
		.remarks-box {
			background-color: $text-color;
			width: 100%;
			height: auto;
			border: 1px solid #f5f5f5;
			margin-bottom: 20upx;
			.remarks-textarea {
				background-color: #F6F9FA;
				height: 300upx;
				width: 100%;
				font-size: 28upx;
				color: $text-second-black;
				padding: 20upx;
			}
		}
		.remarks-history {
			display: flex;
			flex-wrap: wrap;
			.item-remarks {
				border-radius: 2upx;
				padding: 4upx 10upx;
				background-color: $img-second-bg;
				font-size: 24upx;
				color: $text-second-black;
				margin: 0 10upx 10upx 0;
			}
		}
		.to-complete-btn {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 100upx;
			background-color: $main-color;
			line-height: 100upx;
			text-align: center;
			font-size: 32upx;
			color: $text-main-black;
		}
	}
</style>
