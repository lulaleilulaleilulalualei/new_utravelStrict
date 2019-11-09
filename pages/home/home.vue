<template>
	<view class="contentBox">
		<skeleton v-if="isShowSkeleton"></skeleton>
		
		<cu-custom :bgColor="navColor" :isBack="false" :textOpacity="textOpacity"><block slot="content">首页</block></cu-custom>
		<view class="homeBox">
			<scroll-view class="homeBoxScroll" :scroll-y="!isShowSkeleton" @scroll="toScroll">
				<view class="home-banner-box skeleton-rect">
					<swiper class="home-banner-swiper" :indicator-dots="false" :autoplay="true" :interval="4000" :duration="800">
						<swiper-item class="item-swiper-box" v-for="(item, idx) in homeData.banner_list" :key="idx" @tap="bannerToLineDetail(idx)">
							<view class="home-banner-img"><image :src="item.img" mode="aspectFill"></image></view>
							<view class="home-banner-title">
								<view class="home-main-title">{{item.title}}</view>
								<view class="home-second-title">{{item.desc}}</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="home-search-box"  :style="{visibility: isShowSkeleton? 'hidden': 'visible'}">
					<view class="home-search-content">
						<view class="home-search-icon"><image src="/static/search-icon.png" mode=""></image></view>
						<input class="home-to-search" type="text" :value="keyword" placeholder="搜索目的地/线路名称" confirm-type="go" @confirm="toSearchKeyword" placeholder-style="color: #909399;"/>
					</view>
				</view>
				<view class="item-content-box item-content-destination" v-if="homeData.area_list.length != 0">
					<view class="item-content-top">
						<view class="item-content-title">目的地</view>
						<view class="item-content-more-icon" @tap="toLineList"></view>
					</view>
					<view class="show-destination-box">
						<view class="item-destination-box skeleton-rect" v-for="(item, idx) in homeData.area_list" :key="idx" @tap="toJumpAreaList(idx)">
							<view class="item-destination-box-img"><image :src="item.thumb" mode="aspectFill"></image></view>
							<text>{{item.area_name}}</text>
						</view>
					</view>
				</view>
				<view class="item-content-box item-content-season" v-if="homeData.route_hot_list.length != 0">
					<view class="item-content-top">
						<view class="item-content-title">当季热卖</view>
						<view class="item-content-more-icon" @tap="toLineList"></view>
					</view>
					<view class="show-hot-season">
						<scroll-view class="show-hot-season-scroll" :scroll-x="true">
							<view class="item-show-hot-out skeleton-rect" v-for="(item, idx) in homeData.route_hot_list" :key="idx" @tap="toJumpLineDetail(item.rt_id)">
								<view class="item-show-hot">
									<view class="item-show-hot-img"><image :src="item.thumb" mode="aspectFill"></image></view>
									<view class="item-show-hot-title">{{item.title}}</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
				<view class="item-content-box item-content-recommend" v-if="homeData.route_newt_list.length != 0">
					<view class="item-content-top">
						<view class="item-content-title">最新推荐</view>
						<view class="item-content-more-icon" @tap="toLineList"></view>
					</view>
					<view class="show-new-recommend">
						<scroll-view :scroll-x="true" class="show-new-recommend-scroll">
							<view class="item-new-recommend-out skeleton-rect" v-for="(item, idx) in homeData.route_newt_list" :key="idx" @tap="toJumpLineDetail(item.rt_id)">
								<view class="item-new-recommend">
									<view class="item-recmd-img"><image :src="item.thumb" mode="aspectFill"></image></view>
									<view class="item-recomd-info">
										<view class="item-recomd-title">{{item.title}}</view>
										<view class="item-recomd-desc">{{item.sub_title}}</view>
										<view class="item-recmd-price">
											<view class="item-recmd-price-num">￥ <text>{{item.min_price}}</text></view>
											<view class="item-recmd-price-txt">起</view>
										</view>
									</view>
								</view>
							</view>	
						</scroll-view >
					</view>
				</view>
				<view class="member-card-ad">
					<view class="member-card-ad-box" @tap="toJumpMemberCard">
						<image :src="homeData.member_adv" mode="aspectFill"></image>
					</view>
				</view>
				<view class="item-content-box item-content-best" v-if="homeData.route_best_list.length != 0">
					<view class="item-content-top">
						<view class="item-content-title">严选精品</view>
						<view class="item-content-more-icon" @tap="toLineList"></view>
					</view>
					<view class="show-best-line">
						<view class="item-best-line" v-for="(item, idx) in homeData.route_best_list" :key="idx" @tap="toJumpLineDetail(item.rt_id)">
							<view class="item-line-img">
								<image :src="item.thumb" mode="aspectFill"></image>
								<text :decode="true" class="item-line-type">
									<text v-if="item.start_city_arr">{{item.start_city}}出发</text>
									<text class="item-type-border-line"  v-if="item.start_city_arr && item.cate_name">|</text>
									<text v-if="item.cate_name">{{item.cate_name}}</text>
								</text>
							</view>
							<view class="item-line-info">
								<view class="item-line-title">{{item.title}}</view>
								<view class="item-line-tags">
									<text class="item-line-tag" v-for="(v, i) in item.theme_list" :key="i">{{v}}</text>
								</view>
								<view class="item-line-price">
									<view class="item-line-price-num">￥ <text>{{item.min_price}}</text></view>
									<view class="item-line-price-txt">起</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<loadErr v-if="isLoadErr" @toRelaodData="toRelaodData"></loadErr>
		<!-- <noListData></noListData> -->
	</view>
