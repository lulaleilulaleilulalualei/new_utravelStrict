<template>
	<view class="discountsCoupon">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">优惠券</block></cu-custom>
		<view class="couponNav">
			<view :class="['item-coupon-type', {'item-show-coupon': item.type == curType}]" 
				v-for="(item, idx) in cutArr" 
				:key="idx"
				@tap="toCutCouponType(idx)">{{item.title}}</view>
		</view>
		<view class="show-coupon-box">
			<scroll-view class="coupon-list-scroll" :scroll-y="true">
				<view class="item-coupon-box" v-for="(item, idx) in couponArr" :key="idx">
					<view :class="['item-coupon-info', {'item-had-use-coupon': item.type == 1}, {'item-coupon-due': item.type == 2}]">
						<view class="item-coupon-head">
							<view class="item-coupon-price">¥{{item.price}}</view>
							<view class="item-coupon-limit">满{{item.limit}}可用</view>
						</view>
						<view class="item-coupon-content">
							<view class="item-coupon-name">{{item.name}}</view>
							<view class="item-coupon-time">有效期至 {{item.useTime}}</view>
							<view class="item-coupon-use-btn">{{item.type == 0? '去使用': item.type == 1? '已使用': '已过期'}}</view>
						</view>
					</view>
					<view class="item-coupon-intro" :style="[{height: curCouponId == item.id? 'auto': '46upx;'}]" @tap="toShowCouponIntro(idx)">
						<view :class="['item-coupon-intro-title', {'item-coupon-content-active': curCouponId == item.id}]"><text>详细说明</text></view>
						<view class="coupon-intro-content">
							<view class="item-coupon-intro-content">· 本券限新注册用户可使用</view>
							<view class="item-coupon-intro-content">· 全场商品通用</view>
							<view class="item-coupon-intro-content">· 同一用户限领一次</view>
						</view>
					</view>
				</view>
				<!-- 底部顶高 -->
				<view class="cu-tabbar-height"></view>
			</scroll-view>
		</view>
		
		<loadErr v-if="isLoadErr" @toRelaodData="toRelaodData"></loadErr>
	</view>
</template>

<script>
	import noMore from '@/components/noMore.vue'
	import loadErr from '@/components/loadErr.vue'
	
	export default {
		data() {
			return {
				cutArr: [{
					title: '未使用',
					type: 1
				}, {
					title: '已使用',
					type: 2
				}, {
					title: '已过期',
					type: 3
				}],
				curType: 1,
				isLoadErr: false, //加载失败
				
				// 未使用
				nu_index: 1,
				nu_size: 10,
				nu_dataList: [],
				nu_isMore: true,
				
				// 已使用
				hu_index: 1,
				hu_size: 10,
				hu_dataList: [],
				hu_isMore: true,
				
				// 已过期
				ht_index: 1,
				ht_size: 10,
				ht_dataList: [],
				ht_isMore: true,
				
				couponArr: [{
					price: 10,
					limit: 99,
					name: '新人券',
					useTime: '2019-09-04',
					type: 0,//未使用
					id: 1
				}, {
					price: 10,
					limit: 99,
					name: '新人券',
					useTime: '2019-09-04',
					type: 1,//已使用
					id: 2
				}, {
					price: 10,
					limit: 99,
					name: '新人券',
					useTime: '2019-09-04',
					type: 2,//已过期
					id: 3
				}],
				curCouponId: null, //当前券id
			}
		},
		methods: {
			toCutCouponType(idx) {
				this.cutArr.map((v, i) => {
					if(idx == i) {
						this.curType = v.type
					}
				})
			},
			toShowCouponIntro(idx) {
				this.couponArr.map((v, i) => {
					if(idx == i) {
						if(this.curCouponId == v.id) {
							this.curCouponId = null
						}else {
							this.curCouponId = v.id
						}
					}
				})
			},
			
		}
	}
</script>

