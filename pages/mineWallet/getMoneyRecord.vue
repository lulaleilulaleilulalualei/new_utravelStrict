<template>
	<view class="getMoneyRecord">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">提现记录</block></cu-custom>
		<view class="get-record-list">
			<view class="item-record-box">
				<view class="item-record-box-info item-record-toIng">
					<view class="item-record-info-status">提现中</view>
					<view class="item-record-info-time">2019-11-23 14:38:54</view>
				</view>
				<view class="item-record-info-sum">¥100.00</view>
			</view>
			<view class="item-record-box">
				<view class="item-record-box-info item-record-toHad">
					<view class="item-record-info-status">提现已到账</view>
					<view class="item-record-info-time">2019-11-23 14:38:54</view>
				</view>
				<view class="item-record-info-sum">¥100.00</view>
			</view>
			<view class="item-record-box">
				<view class="item-record-box-info item-record-toFail">
					<view class="item-record-info-status">提现中</view>
					<view class="item-record-info-time">2019-11-23 14:38:54</view>
				</view>
				<view class="item-record-info-sum">¥100.00</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.get-record-list {
		padding: 0 30upx;
		.item-record-box {
			padding: 30upx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid $border-color;
			.item-record-box-info {
				.item-record-info-status {
					font-size: 28upx;
					font-weight: 600;
				}
				.item-record-info-time {
					font-size: 20upx;
					color: $text-grey;
				}
			}
			.item-record-toHad {
				.item-record-info-status {
					color: $text-second-black;
				}
			}
			.item-record-toIng {
				.item-record-info-status {
					color: $main-color;
				}
			}
			.item-record-toFail {
				.item-record-info-status {
					color: $text-red;
				}
			}
			.item-record-info-sum {
				font-size: 28upx;
				color: $text-second-black;
				font-weight: 600;
			}
		}
	}
</style>
