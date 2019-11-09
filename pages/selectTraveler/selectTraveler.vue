<template>
	<view class="selectTraveler">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">选择出行人</block></cu-custom>
		<view class="to-add-traveler" :style="[{top: addTop}]">
			<view class="add-tvl-box" @tap="toAddTraveler('add')">
				<text class="cuIcon-roundadd lg"></text>
				<text class="add-tvl-title">新增出行人</text>
			</view>
		</view>
		
		<view class="show-tvl-list" :style="[{paddingTop: addTop}]" v-if="userList.length != 0">
			<view class="item-show-tvl" v-for="(item, idx) in userList" :key="idx">
				<view class="item-show-tvl-info" @tap="toSelectTraveler(idx)">
					<view :class="['to-select-item-tvl', {'to-active-select': userId == item.id}] ">
						<text v-if="userId == item.id" class="cuIcon-check lg"></text>
					</view>
					<view class="item-tvl-info-box">
						<view class="item-tvl-name">{{item.ch_name}}</view>
						<view class="item-tvl-idcard">身份证 {{item.id_num}}</view>
					</view>
				</view>
				<view class="item-tvl-opt">
					<view class="item-tvl-edit" @tap="toEditTvl('edit', idx)"><image src="/static/edit_icon.png" mode=""></image></view>
					<view class="item-tvl-delete" @tap="toDeleteTvl(idx)"><image src="/static/delete_icon.png" mode=""></image></view>
				</view>
			</view>
		</view>
		
		<view class="to-complete">
			<view class="complete-box">完成</view>
		</view>
		
		<loadErr v-if="isLoadErr" @toRelaodData="toRelaodData"></loadErr>
		<noListData v-if="userList.length == 0"></noListData>
	</view>
</template>

<script>
	import loadErr from '@/components/loadErr.vue'
	import noListData from '@/components/noListData.vue'
	import { mapGetters, mapActions } from 'vuex'
	
	export default {
		data() {
			return {
				userList: [],
				isLoadErr: false,
				userId: ''
			}
		},
		components: { loadErr, noListData },
		computed: {
			addTop() {
				return this.CustomBar + 'px'
			}
		},
		onShow() {
			this.userList = []
			this.getUserList()
		},
		methods: {
			...mapActions([
				'toGetTvlObj'
			]),
			toSelectTraveler(idx) {
				if(this.userId == this.userList[idx].id) {
					this.userId = ''
				}else {
					this.userId = this.userList[idx].id
				}
			},
			toAddTraveler(type) {
				uni.navigateTo({
					url: `/pages/optTraveler/optTraveler?type=${type}`
				})
			},
			toEditTvl(type, idx) {
				this.toGetTvlObj(this.userList[idx])
				uni.navigateTo({
					url: `/pages/optTraveler/optTraveler?type=${type}`
				})
			},
			toDeleteTvl(idx) {
				const $this = this
				uni.showModal({
					title: '',
					content: `确认删除出行人 ${$this.userList[idx].ch_name}`,
					cancelColor: '#909399',
					confirmColor: '#FFDA4C',
					success: (res) => {
						if(res.confirm) {
							$this.deleteTvlMay(idx)
						}else {
							this.$api.warnNotice('已取消操作')
						}
					},
					fail: () => {
						this.$api.warnNotice('操作失败')
					}
				})
			},
			deleteTvlMay(idx) {
				const $this = this
				this.$api.ajax({
					url: this.$config.deleteUser,
					method: 'DELETE',
					data: {
						id: this.userList[idx].id,
						token: '123456'
					}
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						uni.showToast({
							title: '操作成功',
							icon: 'success',
							success: () => {
								$this.userList.splice(idx, 1)
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
				this.userList = []
				this.getUserList()
			},
			getUserList() {
				uni.showLoading({
					title: '数据加载中',
					mask: true
				})
				this.$api.ajax({
					url: this.$config.userList,
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						let arr = res.data.data
						
						this.userList = arr
						
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
						this.$api.warnNotice('评论列表加载失败')
					}
					uni.hideLoading();
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.to-add-traveler {
		position: fixed;
		left: 0;
		z-index: 888;
		width: 100%;
		height: auto;
		background-color: $text-color;
		padding: 30upx;
		.add-tvl-box {
			background-color: $main-color;
			width: 100%;
			height: 84upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 32upx;
			color: $text-second-black;
			.cuIcon-roundadd {
				margin-right: 20upx;
			}
		}
	}
	
	.show-tvl-list {
		width: 100%;
		height: auto;
		padding: 0 30upx 148upx;
		.item-show-tvl {
			width: 100%;
			height: auto;
			padding: 30upx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			&:not(:last-child) {
				border-bottom: 1px solid #EFEFEF;
			}
			.item-show-tvl-info {
				display: flex;
				align-items: center;
				.to-select-item-tvl {
					width: 36upx;
					height: 36upx;
					border: 1px solid #D8DCE6;
					border-radius: 50%;
					margin-right: 30upx;
				}
				.to-active-select {
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 28upx;
					font-weight: 800;
					background-color: $main-color;
					color: $text-color;
					border-color: transparent;
				}
				.item-tvl-info-box {
					.item-tvl-name {
						font-size: 28upx;
						color: $text-main-black;
						margin-bottom: 10upx;
					}
					.item-tvl-idcard {
						font-size: 24upx;
						color: $text-grey;
					}
				}
			}
			.item-tvl-opt {
				display: flex;
				align-items: center;
				.item-tvl-edit {
					width: 118upx;
					height: 52upx;
					margin-right: 20upx;
				}
				.item-tvl-delete {
					width: 52upx;
					height: 52upx;
				}
			}
		}
	}
	
	.to-complete {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 888;
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