</template>

<script>
	import skeleton from '@/components/quick-skeleton.vue'
	import loadErr from '@/components/loadErr.vue'
	// import noListData from '@/components/noListData.vue'
	import { mapGetters , mapActions } from 'vuex';
	
	export default {
		data() {
			return {
				isShowSkeleton: true,
				navColor: 'white',//导航背景色
				textOpacity: 0, //导航透明度
				isLoadErr: false, //页面加载出错
				homeData: {banner_list:[{}],area_list: [{},{},{},{}],route_hot_list: [{},{}], route_newt_list: [{}, {}]}, //首页数据
				keyword: '',
			}
		},	
		components: {skeleton, loadErr},
		onLoad() {
			if(!this.$userInfo) { //加载登录配置
				this.$api.userLogin(() => {})
			}
			
			setTimeout(() => {
				this.toGetData() //首页数据加载
			}, 100)
		},
		methods: {
			toScroll(e) {
				let top = e.detail.scrollTop
				this.textOpacity = top / 400 > 1 ? 1 : top / 400
			},
			toJumpMemberCard() {
				uni.navigateTo({
					url: '/pageMember/utravelMember/utravelMember'
				})
			},
			toLineList() {
				uni.navigateTo({
					url: '/pages/lineList/lineList'
				})
			},
			bannerToLineDetail(idx) {
				let obj = this.homeData.banner_list[idx]
				if(obj.type == 0) {
					if(obj.rt_id) {
						uni.navigateTo({
							url: `/pages/lineDetail/lineDetail?id=${obj.id}`
						})
					}
				}else if(obj.type == 1) {
					
				}
			},
			toJumpLineDetail(id) {
				uni.navigateTo({
					url: `/pages/lineDetail/lineDetail?id=${id}`
				})
			},
			toJumpAreaList(idx) { //目的地跳转
				const $this = this
				uni.navigateTo({
					url: `/pages/lineList/lineList?areaid=${$this.homeData.area_list[idx].area_id}`
				})
			},
			toSearchKeyword(e) { //搜索关键词
				this.keyword = ''
				uni.navigateTo({
					url: `/pages/lineList/lineList?keyword=${e.detail.value}`
				})
			},
			toGetData() {
				this.homeData = null
				this.$api.ajax({
					url: this.$config.indexApi
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						let obj = res.data.data
						this.homeData = obj
						setTimeout(() => {
							this.isShowSkeleton = false
						}, 200)
					}else {
						this.$api.warnNotice(res.data.message)
						this.isShowSkeleton = false
						this.isLoadErr = true
					}
				})
				.catch(() => {
					this.isShowSkeleton = false
					this.isLoadErr = true
				})
			},
			toRelaodData() {//重新加载
				this.homeData = {}
				this.isLoadErr = false
				this.isShowSkeleton = false
				this.toGetData()
			}
		}
	}
