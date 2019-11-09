<template>
	<view class="utravelMember">
		<cu-custom :bgColor="navColor" :isBack="true" :isShowBorder="false" :textOpacity="textOpacity"><block slot="content"><text style="color: #fff">超级会员</text></block></cu-custom>
		<view class="member-content">
			<scroll-view class="member-content-scroll" :scroll-y="true" @scroll="toScroll">
				<view class="member-home-img">
					<view class="member-logo-name">
						<view class="member-logo-img"><image src="/static/utravel_icon.png" mode=""></image></view>
						<view class="member-name-txt">优旅家严选</view>
					</view>
					<img :src="imgs.homeImg" alt="">
					<view class="member-power-title">
						<text class="member-power-title1">开通立享</text>
						<text class="member-power-title2">六大特权</text>
					</view>
				</view>
				<view class="all-power-box">
					<view class="item-power-box" v-for="(item, idx) in powerArr" :key="idx">
						<view class="item-power-img">
							<image :src="item.img" mode=""></image>
						</view>
						<view class="item-power-name">{{item.name}}</view>
						<view class="item-power-text">{{item.desc}}</view>
					</view>
				</view>
				<view class="to-open-member">
					<view class="to-open-member-box">
						<view class="to-open-member-price">268元/年</view>
						<view class="to-open-member-txt">立即开通超级会员</view>
					</view>
				</view>
				<view class="member-fine-line">
					<view class="member-fine-title">
						<view class="member-fine-title-bg"><image :src="imgs.fineLineBg" mode=""></image></view>
						<view class="member-fine-title-box">
							<view class="member-fine-title-txt"><image :src="imgs.fineLineTitleBg" mode=""></image></view>
							<view class="member-fine-title-name"><text>超级会员精选线路</text></view>
						</view>
					</view>
					<view class="member-fine-line-list">
						<view class="item-fine-line" v-for="(item, idx) in 2" :key="item" @tap="toJumpLineDetail(idx)">
							<view class="item-line-img">
								<image src="/static/test_img_2.jpeg" mode="aspectFill"></image>
							</view>
							<view class="item-line-info">
								<view class="item-line-title">长沙长沙长沙长沙长沙长沙长沙长沙长沙</view>
								<view class="item-line-price-box">
									<view class="item-line-price">￥<text>6280</text></view>
									<view class="item-line-price-txt">起</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navColor: '#292A3F',//导航背景色
				textOpacity: 0, //导航透明度

				imgs: {
					homeImg: require('../imgs/home_icon.png'),
					fineLineBg: require('../imgs/mini_icon_2.png'),
					fineLineTitleBg: require('../imgs/mini_icon_1.png')
				},
				
				powerArr: [{
					img: require('../imgs/power_icon_1.png'),
					name: '线路立减',
					desc: '旅游线路会员价'
				}, {
					img: require('../imgs/power_icon_2.png'),
					name: '踩线体验',
					desc: '踩线体验旅行'
				}, {
					img: require('../imgs/power_icon_3.png'),
					name: '咖啡优享',
					desc: '文创咖啡超低享受'
				}, {
					img: require('../imgs/power_icon_4.png'),
					name: '购物省钱',
					desc: '户外用品超低折扣'
				}, {
					img: require('../imgs/power_icon_5.png'),
					name: '专享卡券',
					desc: '65元无门槛'
				}, {
					img: require('../imgs/power_icon_6.png'),
					name: '邀请奖励',
					desc: '尊享65元抵用卷'
				}]
			}
		},
		methods: {
			toScroll(e) {
				let top = e.detail.scrollTop
				this.textOpacity = top / 400 > 1 ? 1 : top / 400
			},
			toJumpLineDetail(idx) {
				uni.navigateTo({
					url: '/pages/lineDetail/lineDetail'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.utravelMember {
		width: 100%;
		height: 100%;
		position: relative;
		.member-content {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 88;
			width: 100%;
			height: 100%;
			background-color: #292A3F;
		}
		.member-content-scroll {
			width: 100%;
			height: 100%;
		}
	}
	.member-home-img {
		width: 100%;
		height: 1096upx;
		position: relative;
		.member-logo-name {
			position: absolute;
			left: 0;
			top: 90upx;
			width: 100%;
			height: auto;
			z-index: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			.member-logo-img {
				width: 60upx;
				height: 60upx;
				border-radius: 50%;
				overflow: hidden;
				margin-right: 20upx;
			}
			.member-name-txt {
				font-size: 44upx;
				color: $text-color;
				font-weight: 600;
			}
		}
		.member-power-title {
			position: absolute;
			left: 0;
			bottom: 40upx;
			z-index: 1;
			width: 100%;
			height: 140upx;
			line-height: 140upx;
			text-align: center;
			.member-power-title1 {
				display: inline-block;
				font-size: 40upx;
				color: $text-color;
				font-weight: 600;
				margin-right: 20upx;
			}
			.member-power-title2 {
				display: inline-block;
				font-size: 40upx;
				color: #FDD272;
				font-weight: 600;
			}
		}
	}
	
	.all-power-box {
		width: 100%;
		height: auto;
		display: flex;
		flex-wrap: wrap;
		padding: 0 100upx;
		position: relative;
		top: -40upx;
		.item-power-box {
			width: 33.3%;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 40upx;
			.item-power-img {
				width: 88upx;
				height: 88upx;
				border-radius: 50%;
				overflow: hidden;
				margin-bottom: 10upx;
			}
			.item-power-name {
				font-size: 24upx;
				color: #FDD272;
				margin-bottom: 6upx;
			}
			.item-power-text {
				font-size: 20upx;
				color: #A48E6B;
			}
		}
	}
	
	.to-open-member {
		width: 100%;
		height: 90upx;
		padding: 0 30upx;
		margin-bottom: 60upx;
		.to-open-member-box {
			height: 100%;
			width: 100%;
			border-radius: 45upx;
			display: flex;
			align-items: center;
			justify-content: center;
			background-image: linear-gradient(-42deg, #DB9535 0%, #FCD272 100%);
			font-size: 38upx;
			color: $text-second-black;
			font-weight: 600;
			.to-open-member-price {
				margin-right: 30upx;
			}
			
		}
	}
	
	.member-fine-line {
		padding: 0 30upx 30upx;
		.member-fine-title {
			width: 100%;
			height: auto;
			position: relative;
			margin-bottom: 60upx;
			padding-bottom: 20upx;
			.member-fine-title-bg {
				width: 378upx;
				height: 38upx;
				margin: 0 auto;
				position: relative;
				z-index: 1;
			}
			.member-fine-title-box {
				position: absolute;
				left: 0;
				bottom: 0;
				z-index: 10;
				width: 100%;
				height: 44upx;
				display: flex;
				align-items: center;
				justify-content: center;
				.member-fine-title-txt {
					width: 468upx;
					height: 8upx;
				}
				.member-fine-title-name {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 32upx;
					color: $text-color;
				}
			}
		}
	}
	
	.member-fine-line-list {
		display: flex;
		justify-content: space-between;
		.item-fine-line {
			width: 334upx;
			height: auto;
			border-radius: 20upx;
			overflow: hidden;
			.item-line-img {
				width: 100%;
				height: 200upx;
			}
			.item-line-info {
				padding: 20upx 0;
				.item-line-title {
					font-size: 28upx;
					color: $text-color;
					font-weight: 600;
					margin-bottom: 10upx;
					@extend .ellipse2;
				}
				.item-line-price-box {
					display: flex;
					align-items: flex-end;
					.item-line-price {
						display: flex;
						align-items: flex-end;
						font-size: 20upx;
						color: $main-color;
						font-weight: 600;
						text {
							display: inline-block;
							margin-left: 4upx;
							font-size: 32upx;
							line-height: 32upx;
						}
					}
					.item-line-price-txt {
						font-size: 20upx;
						color: #B6B6B6;
						margin-left: 4upx;
					}
				}
			}
		}
	}
</style>
