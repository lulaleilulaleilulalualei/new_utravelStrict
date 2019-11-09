<template>
	<view class="lineOrderDetail">
		<cu-custom :bgColor="navColor" :isShowBorder="isShowNavBorder" :isBack="true"><block slot="content">订单详情</block></cu-custom>
		<view class="order-detail-box">
			<scroll-view class="order-detail-scroll" :scroll-y="true" @scroll="toScroll">
				<view class="order-detail-content">
					<view class="order-detail-bg-color"></view>
					<view class="show-order-content" :style="[{paddingTop: navTop}]">
						<view class="show-user-info">
							<view class="show-user-head"><image src="/static/utravel_icon.png" mode=""></image></view>
							<view class="show-user-name">hi,柳顺子</view>
						</view>
						<view class="show-order-status">您已取消订单</view>
						<view class="order-pro-info">
							<view class="line-order-title">产品信息</view>
							<view class="order-pro-info-1"><text>长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙</text></view>
							<view class="order-pro-info-2">出行日期：2019-12-12</view>
							<view class="order-pro-info-2">成人：¥2222 x2</view>
							<view class="order-pro-info-3">儿童：¥2222 x2</view>
						</view>
						<view class="order-pro-cost">
							<view class="order-pro-cost-left">
								<view class="order-pro-cost-title">订单总额</view>
								<view class="order-pro-cost-price">¥2666</view>
							</view>
							<view class="order-pro-cost-right" @tap="toShowCostDetail">
								<view class="order-pro-detail">费用明细</view>
							</view>
						</view>
						<view class="line-orders-person">
							<view class="line-order-title">预订人信息</view>
							<view class="line-order-person-info">联系人：柳顺子</view>
							<view class="line-order-person-info">手机号：131****5599</view>
							<view class="line-order-person-info">邮箱</view>
							<view class="line-order-person-remark">
								<view class="line-order-person-remark-title">备注：</view>
								<view class="line-order-person-remark-content"></view>
							</view>
						</view>
						<view class="line-order-info">
							<view class="line-order-title">订单信息</view>
							<view class="item-line-order-info">创建时间：2019-12-12 10:22:22</view>
							<view class="item-line-order-info">订单编号：54456456456456456456456</view>
						</view>
						<view class="line-order-invoice">
							<view class="line-order-title">发票信息</view>
							<view class="item-line-invoice-info">发票类型：电子发票</view>
							<view class="item-line-invoice-info-name">
								<view class="item-line-invoice-info-1">发票抬头：</view>
								<view class="item-line-invoice-info-2">优旅家犇车网络科技</view>
							</view>
							<view class="item-line-invoice-info">纳税人识别号：pt414845155418</view>
						</view>
					</view>
				</view>
				<!-- 底部顶高 -->
				<view class="cu-tabbar-height"></view>
			</scroll-view>
		</view>
		
		<view class="line-order-bottom">
			<view class="item-line-order-btn">
				<view class="item-line-btn-icon"><image src="" mode=""></image></view>
				<view class="item-line-btn-title">首页</view>
			</view>
			<view class="item-line-order-btn">
				<view class="item-line-btn-icon"><image src="" mode=""></image></view>
				<view class="item-line-btn-title">客服</view>
			</view>
			<view class="item-line-order-btn">
				<view class="item-line-btn-icon"><image src="" mode=""></image></view>
				<view class="item-line-btn-title">再次购买</view>
			</view>
			<view class="item-line-order-btn" @tap="toJumpWriteComment">
				<view class="item-line-btn-icon"><image src="" mode=""></image></view>
				<view class="item-line-btn-title">评价</view>
			</view>
		</view>
		
		<costDetail v-if="isShowCostDetail" @toCloseDetailBox="toCloseDetailBox"></costDetail>
		<loadErr v-if="isLoadErr" @toRelaodData="toRelaodData"></loadErr>
	</view>
</template>