</script>

<style scoped lang="scss">
	.contentBox {
		width: 100%;
		height: 100%;
		position: relative;
		.homeBox {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 10;
			.homeBoxScroll {
				width: 100%;
				height: 100%;
			}
		}
	}
	.home-banner-box {
		width: 100%;
		height: 750upx;
		position: relative;
		// margin-bottom: 108upx;
		.home-banner-swiper {
			width: 100%;
			height: 100%;
			.item-swiper-box {
				background-color: $img-bg;
			}
		}
		.home-banner-img {
			width: 100%;
			height: 100%;
		}
		.home-banner-title {
			position: absolute;
			bottom: 48upx;
			left: 0;
			z-index: 1;
			width: 100%;
			height: auto;
			padding: 0 30upx;
			.home-main-title {
				font-size: 64upx;
				color: $text-color;
				margin-bottom: 10upx;
				// font-weight: 600;
			}
			.home-second-title {
				font-size: 32upx;
				color: $text-color;
				width: 100%;
				@extend .ellipse1;
				margin-bottom: 30upx;
			}
		}
	}
	.home-search-box {
		position: relative;
		top: -48upx;
		width: 100%;
		height: 96upx;
		z-index: 10;
		padding: 0 30upx;
		margin-bottom: 12upx;
		.home-search-content {
			background-color: $text-color;
			width: 100%;
			height: 100%;
			padding: 0 30upx;
			display: flex;
			align-items: center;
			box-shadow: 0 20upx 40upx 0 rgba(0,0,0,0.09);
			border-radius: 20upx;
		}
		.home-search-icon {
			width: 30upx;
			height: 30upx;
			margin-right: 32upx;
		}
		.home-to-search {
			flex: 1;
			height: 100%;
			display: block;
			font-size: 32upx;
			color: $text-main-black;
		}
	}
	.item-content-box {
		margin-bottom: 60upx;
		.item-content-top {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 30upx;
			.item-content-title {
				font-size: 36upx;
				color: $text-second-black;
				font-weight: 800;
			}
			.item-content-more-icon {
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				overflow: hidden;
				background-color: $icon-bg;
				&::after {
					content: '';
					display: block;
					width: 12upx;
					height: 12upx;
					border-radius: 2upx;
					border: 4upx solid $main-color;
					border-left-color: transparent;
					border-top-color: transparent;
					transform: rotate(-45deg);
					position: relative;
					left: -6upx;
				}
			}
		}
	}
	.item-content-destination {
		padding: 0 30upx;
		.show-destination-box {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.item-destination-box {
				width: 334upx;
				height: 200upx;
				border-radius: 12upx;
				overflow: hidden;
				position: relative;
				&:first-child {
					margin-bottom: 30upx;
				}
				.item-destination-box-img {
					background-color: rgba(0,0,0,0.2);
					width: 100%;
					height: 100%;
				}
				text {
					position: absolute;
					left: 20upx;
					bottom: 20upx;
					font-size: 28upx;
					color: $text-color;
				}
			}
		}
	}
	.item-content-season {
		width: 100%;
		height: auto;
		margin-bottom: 30upx;
		.item-content-top {
			padding: 0 30upx;
		}
		.show-hot-season {
			height: 392upx;
			width: 100%;
			.show-hot-season-scroll {
				width: 100%;
				height: 100%;
				white-space: nowrap;
				.item-show-hot-out {
					display: inline-block;
					height: 100%;
					padding-bottom: 30upx;
					margin: 0 10upx;
					&:first-child {
						margin-left: 30upx;
					}
					&:last-child {
						margin-right: 30upx;
					}
				}
				.item-show-hot {
					width: 280upx;
					height: 100%;
					position: relative;
					box-shadow: 0 10upx 20upx 0 rgba(0,0,0,0.10);
					.item-show-hot-img {
						width: 100%;
						height: 100%;
						border-radius: 12upx;
						overflow: hidden;
					}
					.item-show-hot-title {
						position: absolute;
						bottom: 0;
						left: 0;
						z-index: 1;
						width: 100%;
						height: 80upx;
						padding: 0 20upx;
						font-size: 28upx;
						border-radius: 0 0 12upx 12upx;
						overflow: hidden;
						color: $text-color;
						display: flex;
						align-items: center;
						background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.50) 100%);
						@extend .ellipse1;
					}
				}
			}
		}
	}
	
	.item-content-recommend {
		width: 100%;
		height: auto;
		margin-bottom: 30upx;
		.item-content-top {
			padding: 0 30upx;
		}
		.show-new-recommend {
			width: 100%;
			height: 498upx;
			.show-new-recommend-scroll {
				width: 100%;
				height: 100%;
				white-space: nowrap;
				.item-new-recommend-out {
					display: inline-block;
					height: 100%;
					padding-bottom: 30upx;
					margin: 0 10upx;
					&:first-child {
						margin-left: 30upx;
					}
					&:last-child {
						margin-right: 30upx;
					}
				}
				.item-new-recommend {
					width: 640upx;
					height: 100%;
					background: $text-color;
					box-shadow: 0 10upx 20upx 0 rgba(0,0,0,0.10);
					border-radius: 20upx;
					.item-recmd-img {
						width: 100%;
						height: 300upx;
						border-radius: 20upx 20upx 0 0;
						overflow: hidden;
					}
					.item-recomd-info {
						padding: 20upx;
						.item-recomd-title {
							font-size: 28upx;
							color: $text-second-black;
							font-weight: 800;
							margin-bottom: 10upx;
							@extend .ellipse1;
						}
						.item-recomd-desc {
							font-size: 24upx;
							color: $text-grey;
							@extend .ellipse1;
							margin-bottom: 10upx;
						}
						.item-recmd-price {
							display: flex;
							align-items: center;
							.item-recmd-price-num {
								font-size: 24upx;
								color: $text-red;
								font-weight: 600;
								text {
									display: inline-block;
									font-size: 32upx;
								}
							}
							.item-recmd-price-txt {
								font-size: 24upx;
								color: $text-second-black;
								margin-left: 10upx;
							}
						}
					}
				}
			}
		}
	}
	.member-card-ad {
		width: 100%;
		height: 260upx;
		padding: 0 30upx;
		margin-bottom: 60upx;
		.member-card-ad-box {
			width: 100%;
			height: 100%;
			background: #40404E;
			box-shadow: 0 10upx 20upx 0 rgba(0,0,0,0.10);
			border-radius: 20upx;
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 36upx;
			color: $text-color;
		}
	}
	.item-content-best {
		padding: 0 30upx;
		.show-best-line {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.item-best-line {
				width: 334upx;
				height: auto;
				background: $text-color;
				box-shadow: 0 10upx 20upx 0 rgba(0,0,0,0.10);
				border-radius: 20upx;
				margin-bottom: 30upx;
				.item-line-img {
					width: 100%;
					height: 200upx;
					border-radius: 20upx 20upx 0 0;
					overflow: hidden;
					position: relative;
					.item-line-type {
						position: absolute;
						top: 0;
						left: 0;
						padding: 10upx;
						background-color: rgba(0,0,0,0.6);
						border-radius: 20upx 0 20upx 0;
						font-size: 20upx;
						color: $text-color;
						display: flex;
						.item-type-border-line {
							margin: 0 6upx;
						}
					}
				}
				.item-line-info {
					padding: 20upx;
					.item-line-title {
						font-size: 28upx;
						color: $text-second-black;
						font-weight: 800;
						margin-bottom: 10upx;
						@extend .ellipse2;
					}
					.item-line-tags {
						display: flex;
						flex-wrap: wrap;
						.item-line-tag {
							background: #F5F7FA;
							border-radius: 4upx;
							padding: 2upx 10upx;
							font-size: 20upx;
							color: $text-main-black;
							margin: 0 10px 10px 0;
						}
					}
					.item-line-price {
						display: flex;
						align-items: center;
						.item-line-price-num {
							font-size: 24upx;
							color: $text-red;
							font-weight: 600;
							text {
								display: inline-block;
								font-size: 32upx;
							}
						}
						.item-line-price-txt {
							font-size: 24upx;
							color: $text-second-black;
							margin-left: 10upx;
						}
					}
				}
			}
		}
	}
</style>
