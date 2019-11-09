<template>
	<view class="selfPro">
		<cu-custom bgColor="white" :isBack="false"><block slot="content">茶咖</block></cu-custom>
		<view class="shop-name-position">
			<view class="shop-name-box" @tap="toJumpSelectStore">
				<text class="cuIcon-locationfill lg"></text>
				<text class="shop-nama-txt">益阳去哪儿店</text>
			</view>
			<view class="show-distance-box">距您 780m</view>
		</view>
		<view class="show-main-img">
			<view class="main-img-box"><image src="/static/test_img_1.jpeg" mode=""></image></view>
		</view>
		<view class="VerticalBox">
			<view class="selfProScroll">
				<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop">
					<view class="cu-item" 
						v-for="(item,index) in list" 
						:class="index==tabCur? 'show-cur-item': ''"
						:key="index" 
						@tap="TabSelect"
						:data-id="index">{{item.name}}</view>
				</scroll-view>
				<scroll-view class="VerticalMain" scroll-y scroll-with-animation
						 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
					<view class="pro-box-list" v-for="(item,index) in list" :key="index" :id="'main-'+item.id">
						<view class="item-list-top">
							<view>{{item.name}}</view>
						</view>
						<view class="cu-list menu-avatar">
							<view class="cu-item item-pro-box" v-for="(item, idx) in 5" :key="idx">
								<view class="item-pro-img"><image src="/static/test_img_2.jpeg" mode=""></image></view>
								<view class="item-pro-info">
									<view class="item-pro-name">
										<view class="item-pro-name-title">焦糖</view>
										<view class="item-pro-name-txt">Caramel Latte</view>
									</view>
									<view class="item-pro-price-num">
										<view class="item-pro-price">￥<text>27</text></view>
										<view class="item-pro-num" @tap="toSelectSelfPro(idx)"></view>
										<!-- <view class="show-pro-num">
											<view class="to-minus-num" @tap="toMinusNum"></view>
											<view class="to-show-num">1</view>
											<view class="to-add-num" @tap="toAddNum"></view>
										</view> -->
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			
			<!-- 下单列表 -->
			<view class="buyCatBox">
				<view class="buyCatBtn">
					<view class="showCatPrice" @tap="toShowSelectList">
						<view class="showCatNum">
							<text class="cuIcon-cart lg"></text>
							<text class="showBuyNum">1</text>
						</view>
						<view class="showBuyPay">
							<text class="showBuyPayTxt">应付合计</text>
							<view class="showBuyPayNum">￥<text>27</text></view>
						</view>
					</view>
					<view class="toSureOrder" @tap="toJumpSureOrder">去结算</view>
				</view>
			</view>
			
			<view :class="['showBuyCatBg', {'activeBuyCatBg': isShowSelectList}]" data-sign="catList" @tap="toCloseSelectList">
				<view class="buyCatList" :style="[{height: selectBoxH + 'px'}, {transform: `translate3D(0,${isShowSelectList? 0: selectBoxH}px,0)`}]">
					<view class="buyCatTop">
						<view class="buyCatTop1">已选商品</view>
						<view class="buyCatTop2">
							<text class="cuIcon-delete lg"></text>
							<text>清空</text>
						</view>
					</view>
					<view class="buyListScroll" :style="[{height: selectProH + 'px'}]">
						<scroll-view class="buyListScrollBox" :scroll-y="true">
							<view class="itemBuyPro" v-for="item in 5" :key="item">
								<view class="itemBuyLeft">
									<view class="itemBuyProTitle">梅梅芝士茉香茶</view>
									<view class="itemBuyProSize">已选：大杯	 / 冰 / 全糖</view>
								</view>
								<view class="itemBuyRight">
									<view class="itemBuyPrice">￥<text>27</text></view>
									<view class="show-pro-num">
										<view class="to-minus-num" @tap="toMinusNum"></view>
										<view class="to-show-num">1</view>
										<view class="to-add-num" @tap="toAddNum"></view>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			
		</view>
		
		<selectSelfPro v-if="isShowSizeBox" :_sizeArr="sizeArr" @toCloseBox="toCloseBox"></selectSelfPro>
	</view>
</template>

