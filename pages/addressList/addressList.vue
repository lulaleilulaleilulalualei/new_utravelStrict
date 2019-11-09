<template>
	<view class="addressee">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">地址管理</block></cu-custom>
		<view class="address-list">
			<scroll-view class="address-list-scroll" :scroll-y="true">
				<view class="item-address-box" v-for="(item, idx) in addressList" :key="idx" @click="selectGetAddress(idx)">
					<view class="item-address-info">
						<view class="item-address-info-1">{{item.name}} {{item.tel}}</view>
						<view class="item-address-info-2">{{item.province}} {{item.city}} {{item.area}} {{item.address}}</view>
					</view>
					<view class="item-address-opt">
						<view class="show-default-address" v-if="item.is_default">默认地址</view>
						<view class="item-address-opt-box">
							<view class="item-address-edit" @click.stop="toOptAddress('edit', idx)"><image src="/static/edit_icon.png" mode=""></image></view>
							<view class="item-address-delete" @click.stop="toDeleteAddress(idx)"><image src="/static/delete_icon.png" mode=""></image></view>
						</view>
					</view>
				</view>
				<!-- 底部顶高 -->
				<view class="cu-tabbar-height"></view>
			</scroll-view>
		</view>
		
		<view class="to-address-btn" @tap="toOptAddress('add')">添加新收货地址</view>
		
		<loadErr v-if="isLoadErr" @toRelaodData="toRelaodData"></loadErr>
	</view>
</template>

<script>
	import loadErr from '@/components/loadErr.vue'
	import { mapGetters , mapActions } from 'vuex';
	
	export default {
		data() {
			return {
				addressList: [],
				isLoadErr: false, //页面加载出错
				fromType: null ,//页面来处
			}
		},
		onLoad(opt) {
			this.fromType = opt.from
		},
		onShow() {
			this.getAddressData()
		},
		methods: {
			...mapActions([
				'toGetAddressObj'
			]),
			toOptAddress(type, idx) {
				if(type == 'edit') {
					this.toGetAddressObj(this.addressList[idx])
				}
				uni.navigateTo({
					url: `/pages/optAddress/optAddress?type=${type}`
				})
			},
			selectGetAddress(idx) { //选择收货地址
				if(this.fromType != 'mine') {
					uni.navigateBack({
						delta: 1
					})
				}
			},
			toDeleteAddress(idx) {
				uni.showModal({
					title: '',
					content: '确认删除地址?',
					cancelColor: '#909399',
					confirmColor: '#FFDA4C',
					success: (res) => {
						if(res.confirm) {
							this.deleteAddressMay(idx)
						}else {
							this.$api.warnNotice('已取消操作')
						}
					},
					fail: () => {
						this.$api.warnNotice('操作失败')
					}
				})
			},
			deleteAddressMay(idx) {
				const $this = this
				this.$api.ajax({
					url: this.$config.deleteAddress,
					method: 'DELETE',
					data: {
						adr_id: this.addressList[idx].adr_id,
					}
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						uni.showToast({
							title: '操作成功',
							icon: 'success',
							success: () => {
								$this.addressList.splice(idx, 1)
							}
						})
					}else {
						this.$api.warnNotice(res.data.message)
					}
				})
				.catch((err) => {
					this.$api.warnNotice('操作失败')
				})
			},
			toRelaodData() {
				this.isLoadErr = false
				this.addressList = []
				this.getAddressData()
			},
			getAddressData() {
				uni.showLoading({
					title: '数据加载中',
					mask: true
				})
				this.$api.ajax({
					url: this.$config.addressList,
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						let arr = res.data.data
						
						this.addressList = arr

						setTimeout(() => {
							uni.hideLoading();
						}, 500)
					}else {
						if(this.index == 1) {
							this.isLoadErr = true
						}else {
							this.$api.warnNotice(res.data.message)
						}
						uni.hideLoading();
					}
				})
				.catch((err) => {
					if(this.index == 1) {
						this.isLoadErr = true
					}else {
						this.$api.warnNotice('列表加载失败')
					}
					uni.hideLoading();
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.addressee {
		width: 100%;
		height: 100%;
		background-color: #F6F9FA;
		display: flex;
		flex-direction: column;
		.address-list {
			flex: 1;
			overflow: hidden;
			padding: 30upx;
		}
		.address-list-scroll {
			width: 100%;
			height: 100%;
		}
		.to-address-btn {
			width: 690upx;
			height: 100upx;
			position: fixed;
			left: 30upx;
			bottom: 30upx;
			z-index: 99;
			background-color: $main-color;
			text-align: center;
			line-height: 100upx;
			font-size: 32upx;
			color: $text-second-black;
		}
	}
	.item-address-box {
		width: 100%;
		height: auto;
		background-color: $text-color;
		border-radius: 20upx;
		margin-bottom: 30upx;
		.item-address-info {
			padding: 30upx;
			border-bottom: 1px solid $border-color;
			.item-address-info-1 {
				font-size: 28upx;
				color: $text-main-black;
				margin-bottom: 10upx;
			}
			.item-address-info-2 {
				font-size: 24upx;
				color: $text-grey;
			}
		}
		.item-address-opt {
			position: relative;
			display: flex;
			justify-content: flex-end;
			padding: 20upx 30upx;
			.item-address-opt-box {
				display: flex;
				align-items: center;
				.item-address-edit {
					width: 118upx;
					height: 52upx;
					margin-right: 20upx;
				}
				.item-address-delete {
					width: 52upx;
					height: 52upx;
				}
			}
			.show-default-address {
				position: absolute;
				left: 30upx;
				top: 30upx;
				display: flex;
				align-items: center;
				font-size: 24upx;
				color: $text-main-black;
				&:before {
					content: '';
					display: block;
					width: 28upx;
					height: 28upx;
					background-color: $main-color;
					border-radius: 50%;
					margin-right: 10upx;
				}
			}
		}
	}
</style>
