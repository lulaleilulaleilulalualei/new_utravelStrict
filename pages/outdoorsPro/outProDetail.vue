<template>
	<view class="outProDetail">
		<cu-custom :bgColor="navColor" :isBack="true" :textOpacity="textOpacity"><block slot="content">产品详情</block></cu-custom>
		<view class="contentBox">
			<scroll-view class="content-scroll" :scroll-y="true" @scroll="toScroll">
				<view class="detail-banner">
					<swiper class="banner-swiper"
							:indicator-dots="indicatorDots" 
							:autoplay="autoplay" 
							:interval="interval" 
							:duration="duration"
							@change="bindChangeSwiper">
					    <swiper-item v-for="(item, idx) in testSwper" :key="idx" @tap="toPreviewImg(idx)">
					       <view class="swiper-item"><image :src="item" mode=""></image></view>
					    </swiper-item>
					</swiper>
					<view class="show-swiper-current">
						<view class="show-current-idx">{{showNumFormat(curentIdx+1)}}</view>
						<view class="show-all-num">/{{showNumFormat(testSwper.length)}}</view>
					</view>
				</view>
				<view class="detail-pro-info">
					<view class="pro-info-price">￥<text>341</text></view>
					<view class="pro-info-ori-price">原售价<text>¥660</text></view>
					<view class="pro-info-title">速干衣速干衣速干衣速干衣速干衣速干衣速干衣速干衣速干衣速干衣</view>
				</view>
				<view class="to-select-size">
					<view class="small-type-title">选择</view>
					<view class="show-size-text" @tap="toSelectProSize">
						<text>请选择规格</text>
					</view>
				</view>
				<view class="to-show-service-box">
					<view class="to-show-shipments">
						<view class="small-type-title">发货</view>
						<view class="show-shipments-info">
							<view class="show-shipments-address">
								<text class="cuIcon-locationfill lg"></text>
								<text>湖南·长沙</text>
							</view>
							<view class="show-shipments-cost">运费：40.00</view>
						</view>
					</view>
					<view class="to-show-service">
						<view class="small-type-title">服务</view>
						<view class="show-service-info"><text>7天无理由 · 15天内发货</text></view>
					</view>
				</view>
				<view class="show-comment-num" @tap="toJumpCommentList">商品评价（0条）</view>
				<view class="show-pro-content">
					<view style="width: 100%;height: 400upx;margin: 20upx 0;"><image src="../../static/test_img_4.jpeg" mode=""></image></view>
					<view style="font-size: 28upx; color: #000; padding: 0 30upx;">这里的衣服很好就，这里的东西很好，这里很不错，这里的衣服很好就，这里的东西很好，这里很不错</view>
					<view style="width: 100%;height: 400upx;margin: 20upx 0;"><image src="../../static/test_img_4.jpeg" mode=""></image></view>
					<view style="font-size: 28upx; color: #000; padding: 0 30upx;">这里的衣服很好就，这里的东西很好，这里很不错，这里的衣服很好就，这里的东西很好，这里很不错</view>
					<view style="width: 100%;height: 400upx;margin: 20upx 0;"><image src="../../static/test_img_4.jpeg" mode=""></image></view>
					<view style="font-size: 28upx; color: #000; padding: 0 30upx;">这里的衣服很好就，这里的东西很好，这里很不错，这里的衣服很好就，这里的东西很好，这里很不错</view>
					<view style="width: 100%;height: 400upx;margin: 20upx 0;"><image src="../../static/test_img_4.jpeg" mode=""></image></view>
					<view style="font-size: 28upx; color: #000; padding: 0 30upx;">这里的衣服很好就，这里的东西很好，这里很不错，这里的衣服很好就，这里的东西很好，这里很不错</view>
				</view>
				<!-- 底部顶高 -->
				<view class="cu-tabbar-height"></view>
			</scroll-view>
		</view>
		
		<!-- 底部操作 -->
		<view class="detail-bottom-opt">
			<view class="detail-bottom-opt-left">
				<view class="detail-bottom-opt-box">
					<view class="detail-bottom-opt-icon"><image src="/static/consult_icon.png" mode="aspectFill"></image></view>
					<view class="detail-bottom-opt-icon-txt">咨询</view>
					<button class="serviceBtn" open-type="contact"></button>
				</view>
				<view :class="['detail-bottom-opt-box', {'to-active-collect-line': true}]" @tap="toCollectLine">
					<!-- <view class="detail-bottom-opt-icon"><image src="/static/collect_icon.png" mode="aspectFill"></image></view> -->
					<view class="detail-bottom-opt-icon"><image src="/static/collect_select_icon.png" mode="aspectFill"></image></view>
					<view class="detail-bottom-opt-icon-txt">已收藏</view>
				</view>
			</view>
			<view class="detail-bottom-opt-right">
				<view class="detail-bottom-opt-buy" @tap="toJumpBurPro(1)">直接购买</view>
				<view class="detail-bottom-opt-member-buy" @tap="toJumpBurPro(2)">
					<view>会员购买</view>
					<text>立减¥300元券</text>
				</view>
			</view>
		</view>
		
		<selectProSize v-if="isShowProSelect" @toCloseSizeBox="toCloseSizeBox"></selectProSize>
	</view>