<script>
	import selectSelfPro from './selectSelfPro.vue'
	import { mapGetters, mapActions } from 'vuex'
	
	export default {
		data() {
			return {
				list: [{
					name: '人气Top',
					id: 0,
					sizeArr: [{
						name: '规格',
						childlist: [{
							size: '大杯',
							isSelect: false
						}, {
							size: '中杯',
							isSelect: false
						}]
					}, {
						name: '温度',
						childlist: [{
							size: '冰',
							isSelect: false
						}, {
							size: '热',
							isSelect: false
						}]
					}, {
						name: '糖度',
						childlist: [{
							size: '全糖',
							isSelect: false
						}, {
							size: '半糖',
							isSelect: false
						}, {
							size: '无糖',
							isSelect: false
						}]
					}]
				}, {
					name: '店长推荐',
					id: 1
				}, {
					name: '今日推荐',
					id: 2
				}, {
					name: '精选臻品',
					id: 3
				}, {
					name: '最新上架',
					id: 4
				}, {
					name: '人气Top',
					id: 5
				}, {
					name: '店长推荐',
					id: 6
				}, {
					name: '今日推荐',
					id: 7
				}, {
					name: '精选臻品',
					id: 8
				}, {
					name: '最新上架',
					id: 9
				}],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true,
				sizeArr: [], //规格数组
				
				isShowSizeBox: false, //
				
				selectProH: 250, //
				isShowSelectList: false, //是否显示选择的产品列表
			}
		},
		components: {selectSelfPro},
		computed: {
			...mapGetters([
				'selfOrderObj'
			]),
			selectBoxH() {
				let sys = uni.getSystemInfoSync()
				return sys.windowWidth / 750 * 100 + this.selectProH
			}
		},
		onLoad() {
			
		},
		mounted() {
			
		},
		methods: {
			...mapActions([
				'toGetSelfOrder'
			]),
			// 选择产品数量
			toMinusNum: function() {
			  //   if (this.count > 1) {
					// this.totalPrice = this.$api.pointProblem(this.totalPrice, this.price, 'sub')
					// this.count--
			  //   }
			},
			toAddNum: function() {
				// this.count++
				// this.totalPrice = this.$api.pointProblem(this.totalPrice, this.price, 'add')
			},
			toJumpSureOrder() {
				uni.navigateTo({
					url: '/pages/selfPro/sureOrder'
				})
			},
			toShowSelectList() {
				this.isShowSelectList = !this.isShowSelectList
			},
			toCloseSelectList(e) {
				let sign = e.target.dataset.sign
				if(sign) {
					this.isShowSelectList = !this.isShowSelectList
				}
			},
			// 本页面
			toJumpSelectStore() {
				uni.navigateTo({
					url: '/pages/selfPro/selectStore'
				})
			},
			toSelectSelfPro(idx) {
				this.isShowSizeBox = true
				this.sizeArr = this.list[idx].sizeArr
				// this.toGetSelfOrder()
				/*
				1，通过id获取选择的产品信息
				2，加入购物车的产品加入到购物车列表中
				3，原产品列表添加一个是否被选中的状态，当产品列表或者购物车列表产品数量变化的时候，同步更新选择的数量
				4，通过产品数量计算购物车列表的高度，购物车列表高度不超过250px
				*/ 
			},
			toCloseBox(val) {
				this.isShowSizeBox = val
			},
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
						return false  //支付宝小程序暂时不支持双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				
				if (this.load) {
					for (let i = 0; i < this.list.length; i++) {
						let view = uni.createSelectorQuery().in(this).select("#main-" + this.list[i].id);
						view.fields({
							size: true
						}, data => {
							this.list[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.list[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (this.list[i].id - 1) * 50
						this.tabCur = this.list[i].id
						return false
					}
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.selfPro {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
	}
	.shop-name-position {
		padding: 30upx;
		display: flex;
		align-items: flex-end;
		.shop-name-box {
			display: flex;
			align-items: center;
			font-size: 32upx;
			font-weight: 800;
			color: $text-main-black;
			.shop-nama-txt {
				margin-left: 10upx;
			}
		}
		.show-distance-box {
			margin-left: 30upx;
			font-size: 24upx;
			color: $text-main-black;
		}
	}
	.show-main-img {
		padding: 0 30upx;
		.main-img-box {
			width: 100%;
			height: 276upx;
			background-color: $img-bg;
			border-radius: 20upx;
			overflow: hidden;
		}
	}
	.item-pro-box {
		border: none;
		margin-bottom: 50upx;
	}
	.item-pro-img {
		width: 140upx;
		height: 100%;
		border-radius: 4upx;
		background-color: $img-bg;
		margin-right: 20upx;
		overflow: hidden;
	}
	.item-pro-info {
		height: 100%;
		flex: 1;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.item-pro-name {
			.item-pro-name-title {
				font-size: 32upx;
				color: $text-main-black;
				font-weight: 700;
			}
			.item-pro-name-txt {
				font-size: 20upx;
				color: $text-grey;
			}
		}
		.item-pro-price-num {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.item-pro-price {
				font-size: 24upx;
				color: $text-main-black;
				font-weight: 600;
				text {
					display: inline-block;
					font-size: 28upx;
					margin-left: 4upx;
				}
			}
			.item-pro-num {
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
	
	.VerticalNav.nav {
		width: 180upx;
		white-space: initial;
		background-color: #F5F7FA;
		height: 100%;
	}
	
	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
		font-size: 28upx;
		color: $text-grey;
	}
	.cu-list.menu-avatar {
		padding-right: 10upx;
	}
	.VerticalNav.nav .show-cur-item {
		color: $text-main-black;
		background-color: #fff;
	}
	
	.VerticalBox {
		flex: 1;
		overflow: hidden;
		padding-top: 20upx;
		display: flex;
		flex-direction: column;
		.selfProScroll {
			flex: 1;
			overflow: hidden;
			display: flex;
			position: relative;
		}
		.buyCatBox {
			height: auto;
			width: 100%;
			background-color: #fff;
			position: relative;
			z-index: 200;
			.buyCatBtn {
				width: 100%;
				height: 100upx;
				display: flex;
				border-top: 1px solid #F5F6FA;
				background-color: #fff;
				position: relative;
				z-index: 66;
				.showCatPrice {
					flex: 1;
					overflow: hidden;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 30upx;
					.showCatNum {
						position: relative;
						.cuIcon-cart {
							font-size: 56upx;
							color: $text-main-black;
						}
						.showBuyNum {
							position: absolute;
							top: -8upx;
							right: -16upx;
							width: 40upx;
							height: 40upx;
							border-radius: 50%;
							overflow: hidden;
							text-align: center;
							line-height: 40upx;
							background-color: $text-red;
							font-size: 28upx;
							color: #fff;
						}
					}
					.showBuyPay {
						display: flex;
						align-items: center;
						.showBuyPayTxt {
							font-size: 28upx;
							color: $text-grey;
						}
						.showBuyPayNum {
							margin-left: 20upx;
							font-size: 32upx;
							color: $text-second-black;
							text {
								display: inline-block;
								font-size: 46upx;
								font-weight: 600;
								margin-left: 10upx;
							}
						}
					}
				}
				.toSureOrder {
					width: 260upx;
					height: 100%;
					background-color: $main-color;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 32upx;
					color: $text-main-black;
				}
			}
		}
	}
	
	.showBuyCatBg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.6);
		z-index: -1;
		opacity: 0;
		transition: all 0.3s;
		.buyCatList {
			position: absolute;
			bottom: 100upx;
			left: 0;
			background-color: #F6F9FA;
			width: 100%;
			height: auto;
			transition: all 0.3s;
			padding-bottom: 10upx;
			.buyCatTop {
				width: 100%;
				height: 80upx;
				padding: 0 30upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 10upx;
				background-color: $text-color;
				.buyCatTop1 {
					font-size: 28upx;
					color: $text-grey;
				}
				.buyCatTop2 {
					font-size: 28upx;
					color: $text-grey;
					display: flex;
					align-items: center;
					.cuIcon-delete {
						font-size: 32upx;
						margin-right: 10upx;
					}
				}
			}
			.buyListScroll {
				height: auto;
				width: 100%;
				.buyListScrollBox {
					width: 100%;
					height: 100%;
				}
				.itemBuyPro {
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 100%;
					height: 144upx;
					padding: 0 30upx;
					background-color: #fff;
					&:not(:last-child) {
						border-bottom: 1px solid  #F5F6FA;
					}
					.itemBuyLeft {
						.itemBuyProTitle {
							font-size: 32upx;
							color: $text-second-black;
							font-weight: 700;
							margin-bottom: 10upx;
						}
						.itemBuyProSize {
							font-size: 24upx;
							color: $text-second-black;
						}
					}
					.itemBuyRight {
						display: flex;
						align-items: center;
						.itemBuyPrice {
							font-size: 24upx;
							color: $text-second-black;
							text {
								font-size: 36upx;
								color: $text-second-black;
								margin-left: 10upx;
							}
						}
					}
				}
			}
		}
	}
	.activeBuyCatBg {
		z-index: 99;
		opacity: 1;
	}
	.show-pro-num {
		margin-left: 40upx;
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
	.VerticalMain {
		height: 100%;
		background-color: $text-color;
		flex: 1;
	}
	.pro-box-list {
		padding-left: 20upx;
		.item-list-top {
			height: 100upx;
			display: flex;
			align-items: center;
			font-size: 28upx;
			color: $text-main-black;
			&::after {
				content: '';
				display: block;
				height: 1px;
				flex: 1;
				overflow: hidden;
				margin-left: 20upx;
				background-color: #E5E5E5;
			}
		}
	}
</style>
