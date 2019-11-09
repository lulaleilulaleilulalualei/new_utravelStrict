<template>
	<view class="editTel">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">修改号码</block></cu-custom>
		
		<view class="edit-box">
			<template v-if="curStep == 1">
				<view class="item-edit-input-box">
					<view class="item-edit-input-icon">+86</view>
					<input class="item-edit-input" type="text" placeholder="请输入当前绑定手机号" />
				</view>
				<view class="item-edit-input-box">
					<view class="item-edit-input-icon">+86</view>
					<input class="item-edit-input" type="text" placeholder="请输入新手机号" />
				</view>
			</template>
			<template v-if="curStep == 2">
				<view class="edit-box-notice">已发送验证码到 188****8665 的手机号</view>
				<view class="item-edit-input-box">
					<input class="item-edit-input" type="text" placeholder="请输入验证码" />
				</view>
			</template>
			
			
			<view class="to-sure-btn" @tap="toCompleteStep">{{btnText}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnText: '下一步',
				curStep: 1, //第一步
			}
		},
		methods: {
			toCompleteStep() {
				if(this.curStep == 1) {
					this.curStep++
					this.btnText = '完成'
				}else {
					
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.edit-box {
		padding: 40upx 30upx 0;
		.edit-box-notice {
			font-size: 28upx;
			color: $text-grey;
		}
		.item-edit-input-box {
			width: 100%;
			height: 120upx;
			display: flex;
			align-items: center;
			border-bottom: 1px solid $border-color;
			.item-edit-input-icon {
				font-size: 32upx;
				color: $text-second-black;
				padding-right: 20upx;
				margin-right: 20upx;
				border-right: 1px solid $border-color;
				font-weight: 600;
			}
			.item-edit-input {
				flex: 1;
				height: 100%;
				font-size: 32upx;
				color: $text-second-black;
			}
		}
		
		.to-sure-btn {
			margin-top: 80upx;
			width: 100%;
			height: 80upx;
			background-color: $main-color;
			text-align: center;
			line-height: 80upx;
			font-size: 28upx;
			color: $text-second-black;
			font-weight: 700;
		}
	}
</style>