</template>

<script>
	import selectProSize from './selectProSize.vue'
	
	export default {
		data() {
			return {
				navColor: 'white',
				textOpacity: 0,
				indicatorDots: false,
				autoplay: true,
				interval: 3000,
				duration: 500,
				curentIdx: 0,
				isShowProSelect: false,
				sizeObj: null, //规格对象
				
				testSwper: ['/static/test_img_1.jpeg', '/static/test_img_2.jpeg' ,'/static/test_img_4.jpeg', '/static/test_img_6.jpeg', '/static/test_img_1.jpeg', '/static/test_img_2.jpeg' ,'/static/test_img_4.jpeg', '/static/test_img_6.jpeg', '/static/test_img_1.jpeg', '/static/test_img_2.jpeg']
			}
		},
		components: {selectProSize},
		methods: {
			toPreviewImg(idx) {
				const $this = this
				uni.previewImage({
					current: $this.testSwper[idx],
					urls: $this.testSwper
				})
			},
			showNumFormat(num) {
				if(num < 10) {
					num = '0' + num
				}
				return num
			},
			toScroll(e) {
				let top = e.detail.scrollTop
				this.textOpacity = top / 400 > 1 ? 1 : top / 400
			},
			bindChangeSwiper(val) {
				this.curentIdx = val.detail.current
			},
			toSelectProSize() {
				this.isShowProSelect = !this.isShowProSelect
			},
			toCloseSizeBox(val) {
				this.isShowProSelect = val.status
				this.sizeObj = val.sizeData
			},
			toJumpBurPro(type) {
				if(!this.sizeObj) {
					this.isShowProSelect = true
				}else {
					uni.navigateTo({
						url: '/pages/outdoorsPro/sureProOrder'
					})
				}
			},
			toJumpCommentList() {
				uni.navigateTo({
					url: '/pages/commentList/commentList'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.outProDetail {
		width: 100%;
		height: 100%;
		position: relative;
		.contentBox {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
			width: 100%;
			height: 100%;
			background: #F6F9FA;
			.content-scroll {
				width: 100%;
				height: 100%;
				.detail-banner {
					width: 100%;
					height: 750upx;
					position: relative;
					.banner-swiper {
						width: 100%;
						height: 100%;
					}
					.swiper-item {
						width: 100%;
						height: 100%;
						background-color: $img-bg;
					}
					.show-swiper-current {
						position: absolute;
						bottom: 44upx;
						right: 30upx;
						z-index: 10;
						display: flex;
						align-items: flex-end;
						.show-current-idx {
							font-size: 36upx;
							color: $text-color;
							line-height: 36upx;
						}
						.show-all-num {
							font-size: 26upx;
							color: $text-color;
						}
					}
				}
				.detail-pro-info {
					padding: 20upx 30upx 30upx;
					background-color: $text-color;
					margin-bottom: 20upx;
					.pro-info-price {
						font-size: 32upx;
						color: $text-red;
						margin-bottom: 4upx;
						text {
							display: inline-block;
							font-size: 44upx;
							font-weight: 700;
							margin-left: 10upx;
						}
					}
					.pro-info-ori-price {
						font-size: 26upx;
						color: $text-grey;
						margin-bottom: 20upx;
						text {
							display: inline-block;
							margin-left: 10upx;
							text-decoration: line-through;
						}
					}
					.pro-info-title {
						font-size: 32upx;
						color: $text-main-black;
						font-weight: 700;
						line-height: 42upx;
						@extend .ellipse2;
					}
				}
				.small-type-title {
					font-size: 28upx;
					color: $text-grey;
					margin-right: 40upx;
				}
				.to-select-size {
					padding: 20upx 30upx;
					display: flex;
					align-items: center;
					margin-bottom: 20upx;
					background-color: $text-color;
					.show-size-text {
						flex: 1;
						overflow: hidden;
						display: flex;
						align-items: center;
						font-size: 28upx;
						color: $text-second-black;
						text {
							flex: 1;
							overflow: hidden;
							@extend .ellipse1;
						}
						&::after {
							content: '';
							display: block;
							width: 12upx;
							height: 12upx;
							border: 2upx solid #B5B5B5;
							border-left-color: transparent;
							border-top-color: transparent;
							transform: rotate(-45deg);
							margin: 0 10upx;
						}
					}
				}
				.to-show-service-box {
					padding: 20upx 30upx;
					background-color: $text-color;
					margin-bottom: 20upx;
					.to-show-shipments {
						display: flex;
						align-items: center;
						margin-bottom: 40upx;
						.show-shipments-info {
							display: flex;
							align-items: center;
						}
						.show-shipments-address {
							display: flex;
							align-items: center;
							font-size: 28upx;
							color: $text-second-black;
							&::after {
								content: '';
								display: block;
								width: 1px;
								height: 20upx;
								background-color: #EFEFEF;
								margin-left: 20upx;
							}
							.cuIcon-locationfill {
								margin-right: 10upx;
							}
						}
						.show-shipments-cost {
							padding-left: 20upx;
						}
					}
					.to-show-service {
						display: flex;
						align-items: center;
						.show-service-info {
							flex: 1;
							font-size: 28upx;
							color: $text-second-black;
							display: flex;
							align-items: center;
							justify-content: space-between;
							&::after {
								content: '';
								display: block;
								width: 12upx;
								height: 12upx;
								border: 2upx solid #B5B5B5;
								border-left-color: transparent;
								border-top-color: transparent;
								transform: rotate(-45deg);
								margin: 0 10upx;
							}
						}
					}
				}
				.show-comment-num {
					padding: 20upx 30upx;
					background-color: #fff;
					margin-bottom: 20upx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					&::after {
						content: '';
						display: block;
						width: 12upx;
						height: 12upx;
						border: 2upx solid #B5B5B5;
						border-left-color: transparent;
						border-top-color: transparent;
						transform: rotate(-45deg);
						margin: 0 10upx;
					}
				}
				.show-pro-content {
					
				}
			}
		}
		
		.detail-bottom-opt {
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 99;
			width: 100%;
			height: 100upx;
			background-color: $text-color;
			box-shadow: 0 0 0 0 #EAEAEA;
			padding: 6upx 30upx 6upx 0;
			display: flex;
			.detail-bottom-opt-left {
				flex: 1;
				display: flex;
				.detail-bottom-opt-box {
					position: relative;
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					justify-content: center;
					.detail-bottom-opt-icon {
						width: 40upx;
						height: 40upx;
						margin-bottom: 6upx;
					}
					.serviceBtn {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						z-index: 5;
						opacity: 0;
					}
				}
				.detail-bottom-opt-icon-txt {
					font-size: 20upx;
					color: $text-third-black;
				}
				.to-active-collect-line {
					.detail-bottom-opt-icon-txt {
						color: $main-color;
					}
				}
			}
			.detail-bottom-opt-right {
				width: 452upx;
				height: 84upx;
				display: flex;
				border-radius: 42upx;
				overflow: hidden;
				.detail-bottom-opt-buy {
					flex: 1;
					background-color: #FFFBE6;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 28upx;
					color: $text-main-black;
				}
				.detail-bottom-opt-member-buy{
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					background-color: $main-color;
					justify-content: center;
					view {
						font-size: 28upx;
						color: $text-main-black;
					}
					text {
						font-size: 10px;
						color: rgba(10,8,0,0.51);
					}
				}
			}
		}
	}
</style>
