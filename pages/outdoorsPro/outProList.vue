<template>
	<view class="outProList">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">全部线路</block></cu-custom>
		<view class="top-search-box">
			<view class="top-search-input">
				<view class="top-search-icon"><image src="/static/search-icon.png" mode=""></image></view>
				<view class="to-search-inp-box"><input type="text" value="" placeholder="搜索目的地/线路名" /></view>
			</view>
		</view>
		<view class="select-type-box">
			<scroll-view class="select-type-scroll" :scroll-x="true">
				<view :class="['item-select-type', {'item-type-active': selectType == item.type}]" 
					v-for="(item, idx) in selectTypeArr" 
					:key="idx"
					@click="toCutType(idx)">{{item.name}}</view>
			</scroll-view>
		</view>
		<view class="filter-box-out">
			<view class="filter-box">
				<view class="item-filter">
					<view :class="['item-filter-txt', {'to-active-filter': curFilter == 1}]" @click="selectFilter(1)">综合排序</view>
				</view>
				<view class="item-filter">
					<view :class="['item-filter-txt', {'to-active-filter': curFilter == 2}]" @click="selectFilter(2)">销量</view>
				</view>
				<view class="item-filter">
					<view :class="['item-filter-txt', {'to-active-filter': curFilter == 3}]" @click="selectFilter(3)">评价</view>
				</view>
				<view class="item-filter">
					<view :class="['item-filter-txt', {'to-active-filter': curFilter == 4}]" @click="selectFilter(4)">筛选</view>
				</view>
			</view>
			<view class="select-filter-box" :style="{height: curFilter != ''? filterH: 0}">
				<scroll-view class="filter-scroll-box" :scroll-y="true">
					<view class="select-filter-box-recom">
						<view class="item-filter-recom" v-for="(item, idx) in recomFilter" :key="idx">
							<text :class="['item-filter-recom-txt', {'item-active-filter': item.value == recomFilterVal}]">{{item.name}}</text>
							<text v-if="item.value == recomFilterVal" class="lg cuIcon-check item-active-filter"></text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		
		<view class="list-scroll">
			<view :class="curFilter != '' && 'show-modal-active'" @click="toCloseFilterbox" class="list-modal-box"></view>
			<scroll-view class="list-scroll-box" :scroll-y="curFilter == ''">
				<view class="hot-pro-list">
					<view class="item-show-pro" v-for="(item, idx) in 10" :key="idx" @tap="toJumpProDetail(idx)">
						<view class="item-pro-img"><image src="/static/test_img_6.jpeg" mode=""></image></view>
						<view class="item-pro-info">
							<view class="item-pro-title">速干衣金链子</view>
							<view class="item-pro-tags"><text>美食</text> <text>速干</text></view>
							<view class="item-pro-price">
								<view class="item-pro-sell-price">￥<text>2189</text></view>
								<view class="item-pro-ori-price">原价￥2223</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 底部顶高 -->
				<view class="cu-tabbar-height"></view>
			</scroll-view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectType: 0,
				selectTypeArr: [{
					name: '全部',
					type: 0
				}, {
					name: '服饰',
					type: 1
				}, {
					name: '鞋靴',
					type: 2
				}, {
					name: '露营',
					type: 3
				}, {
					name: '运动',
					type: 4
				}, {
					name: '旅行',
					type: 5
				}, {
					name: '装备',
					type: 6
				}],
				
				curFilter: '', //当前筛选
				//推荐排序
				recomFilter: [{
					name: '综合排序',
					value: 1,
				}, {
					name: '价格从高到底',
					value: 2,
				}, {
					name: '价格从低到高',
					value: 3
				}, {
					name: '销量由高到底',
					value: 4
				}, {
					name: '评分由高到底',
					value: 5
				}],
				recomFilterVal: 1, //推荐排序默认值
			}
		},
		computed: {
			filterH() { //筛选列高度
				let sys = uni.getSystemInfoSync();
				return (sys.windowWidth / 750) * 540 + 'px'
			}
		},
		methods: {
			toCutType(idx) {
				this.selectTypeArr.map((v, i) => {
					if(idx == i) {
						this.selectType = v.type
					}
				})
			},
			selectFilter(type) {
				if(this.curFilter == type) {
					this.curFilter = ''
				}else {
					this.curFilter = type
				}
			},
			toCloseFilterbox() {
				this.curFilter = ''
			},
			toJumpProDetail(idx) {
				uni.navigateTo({
					url: '/pages/outdoorsPro/outProDetail'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.outProList {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
	.top-search-box {
		padding: 30upx;
		.top-search-input {
			background: #F6F9FA;
			width: 100%;
			height: 64upx;
			border-radius: 32upx;
			display: flex;
			align-items: center;
			padding: 0 30upx;
			.top-search-icon {
				width: 30upx;
				height: 30upx;
				margin-right: 20upx;
			}
			.to-search-inp-box {
				flex: 1;
				overflow: hidden;
				height: 100%;
				input {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.select-type-box {
		width: 100%;
		height: 60upx;
		.select-type-scroll {
			width: 100%;
			height: 100%;
			white-space: nowrap;
			.item-select-type {
				font-size: 28upx;
				color: $text-second-black;
				display: inline-block;
				margin: 0 30upx;
				height: 100%;
				border-bottom: 6upx solid transparent;
			}
			.item-type-active {
				border-bottom-color: $main-color;
				font-weight: 800;
			}
		}
	}
	.filter-box-out {
		position: relative;
		width: 100%;
		height: auto;
		z-index: 99;
		.select-filter-box {
			position: absolute;
			top: 82upx;
			left: 0;
			z-index: 10;
			width: 100%;
			background-color: $text-color;
			transition: all 0.3s;
			.filter-scroll-box {
				width: 100%;
				height: 100%;
			}
		}
	}
	.select-filter-box-recom {
		padding: 0 30upx;
		.item-filter-recom {
			padding: 30upx 0;
			font-size: 28upx;
			color: $text-second-black;
			display: flex;
			justify-content: space-between;
			&:not(:last-child) {
				border-bottom: 1px solid #F4F4F4;
			}
			.cuIcon-check {
				font-size: 32upx;
			}
		}
		.item-active-filter {
			color: $main-color;
		}
	}
	.filter-box {
		display: flex;
		padding: 0 30upx 0;
		align-items: center;
		justify-content: space-between;
		box-shadow: 0 10upx 20upx 0 #F9F9F9;
		.item-filter {
			position: relative;
			.item-filter-txt {
				font-size: 24upx;
				color: $text-main-black;
				display: flex;
				align-items: center;
				padding: 20upx 0 30upx;
				&::after {
					margin-left: 20upx;
					content: '';
					display: block;
					border: 6upx solid $text-main-black;
					transform: rotate(45deg);
					border-left-color: transparent;
					border-top-color: transparent;
					position: relative;
					top: -3upx;
				}
			}
			.to-active-filter {
				color: $main-color;
				&::after {
					transform: rotate(225deg);
					top: 5upx;
					border-right-color: $main-color;
					border-bottom-color: $main-color;
				}
			}
		}
	}
	.list-scroll {
		flex: 1;
		overflow: hidden;
		position: relative;
		z-index: 1;
		.list-modal-box {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,0.4);
			transition: all 1s;
			z-index: -1;
			opacity: 0;
		}
		.show-modal-active {
			z-index: 10;
			opacity: 1;
		}
		.list-scroll-box {
			padding: 30upx 30upx 0;
			width: 100%;
			height: 100%;
			.hot-pro-list {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.item-show-pro {
					width: 334upx;
					border-radius: 12upx;
					overflow: hidden;
					box-shadow: 0 10upx 20upx 0 rgba(0,0,0,0.05);
					background-color: $text-color;
					margin-bottom: 40upx;
					.item-pro-img {
						width: 100%;
						height: 334upx;
						background-color: $img-bg;
					}
					.item-pro-info {
						padding: 10upx 20upx 20upx;
						.item-pro-title {
							font-size: 28upx;
							color: $text-second-black;
							font-weight: 600;
							margin-bottom: 10upx;
						}
						.item-pro-tags {
							display: flex;
							flex-wrap: wrap;
							margin-bottom: 10upx;
							text {
								display: block;
								font-size: 24upx;
								color: #7A8188;
								padding: 2upx 10upx;
								background-color: $img-second-bg;
								&:not(:last-child) {
									margin-right: 10upx;
								}
							}
						}
						.item-pro-price {
							display: flex;
							align-items: center;
							justify-content: space-between;
							.item-pro-sell-price {
								font-size: 24upx;
								color: $text-red;
								font-weight: 600;
								text {
									display: inline-block;
									font-size: 32upx;
								}
							}
							.item-pro-ori-price {
								font-size: 20upx;
								color: $text-grey;
								text-decoration: line-through;
							}
						}
					}
				}
			}
		}
	}
</style>