<script>
	import costDetail from '../writeOrder/costDetail.vue'
	import loadErr from '@/components/loadErr.vue'
	
	export default {
		data() {
			return {
				navColor: 'rgba(255,2555,255,0)',
				isShowCostDetail: false, //是否查看消费明细
				isShowNavBorder: false, //是否显示导航边框线
				isLoadErr: false, //是否加载失败
				detailData: null, //详情数据
				id: '', //订单id
			}
		},
		components: { costDetail, loadErr },
		computed: {
			navTop() {
				return this.CustomBar + 'px'
			}
		},
		onLoad(opt) {
			this.id = opt.id
			// this.getOrderDetail()
		},
		methods: {
			toScroll(e) {
				let top = e.detail.scrollTop
				this.navColor = `rgba(255,2555,255,${ top / 200 > 1 ? 1 : top / 200 })`
				if(top >= 200) {
					this.isShowNavBorder = true
				}else {
					this.isShowNavBorder = false
				}
			},
			toShowCostDetail() {
				this.isShowCostDetail = !this.isShowCostDetail
			},
			toCloseDetailBox(val) {
				this.isShowCostDetail = val
			},
			toJumpWriteComment() {
				uni.navigateTo({
					url: '/pages/writeComment/writeComment'
				})
			},
			toRelaodData() {//重新加载
				this.detailData = null
				this.isLoadErr = false
				this.getOrderDetail()
			},
			getOrderDetail() { //获取订单详情
				this.$api.ajax({
					url: ''
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						let obj = res.data.data
						this.detailData = obj
					}else {
						this.$api.warnNotice(res.data.message)
						this.isLoadErr = true
					}
				})
				.catch(() => {
					this.isLoadErr = true
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.lineOrderDetail {
		width: 100%;
		height: 100%;
		position: relative;
		.order-detail-box {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 40;
			width: 100%;
			height: 100%;
			background-color: #F6F9FA;
			.order-detail-scroll {
				width: 100%;
				height: 100%;
				.order-detail-content {
					width: 100%;
					height: auto;
					position: relative;
				}
			}
		}
	}
	.order-detail-bg-color {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		height: 412upx;
		background-image: linear-gradient(90deg, #FCEC61 0%, #F2B912 100%);
	}
	.show-order-content {
		position: relative;
		z-index: 10;
		padding: 0 30upx;
		.show-user-info {
			padding: 20upx 0;
			display: flex;
			align-items: center;
			.show-user-head {
				width: 68upx;
				height: 68upx;
				border-radius: 50%;
				overflow: hidden;
				margin-right: 20upx;
			}
			.show-user-name {
				font-size: 36upx;
				color: $text-main-black;
				font-weight: 600;
			}
		}
		.show-order-status {
			font-weight: 800;
			font-size: 40upx;
			letter-spacing: 2upx;
			margin-bottom: 20upx;
		}
	}
	.line-order-title {
		font-size: 32upx;
		color: $text-main-black;
		font-weight: 600;
		margin-bottom: 20upx;
	}
	.order-pro-info {
		padding: 30upx;
		border-radius: 20upx;
		margin-bottom: 20upx;
		background-color: $text-color;
		.order-pro-info-1 {
			font-size: 28upx;
			color: $text-main-black;
			width: 100%;
			margin-bottom: 20upx;
			display: flex;
			align-items: center;
			text {
				flex: 1;
				@extend .ellipse1;
			}
			&:after {
				content: '';
				display: block;
				width: 12upx;
				height: 12upx;
				border: 1px solid #CCCCCC;
				border-left-color: transparent;
				border-top-color: transparent;
				transform: rotate(-45deg);
				margin-left: 20upx;
			}
		}
		.order-pro-info-2 {
			font-size: 28upx;
			color: $text-main-black;
			width: 100%;
			margin-bottom: 20upx;
		}
		.order-pro-info-3 {
			font-size: 28upx;
			color: $text-main-black;
			width: 100%;
		}
	}
	.order-pro-cost {
		background-color: $text-color;
		padding: 30upx;
		border-radius: 20upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20upx;
		.order-pro-cost-left {
			display: flex;
			align-items: center;
			font-weight: 700;
			.order-pro-cost-title {
				font-size: 32upx;
				color: $text-main-black;
				margin-right: 20upx;
			}
			.order-pro-cost-price {
				font-size: 32upx;
				color: $text-red;
			}
		}
		.order-pro-cost-right {
			display: flex;
			align-items: center;
			.order-pro-detail {
				font-size: 24upx;
				color: $text-blue;
			}
			&:after {
				content: '';
				display: block;
				width: 12upx;
				height: 12upx;
				border: 1px solid #CCCCCC;
				border-left-color: transparent;
				border-top-color: transparent;
				transform: rotate(-45deg);
				margin-left: 20upx;
			}
		}
	}
	.line-orders-person {
		width: 100%;
		height: auto;
		padding: 30upx;
		border-radius: 20upx;
		background-color: $text-color;
		margin-bottom: 20upx;
		.line-order-person-info {
			font-size: 28upx;
			color: $text-main-black;
			margin-bottom: 20upx;
		}
		.line-order-person-remark {
			font-size: 28upx;
			color: $text-main-black;
			display: flex;
			align-items: center;
			.line-order-person-remark-content {
				flex: 1;
				overflow: hidden;
			}
		}
	}
	.line-order-info {
		width: 100%;
		height: auto;
		padding: 30upx;
		border-radius: 20upx;
		background-color: $text-color;
		margin-bottom: 20upx;
		.item-line-order-info {
			font-size: 28upx;
			color: $text-main-black;
			margin-bottom: 20upx;
		}
	}
	
	.line-order-invoice {
		width: 100%;
		height: auto;
		padding: 30upx;
		border-radius: 20upx;
		background-color: $text-color;
		margin-bottom: 20upx;
		.item-line-invoice-info {
			font-size: 28upx;
			color: $text-main-black;
			margin-bottom: 20upx;
		}
		.item-line-invoice-info-name {
			font-size: 28upx;
			color: $text-main-black;
			margin-bottom: 20upx;
			display: flex;
			align-items: center;
			.item-line-invoice-info-2 {
				flex: 1;
				overflow: hidden;
			}
		}
	}
	.line-order-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 50;
		width: 100%;
		height: 100upx;
		background-color: $text-color;
		border-top: 1px solid $border-color;
		display: flex;
		padding: 30upx 0;
		.item-line-order-btn {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			&:not(:last-child) {
				border-right: 1px solid $border-color;
			}
			.item-line-btn-icon {
				width: 32upx;
				height: 32upx;
				background-color: $img-bg;
				margin-right: 10upx;
			}
			.item-line-btn-title {
				font-size: 28upx;
				color: $text-second-black;
				font-weight: 700;
			}
		}
	}
</style>
