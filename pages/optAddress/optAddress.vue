<template>
	<view class="receiverAddress">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">{{typeTitle}}</block></cu-custom>
		<form @submit="formSubmit">
		<view class="contentBox">
			<view class="addressInfo">
				<view class="itemAddressInfo">
					<view class="itemInfoName">收货人：</view>
					<view class="itemInfoInp">
						<input type="text" name="userName" :value="userName" />
					</view>
				</view>
				<view class="itemAddressInfo">
					<view class="itemInfoName">手机号码：</view>
					<view class="itemInfoInp">
						<input type="number" name="userTel" :value="userTel" />
					</view>
				</view>
				<view class="itemAddressInfo">
					<view class="itemInfoName">所在地区：</view>
					<view class="itemInfoPicker">
						<picker class="pickerSelectBox" mode="region" :value="region" :custom-item="customItem" @change="bindPickerChange">
							<view class="showPickerInfo">
								<text v-if="isSelectPicker">{{region[0]}}, {{region[1]}}, {{region[2]}}</text>
							</view>
						</picker>
					</view>
				</view>
				<view class="itemAddressInfo">
					<view class="itemInfoName">详细地址：</view>
					<view class="itemInfoArea">
						<textarea class="itemInfoTextarea"  name="detailAddress" :value="detailAddress" placeholder="街道、门牌号、小区、楼栋号、单元室等" />
					</view>
				</view>
			</view>
			<view class="to-select-default-address">
				<view class="select-default-address-title">设为默认地址</view>
				<switch class="utravelColor sm" :checked="isDefAddress" @change="bindAddessSwitch" />
			</view>
			
		</view>
		<button form-type="submit" class="toSaveAddress">保存并使用</button>
		</form>
	</view>
</template>

<script>
	import { mapGetters , mapActions } from 'vuex';
	
	export default {
		data() {
			return {
				userName: '',
				userTel: '',
				region: ['北京市', '北京市', '东城区'],
				customItem: '',
				isSelectPicker: false,
				detailAddress: '',
				typeTitle: '添加新收货地址',
				isDefAddress: false,
				
				optType: '' ,//操作类型
				infoObj: null, //编辑的对象
			}
		},
		computed: {
			...mapGetters([
				'addressObj'
			])
		},
		onLoad(opt) {
			if(this.addressObj) {
				this.infoObj = this.addressObj
			}
			
			if(opt.type == 'add') {
				this.typeTitle = "添加新收货地址"
			}else if(opt.type == 'edit') {
				this.typeTitle = "编辑收货地址"
				this.userName = this.infoObj.name
				this.userTel = this.infoObj.tel
				this.isSelectPicker = true
				this.region = [this.infoObj.province, this.infoObj.city, this.infoObj.area]
				this.detailAddress = this.infoObj.address
				this.isDefAddress = this.infoObj.is_default == 1? true: false
				this.toGetAddressObj(null)
			}
			this.optType = opt.type
		},
		methods: {
			...mapActions([
				'toGetAddressObj'
			]),
			bindPickerChange(e) {
				this.isSelectPicker = true
				this.region = e.detail.value
			},
			bindAddessSwitch(e) {
				this.isDefAddress = e.detail.value
			},
			formSubmit(e) {
				let val = e.detail.value
				
				if(this.$api.trim(val.userName) != '') {
					if(this.$api.inputTest(val.userTel, 'tel')) {
						if(this.isSelectPicker) {
							if(this.$api.trim(val.detailAddress) != '') {
								this.userName = val.userName
								this.userTel = val.userTel
								this.detailAddress = val.detailAddress
								this.optAddressMay()
							}else {
								this.$api.warnNotice('详细地址不能为空')
							}
						}else {
							this.$api.warnNotice('请选择所在地区')
						}
					}
				}else {
					this.$api.warnNotice('收货人不能为空')
				}
			},
			optAddressMay() {
				let data = {
					name: this.userName,
					tel: this.userTel,
					province: this.region[0],
					city: this.region[1],
					area: this.region[2],
					address: this.detailAddress,
					is_default: this.isDefAddress? 1: 0
				}
				if(this.optType == 'edit') {
					data.adr_id = this.infoObj.adr_id
				}
				this.$api.ajax({
					url: this.optType == 'add'? this.$config.addAddress: this.$config.updateAddress,
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
									if(this.isDefAddress) {
										this.$api.userLogin(() => {})
									}
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
	.receiverAddress {
		width: 100%;
		height: 100%;
		background-color: #F6F9FA;
		.contentBox {
			width: 100%;
			height: auto;
			background: #F1F1F5;
		}
	}
	.addressInfo {
		width: 100%;
		height: auto;
		background-color: #fff;
		padding: 0 30upx;
		margin-bottom: 20upx;
		.itemAddressInfo {
			display: flex;
			height: auto;
			width: 100%;
			&:not(:last-child) {
				border-bottom: 1px solid #E4E6E9;
			}
			.itemInfoName {
				width: 140upx;
				font-size: 28upx;
				color: $text-main-black;
				line-height: 100upx;
				margin-right: 20upx;
			}
			.itemInfoInp {
				flex: 1;
				height: 100upx;
				input {
					display: block;
					width: 100%;
					height: 100%;
					font-size: 28upx;
					color: $text-main-black;
				}
			}
			.itemInfoPicker {
				flex: 1;
				min-height: 100upx;
				.pickerSelectBox {
					width: 100%;
					height: 100%;
					.showPickerInfo {
						width: 100%;
						min-height: 100upx;
						padding: 30upx 0;
						line-height: 44upx;
						display: flex;
						align-items: center;
						justify-content: flex-end;
						font-size: 28upx;
						color: $text-main-black;
						&::after {
							content: '';
							display: block;
							width: 10upx;
							height: 10upx;
							border: 2upx solid #B5B5B5;
							border-left-color: transparent;
							border-top-color: transparent;
							transform: rotate(-45deg);
							margin-left: 10upx;
						}
					}
				}
			}
			.itemInfoArea {
				flex: 1;
				height: 150upx;
				padding: 30upx 0;
				.itemInfoTextarea {
					width: 100%;
					height: 100%;
					font-size: 28upx;
					line-height: 44upx;
					color: $text-main-black;
				}
			}
		}
	}
	.to-select-default-address {
		padding: 30upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: $text-color;
		.select-default-address-title {
			font-size: 28upx;
			color: $text-main-black;
		}
	}
	.toSaveAddress {
		position: fixed;
		bottom: 30upx;
		left: 30upx;
		width: 690upx;
		height: 100upx;
		text-align: center;
		line-height: 100upx;
		font-size: 32upx;
		color: $uni-text-color;
		background-color: $main-color;
	}
</style>
