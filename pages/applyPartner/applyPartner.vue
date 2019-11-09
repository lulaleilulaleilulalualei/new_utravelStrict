<template>
	<view class="applyPartner">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">申请合伙人</block></cu-custom>
		<view class="contentBox">
			<view class="topPersonInfo">
				<view class="smallTitle">个人信息</view>
				<view class="itemPersonInfo">
					<view class="itemInfoTitle">手机号码</view>
					<view class="itemInfoInput">
						<input type="number"  @blur="getPartnerTel" @confirm="getPartnerTel" placeholder="请输入手机号码"/>
					</view>
				</view>
				<view class="itemPersonInfo">
					<view class="itemInfoTitle">绑定微信</view>
					<view class="itemInfoInput">思密达大</view>
				</view>
				<view class="itemPersonInfo">
					<view class="itemInfoTitle">代理区域</view>
					<view class="itemInfoInput">
						<picker class="pickerBox" mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
						    <view class="itemPicker">
								<text>
									<block v-if="region.length != 0">
										{{region[0]}}，{{region[1]}}，{{region[2]}}
									</block>
								</text>
						    </view>
						  </picker>
					</view>
				</view>
			</view>
			<view class="partnerCondition">
				<view class="smallTitle">合伙人任务</view>
				<view class="conditionIntro">成功邀请5位好友注册，激活合伙人申请</view>
				<view class="toInviteFriends">
					<view class="toInviteFriendsLeft">
						<view class="toInviteImg"></view>
						<view class="toInviteNum">
							<view class="toInviteNumTxt">邀请好友注册（0/5）</view>
							<view class="toInviteNumAward">奖励部分</view>
						</view>
					</view>
					<view class="toInviteFriendsRight">去邀请</view>
				</view>
				<label class="radio toReadProtocol" @click="toSelectAgreeProtocal">
					 <view :class="['selectAgreeBtn', {'to-active-agree': isCheckApply}]">
					 	<text v-if="isCheckApply" class="cuIcon-check lg"></text>
					 </view>
					 <view class="toAgreeProTocal">我已阅读并同意签署 <text @click.stop="toReadPartnerProtocal">《优旅家严选合伙人协议》</text></view>
				</label>
			</view>
		</view>
		
		<view class="toApplyBtn">确认申请</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				region: [],
				customItem: '',
				isCheckApply: true,
			}
		},
		methods: {
			getPartnerTel(val) {
				
			},
			bindRegionChange(val) {
				this.region = val.detail.value
			},
			toSelectAgreeProtocal() {
				this.isCheckApply = !this.isCheckApply
			},
			toReadPartnerProtocal() {
				uni.navigateTo({
					url: '/pages/applyPartner/partnerProtocal'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.toApplyBtn {
		position: fixed;
		left: 30upx;
		bottom: 70upx;
		width: 690upx;
		height: 88upx;
		background-color: $main-color;
		border-radius: 4px;
		line-height: 88upx;
		text-align: center;
		letter-spacing: 1upx;
		font-size: 32upx;
		color: $text-main-black;
	}
	.contentBox {
		padding: 40upx 30upx 0;
		.smallTitle {
			font-size: 28upx;
			color: #979797;
			margin-bottom: 10upx;
		}
		.topPersonInfo {
			margin-bottom: 40upx;
			&::after {
				content: '';
				display: block;
				width: 100%;
				height: 10upx;
				background-color: #F1F1F5;
			}
			.itemPersonInfo {
				height: 110upx;
				width: 100%;
				display: flex;
				font-size: 28upx;
				color: #000000;
				.itemInfoTitle {
					line-height: 110upx;
					margin-right: 40upx;
				}
				.itemInfoInput {
					flex: 1;
					overflow: hidden;
					height: 100%;
					line-height: 110upx;
					input {
						width: 100%;
						height: 100%;
						font-size: 28upx;
						color: #000000;
					}
				}
				&:not(:last-child) {
					border-bottom: 1px solid #CACACA;
				}
				.pickerBox {
					height: 100%;
				}
				.itemPicker {
					height: 110upx;
					line-height: 40upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					text {
						flex: 1;
						overflow: hidden;
					}
					&::after {
						content: '';
						display: block;
						width: 12upx;
						height: 12upx;
						border: 4upx solid #000;
						border-left-color: transparent;
						border-top-color: transparent;
						transform: rotate(-45deg);
						margin: 0 10upx;
					}
				}
			}
		}
		.partnerCondition {
			padding-top: 40upx;
			.conditionIntro {
				font-size: 28upx;
				color: #000000;
				margin-bottom: 30upx;
			}
			.toInviteFriends {
				background: #F5F7F9;
				border-radius: 4px;
				padding: 40upx 30upx;
				margin-bottom: 60upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.toInviteFriendsLeft {
					display: flex;
					height: 68upx;
					.toInviteImg {
						width: 68upx;
						height: 68upx;
						border-radius: 50%;
						overflow: hidden;
						margin-right: 30upx;
						background-color: $img-bg;
					}
					.toInviteNum {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						.toInviteNumTxt {
							font-size: 28upx;
							color: #000000;
							font-weight: 600;
						}
						.toInviteNumAward {
							font-size: 24upx;
							color: #FFB41B;
						}
					}
				}
				.toInviteFriendsRight {
					display: flex;
					align-items: center;
					font-size: 28upx;
					color: #749DFC;
					&::after {
						content: '';
						display: block;
						width: 12upx;
						height: 12upx;
						border: 4upx solid #E0E0E0;
						border-left-color: transparent;
						border-top-color: transparent;
						margin-left: 16upx;
						transform: rotate(-45deg);
					}
				}
			}
			.toReadProtocol {
				display: flex;
				align-items: center;
				.selectAgreeBtn {
					width: 30upx;
					height: 30upx;
					border: 1px solid $border-color;
					margin-right: 20upx;
				}
				.to-active-agree {
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 24upx;
					border-color: transparent;
					background-color: $main-color;
					color: $text-main-black;
					font-weight: 800;
				}
				.toAgreeProTocal {
					font-size: 28upx;
					color: #000000;
					line-height: 40upx;
					text {
						color: $text-blue;
					}
				}
			}
		}
	}
</style>