<style scoped lang="scss">
	.discountsCoupon {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #F6F9FA;
		.couponNav {
			width: 100%;
			height: 76upx;
			background-color: $text-color;
			display: flex;
			justify-content: space-around;
			.item-coupon-type {
				line-height: 76upx;
				border-bottom: 6upx solid transparent;
				font-size: 28upx;
				color: $text-grey;
			}
			.item-show-coupon {
				border-color: $main-color;
				color: $text-second-black;
				font-weight: 600;
			}
		}
		.show-coupon-box {
			flex: 1;
			overflow: hidden;
			width: 100%;
			padding: 30upx 30upx 0;	
		}
	}
	.coupon-list-scroll {
		width: 100%;
		height: 100%;
		.item-coupon-box {
			position: relative;
			width: 100%;
			height: auto;
			background-color: $text-color;
			border-radius: 4upx;
			overflow: hidden;
			margin-bottom: 30upx;
			&:before {
				content: '';
				display: block;
				width: 30upx;
				height: 30upx;
				position: absolute;
				top: 85upx;
				left: -15upx;
				z-index: 10;
				border-radius: 50%;
				background-color: #F6F9FA;
			}
			&:after {
				content: '';
				display: block;
				width: 30upx;
				height: 30upx;
				position: absolute;
				top: 85upx;
				right: -15upx;
				z-index: 10;
				border-radius: 50%;
				background-color: #F6F9FA;
			}
			.item-coupon-info {
				position: relative;
				display: flex;
				height: 200upx;
				width: 100%;
				.item-coupon-head {
					width: 200upx;
					height: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					position: relative;
					background-image: linear-gradient(-90deg, #FFE52A 0%, #F5B300 100%);
					.item-coupon-price {
						font-size: 48upx;
						color: $text-color;
						margin-bottom: 14upx;
						font-weight: 700;
					}
					.item-coupon-limit {
						font-size: 20upx;
						color: rgba(255,255,255,0.70);
					}
				}
				.item-coupon-content {
					flex: 1;
					padding: 40upx;
					position: relative;
					border-bottom: 1px solid $border-color;
					.item-coupon-name {
						font-size: 28upx;
						color: $text-second-black;
						font-weight: 700;
						margin-bottom: 40upx;
					}
					.item-coupon-time {
						font-size: 20upx;
						color: $text-grey;
					}
					.item-coupon-use-btn {
						position: absolute;
						bottom: 30upx;
						right: 30upx;
						z-index: 10;
						width: 136upx;
						height: 50upx;
						border-radius: 25upx;
						text-align: center;
						line-height: 50upx;
						font-size: 24upx;
						color: $text-color;
						background-color: #FFDC00;
					}
				}
			}
			.item-had-use-coupon {
				.item-coupon-head {
					opacity: 0.5;
				}
				.item-coupon-content {
					.item-coupon-use-btn {
						opacity: 0.5;
					}
				}
			}
			.item-coupon-due {
				.item-coupon-head {
					background-image: none;
					background-color: #D7D7D7;
				}
				.item-coupon-content {
					.item-coupon-use-btn {
						background-image: none;
						background-color: #D7D7D7;
					}
				}
			}
			.item-coupon-intro {
				width: 100%;
				height: 46upx;
				overflow: hidden;
				transition: all 0.3s;
				.item-coupon-intro-title {
					width: 100%;
					height: 46upx;
					display: flex;
					align-items: center;
					justify-content: center;
					text {
						display: inline-block;
						font-size: 20upx;
						color: $text-grey;
					}
					&:after {
						content: '';
						display: block;
						border: 6upx solid $text-grey;
						margin-left: 10upx;
						border-left-color: transparent;
						border-bottom-color: transparent;
						transform: rotate(-45deg);
						position: relative;
						top: 4upx;
					}
				}
				.item-coupon-content-active {
					&:after {
						transform: rotate(135deg);
						top: -4upx;
					}
				}
				.coupon-intro-content {
					width: 100%;
					height: auto;
					padding: 10upx 50upx 30upx;
					.item-coupon-intro-content {
						font-size: 20upx;
						color: $text-grey;
						&:not(:last-child) {
							margin-bottom: 10upx;
						}
					}
				}
			}
		}
	}
</style>
