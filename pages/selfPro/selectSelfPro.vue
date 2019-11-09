<template>
	<view class="select-pro" :style="[{paddingTop: CustomBarH + 'px'}]">
		<view class="select-show-box">
			<scroll-view class="select-box-scroll" scroll-y>
				<view class="show-pro-banner">
					<image src="/static/test_img_2.jpeg" mode=""></image>
					<view class="to-close-box" @tap="toCloseBox"><image src="/static/close_icon.png" mode=""></image></view>
				</view>
				<view class="show-pro-size">
					<view class="item-show-pro-size" v-for="(item, idx) in _sizeArr" :key="idx">
						<view class="show-pro-size-name">{{item.name}}</view>
						<view class="show-pro-size-tags">
							<view :class="['item-size-tag', {'select-size-active': val.isSelect}]" v-for="(val, i) in item.childlist" :key="i" @tap="toSelectProSize(idx, i)">
								<span>{{val.size}}</span>
								<view v-if="val.isSelect" class="item-select-active-icon">
									<image src="/static/start-icon.png" mode=""></image>
								</view>
							</view>
						</view>
					</view>
					<view class="show-pro-desc">
						<view>商品描述</view>
						<view>拿铁中融入醇香焦糖风味，香甜温暖，令人沉醉。主要原材料，浓缩咖啡，牛奶，焦糖风味糖浆。图片仅供参考，请以实物为准。建议取餐后尽快饮用。</view>
					</view>
				</view>
			</scroll-view>
			<view class="to-opt-pro">
				<view class="show-pro-price-num">
					<view class="show-pro-price">￥<text>{{totalPrice}}</text></view>
					<view class="show-pro-num">
						<view class="to-minus-num" @tap="toMinusNum"></view>
						<view class="to-show-num">{{count}}</view>
						<view class="to-add-num" @tap="toAddNum"></view>
					</view>
				</view>
				<view class="show-pro-size-txt">摩卡 ¥{{totalPrice}} {{sizeStr}} +¥0</view>
				<view class="to-opt-btn">加入购物袋</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters , mapActions } from 'vuex';
	
	export default {
		data() {
			return {
				
				price: 27, //产品单价
				totalPrice: 0,//
				count: 1, //默认1
				sizeStr: ''
			}
		},
		props: {
			_sizeArr: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		computed: {
			...mapGetters([
				'selfOrderObj'
			]),
			CustomBarH() {
				let sys = uni.getSystemInfoSync()
				return this.CustomBar + (sys.windowWidth / 750 * 30)
			}
		},
		created() {
			// this.sizeArr = this.selfOrderObj.sizeArr
			this.totalPrice = this.price * this.count
		},
		methods: {
			toCloseBox() {
				this.$emit('toCloseBox', false)
			},
			toSelectProSize(pIdx, cIdx) {
				this._sizeArr.map((item, idx) => {
					if(pIdx == idx) {
						item.childlist.map((v, i) => {
							if(cIdx == i) {
								v.isSelect = true
							}else {
								v.isSelect = false
							}
						})
					}
				})
				this.sizeStr = ''
				this.sizeArr.map((item, idx) => {
					item.childlist.map((v, i) => {
						if(v.isSelect) {
							this.sizeStr += `+${v.size}`
						}
					})
				})
			},
			toMinusNum: function(type, evt) {
			    if (this.count > 1) {
					this.totalPrice = this.$api.pointProblem(this.totalPrice, this.price, 'sub')
					this.count--
			    }
			},
			toAddNum: function(type, evt) {
				this.count++
				this.totalPrice = this.$api.pointProblem(this.totalPrice, this.price, 'add')
			}
		}
	}
</script>

<style scoped lang="scss">
	.select-pro {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2000;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.6);
		padding: 30upx 40upx;
		.select-show-box {
			width: 100%;
			height: 100%;
			background-color: #fff;
			border-radius: 20upx;
			padding-bottom: 260upx;
			overflow: hidden;
			position: relative;
			.select-box-scroll {
				width: 100%;
				height: 100%;
			}
			.show-pro-banner {
				position: relative;
				width: 100%;
				height: 312upx;
				background-color: $img-bg;
				.to-close-box {
					position: absolute;
					width: 44upx;
					height: 44upx;
					top: 20upx;
					right: 20upx;
				}
			}
			.show-pro-size {
				padding: 30upx 30upx 0;
				.item-show-pro-size {
					margin-bottom: 30upx;
					.show-pro-size-name {
						font-size: 24upx;
						color: $text-grey;
						margin-bottom: 20upx;
					}
					.show-pro-size-tags {
						display: flex;
						flex-wrap: wrap;
						.item-size-tag {
							width: 168upx;
							height: 60upx;
							text-align: center;
							line-height: 60upx;
							background-color: #F7F5F6;
							border-radius: 8upx;
							font-size: 24upx;
							position: relative;
							transition: all 0.2s;
							&:not(:last-child) {
								margin-right: 20upx;
							}
						}
						.select-size-active {
							background-color: $main-color;
							color: $text-main-black;
						}
						.item-select-active-icon {
							position: absolute;
							top: 10upx;
							right: 10upx;
							width: 20upx;
							height: 20upx;
						}
					}
				}
				.show-pro-desc {
					padding-top: 30upx;
					border-top: 1px solid #E5E5E5;
					font-size: 24upx;
					color: $text-second-black;
					margin-bottom: 20upx;
				}
			}
			.to-opt-pro {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				z-index: 10;
				padding: 30upx;
				border-top: 1px solid #E5E5E5;
				background-color: $text-color;
				.show-pro-price-num {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 10upx;
					.show-pro-price {
						font-size: 28upx;
						color: $text-main-black;
						text {
							display: inline-block;
							margin-left: 10upx;
							font-size: 36upx;
							font-weight: 600;
						}
					}
					.show-pro-num {
						display: flex;
						align-items: center;
						.to-minus-num {
							width: 40upx;
							height: 40upx;
							border-radius: 50%;;
							border: 1px solid $main-color;
							display: flex;
							align-items: center;
							justify-content: center;
							&::before {
								content: '';
								display: block;
								width: 20upx;
								height: 4upx;
								background-color:$text-main-black;
							}
						}
						.to-show-num {
							width: 60upx;
							height: 40upx;
							line-height: 40upx;
							text-align: center;
							font-size: 24upx;
							color: $text-main-black;
						}
						.to-add-num {
							width: 40upx;
							height: 40upx;
							border-radius: 50%;
							background-color: $main-color;
							display: flex;
							align-items: center;
							justify-content: center;
							position: relative;
							&::before {
								content: '';
								display: block;
								width: 20upx;
								height: 4upx;
								background-color:$text-main-black;
							}
							&::after {
								content: '';
								display: block;
								width: 4upx;
								height: 20upx;
								background-color: $text-main-black;
								position: absolute;
								top: 50%;
								left: 50%;
								margin-top: -10upx;
								margin-left: -2upx;
							}
						}
					}
				}
				.show-pro-size-txt {
					font-size: 20upx;
					color: $text-grey;
					margin-bottom: 30upx;
				}
				.to-opt-btn {
					width: 100%;
					height: 80upx;
					border-radius: 8upx;
					background-color: $main-color;
					line-height: 80upx;
					text-align: center;
					font-size: 28upx;
					color: $text-main-black;
				}
			}
		}
	}
</style>
