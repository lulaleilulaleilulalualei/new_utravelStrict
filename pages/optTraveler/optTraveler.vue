<template>
	<view class="optTraveler">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">{{navTitle}}</block></cu-custom>
		
		<view class="item-tvl-info">
			<view class="item-tvl-title">中文姓名</view>
			<view class="item-tvl-inp">
				<input type="text" placeholder="需与证件信息一致" :value="userName" @confirm="toGetName" @blur="toGetName" placeholder-style="color: color: #909399;" />
			</view>
		</view>
		<view class="item-tvl-info">
			<view class="item-tvl-title">证件类型</view>
			<view class="item-tvl-inp">
				<picker class="item-tvl-picker" @change="bindPickerChange" :value="papersIdx" :range="papersArray">
				    <view class="item-tvl-picker-txt">
						<text>{{papersArray[papersIdx]}}</text>
					</view>
				</picker>
			</view>
		</view>
		<view class="item-tvl-info">
			<view class="item-tvl-title">证件号码</view>
			<view class="item-tvl-inp">
				<input type="text" placeholder="所持证件号码" :value="userCardNo" @confirm="toGetCardNo" @blur="toGetCardNo" placeholder-style="color: color: #909399;" />
			</view>
		</view>
		<view class="item-tvl-info">
			<view class="item-tvl-title">手机号码</view>
			<view class="item-tvl-inp">
				<view class="item-tvl-inp-tel"><text>86</text></view>
				<input type="number" placeholder="用户接收确认信息" :value="userTel" @confirm="toGetTel" @blur="toGetTel" placeholder-style="color: color: #909399;" />
			</view>
		</view>
		
		<view class="to-complete">
			<view class="complete-box" @tap="toComleteBtn">完成</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	
	export default {
		data() {
			return {
				navTitle: "新增出行人",
				papersIdx: 0,
				papersArray: ['身份证'],
				userName: '',
				userCardNo: '',
				userTel: '',
				optType: null, //操作类型
				infoObj: null, //用户信息
			}
		},
		computed: {
			...mapGetters([
				'tvlObj'
			]),
		},
		onLoad(opt) {
			if(this.tvlObj) {
				this.infoObj = this.tvlObj
			}
			
			if(opt.type == 'add') {
				this.navTitle = "新增出行人"
			}else if(opt.type == 'edit') {
				this.navTitle = "编辑出行人"
				this.userName = this.infoObj.ch_name
				this.userCardNo = this.infoObj.id_num
				this.userTel = this.infoObj.tel
				this.toGetTvlObj(null)
			}
			this.optType = opt.type
		},
		methods: {
			...mapActions([
				'toGetTvlObj'
			]),
			bindPickerChange(e) {
				this.papersIdx = e.detail.value
			},
			toGetName(e) {
				this.userName = this.$api.trim(e.detail.value)
			},
			toGetCardNo(e) {
				this.userCardNo = this.$api.trim(e.detail.value)
			},
			toGetTel(e) {
				this.userTel = this.$api.trim(e.detail.value)
			},
			toComleteBtn() {
				if(this.userName != '') {
					if(this.$api.inputTest(this.userCardNo, 'card')) {
						if(this.$api.inputTest(this.userTel, 'tel')) {
							this.optTravelerMay()
						}
					}
				}else {
					this.$api.warnNotice('请输入姓名')
				}
			},
			optTravelerMay() {
				let data = {
					ch_name: this.userName,
					id_num: this.userCardNo,
					tel: this.userTel
				}
				if(this.optType == 'edit') {
					data.id = this.infoObj.id
				}
				this.$api.ajax({
					url: this.optType == 'add'? this.$config.createUser: this.$config.updateUser,
					method: this.optType == 'add'? 'POST': 'PUT',
					data: data
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						uni.showToast({
							title: '操作成功',
							icon: 'success',
							mask: true,
							success: () => {
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 1500)
							}
						})
					}else {
						this.$api.warnNotice(res.data.message)
					}
				})
				.catch((err) => {
					this.$api.warnNotice('操作失败')
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.item-tvl-info {
		width: 100%;
		height: 100upx;
		display: flex;
		.item-tvl-title {
			font-size: 28upx;
			line-height: 100upx;
			color: $text-third-black;
			font-weight: 700;
			padding: 0 30upx;
		}
		.item-tvl-inp {
			flex: 1;
			overflow: hidden;
			display: flex;
			align-items: center;
			border-bottom: 1px solid  #EFEFEF;
			padding-left: 20upx;
			input {
				height: 100%;
				flex: 1;
				font-size: 28upx;
				color: $text-second-black;
			}
			.item-tvl-inp-tel {
				height: 100%;
				margin-right: 50upx;
				display: flex;
				align-items: center;
				text {
					display: inline-block;
					font-size: 28upx;
					font-weight: 600;
					color: $text-second-black;
					padding-right: 50upx;
					border-right: 1px solid #EFEFEF;
				}
			}
			.item-tvl-picker {
				height: 100%;
				flex: 1;
				font-size: 28upx;
				color: $text-second-black;
				.item-tvl-picker-txt {
					display: flex;
					align-items: center;
					height: 100upx;
					text { flex: 1 }
					&:after {
						content: '';
						display: block;
						width: 16upx;
						height: 16upx;
						border: 2upx solid #CCCCCC;
						border-top-color: transparent;
						border-left-color: transparent;
						transform: rotate(45deg);
						margin: 0 20upx;
					}
				}
			}
		}
	}
	
	.to-complete {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 10;
		width: 100%;
		height: auto;
		background-color: $text-color;
		padding: 0 30upx 60upx;
		.complete-box {
			width: 100%;
			height: 88upx;
			background-color: $main-color;
			line-height: 88upx;
			text-align: center;
			font-size: 32upx;
			color: $text-main-black;
		}
	}
</style>
