<template>
	<view class="integralList">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">排名</block></cu-custom>
		<view class="igl-bg-box">
			<view class="igl-bg-img"><image src="/static/integral_bg.png" mode=""></image></view>
			<view class="igl-bg-title">积分排行榜</view>
		</view>
		<view class="igl-content-box">
			<view class="cur-igl-box">
				<view class="cur-igl-box-top">
					<view class="cur-igl-info">
						<view class="cur-info-img"><image src="" mode=""></image></view>
						<view class="cur-info-box">
							<view class="cur-info-name">哎呦喂</view>
							<view class="cur-info-ranking">第138名</view>
						</view>
					</view>
					<view class="cur-igl-num">7907</view>
				</view>
				<view class="cur-igl-box-bottom">
					<view class="cul-igl-share"><image src="/static/share_integral.png" mode=""></image></view>
					<view class="cul-igl-share-txt">晒一下</view>
				</view>
			</view>
			<view class="igl-ranking-list">
				<view class="item-igl-ranking" v-for="(item, idx) in 10" :key="idx">
					<view class="item-igl-ranking-left">
						<view class="item-igl-ranking-idx">{{idx+1}}</view>
						<view class="item-igl-user-img"><image src="" mode=""></image></view>
						<view class="item-igl-user-name">哎呦喂</view>
					</view>
					<view :class="['item-igl-ranking-right', {'item-igl-toTop': idx < 3}]">17907</view>
				</view>
			</view>
			
			<view class="to-invite-friend">邀请好友</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.igl-bg-box {
		width: 100%;
		height: 542upx;
		position: relative;
		.igl-bg-img {
			width: 100%;
			height: 100%;
			position: relative;
			z-index: 1;
		}
		.igl-bg-title {
			position: absolute;
			top: 184upx;
			left: 30upx;
			z-index: 10;
			font-size: 56upx;
			color: $text-second-black;
			font-weight: 800;
		}
	}
	.igl-content-box {
		position: relative;
		top: -90upx;
		z-index: 10;
		padding: 0 30upx;
		.cur-igl-box {
			box-shadow: 0 4upx 16upx 0 rgba(0,0,0,0.20);
			border-radius: 12upx;
			overflow: hidden;
			margin-bottom: 60upx;
			background-color: $text-color;
			.cur-igl-box-top {
				display: flex;
				align-items: center;
				padding: 30upx 30upx 30upx 80upx;
				.cur-igl-info {
					flex: 1;
					display: flex;
					align-items: center;
					.cur-info-img {
						width: 80upx;
						height: 80upx;
						border-radius: 50%;
						background-color: $img-bg;
						margin-right: 20upx;
					}
					.cur-info-box {
						flex: 1;
						.cur-info-name {
							width: 100%;
							font-size: 32upx;
							color: $text-main-black;
							@extend .ellipse1;
						}
						.cur-info-ranking {
							font-size: 28upx;
							color: $text-grey;
						}
					}
				}
				.cur-igl-num {
					font-size: 52upx;
					color:  #70BDFF;
					margin-left: 10upx;
				}
			}
			.cur-igl-box-bottom {
				background-image: linear-gradient(90deg, #FCED49 0%, #F7CD41 100%);
				height: 112upx;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				.cul-igl-share {
					width: 36upx;
					height: 36upx;
					margin-right: 20upx;
				}
				.cul-igl-share-txt {
					font-size: 40upx;
					color: $text-second-black;
				}
			}
		}
		.igl-ranking-list {
			box-shadow: 0 4upx 16upx 0 rgba(0,0,0,0.20);
			border-radius: 6px;
			background-color: $text-color;
			overflow: hidden;
			margin-bottom: 30upx;
			.item-igl-ranking {
				height: 140upx;
				width: 100%;
				display: flex;
				align-items: center;
				padding: 0 30upx;
				&:not(:last-child) {
					border-bottom: 1px solid $border-color;
				}
				.item-igl-ranking-left {
					height: 100%;
					flex: 1;
					display: flex;
					align-items: center;
					position: relative;
					padding-left: 50upx;
					.item-igl-user-img {
						width: 80upx;
						height: 80upx;
						background-color: $img-bg;
						margin-right: 20upx;
						border-radius: 50%;
						overflow: hidden;
					}
					.item-igl-user-name {
						font-size: 32upx;
						color: $text-main-black;
						flex: 1;
						@extend .ellipse1;
					}
					.item-igl-ranking-idx {
						position: absolute;
						left: 0;
						top: 0;
						height: 100%;
						line-height: 140upx;
						font-size: 32upx;
						color: $text-main-black;
					}
				}
				.item-igl-ranking-right {
					font-size: 52upx;
					color: #808080;
					margin-left: 20upx;
				}
				.item-igl-toTop {
					color: #FFA611;
				}
			}
		}
		.to-invite-friend {
			text-align: center;
			font-size: 28upx;
			color: $text-blue;
			position: relative;
			top: 30upx;
		}
	}
</style>
