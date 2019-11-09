<template>
	<view class="myOrders">
		<cu-custom bgColor="white" :isBack="true" :isShowBorder="false"><block slot="content">我的订单</block></cu-custom>
		
		<view class="order-type-box">
			<view :class="['item-order-type', {'item-active-order': orderType == item.type}]" 
				v-for="(item, idx) in orderArr" 
				:key="idx" 
				@tap="toCutOrderType(idx)">{{item.title}}</view>
		</view>
		
		<view class="orders-list">
			<scroll-view class="orders-list-scroll" :scroll-y="true">
				<!-- 线路 -->
				<view class="item-orders-box">
					<view class="item-order-status">
						<view class="item-order-time">
							<text class="cuIcon-time lg "></text>
							<text class="item-order-time-txt">2019/10/25</text>
						</view>
						<view class="item-order-status-txt order-had-start">活动已开始</view>
					</view>
					<view class="item-order-info-box">
						<view class="item-order-img"><image src="" mode=""></image></view>
						<view class="item-order-info">
							<view class="item-order-title">南京南京南京南京南京南京南京南京南京南京南京南京南京南京</view>
							<view class="item-order-startTime">出发日期：2019-12-12</view>
							<view class="item-order-price-sum">
								<view class="item-order-price">价格：¥149</view>
								<view class="item-order-sum">x1</view>
							</view>
						</view>
					</view>
					<view class="item-order-total">共1人报名，合计 <text>¥ 27</text></view>
				</view>
				
				<!-- 茶咖 -->
				<view class="item-orders-box">
					<view class="item-order-status">
						<view class="item-order-time">
							<text class="cuIcon-location lg"></text>
							<text class="item-order-time-txt">麓云路店</text>
						</view>
						<view class="item-order-status-txt order-had-start">制作中</view>
					</view>
					<view class="item-order-info-box">
						<view class="item-order-img"><image src="" mode=""></image></view>
						<view class="item-order-info">
							<view class="item-order-title">梅梅芝士茉香绿茶</view>
							<view class="item-order-startTime">已选：大 / 冰 / 全糖</view>
							<view class="item-order-price-sum">
								<view class="item-order-price">价格：¥149</view>
								<view class="item-order-sum">x1</view>
							</view>
						</view>
					</view>
					<view class="item-order-total">共2件商品报名，合计 <text>¥ 27</text></view>
				</view>
				
				<!-- 产品 -->
				<view class="item-orders-box">
					<view class="item-order-status">
						<view class="item-order-time">
							<view class="item-order-store-img"><image src="" mode=""></image></view>
							<text class="item-order-time-txt">店铺名称</text>
						</view>
						<view class="item-order-status-txt order-had-start">卖家已发货</view>
					</view>
					<view class="item-order-info-box" v-for="(item, idx) in 2" :key="idx">
						<view class="item-order-img"><image src="" mode=""></image></view>
						<view class="item-order-info">
							<view class="item-order-title">东鹏卫浴惠普能尽可能点点滴的将南京点点滴的将南京</view>
							<view class="item-order-startTime">颜色：粉色</view>
							<view class="item-order-startTime">尺码：xl</view>
							<view class="item-order-price-sum">
								<view class="item-order-price">价格：¥149</view>
								<view class="item-order-sum">x1</view>
							</view>
						</view>
					</view>
					<view class="show-out-freight">
						<text>运费</text>
						<text>¥ 10</text>
					</view>
					<view class="item-out-order-total">
						<view class="item-order-total-box">
							共2件商品报名，合计 <text>¥ 27</text>
						</view>
						<view class="item-order-opt">
							<view class="item-order-opt-1">查看物流</view>
							<view class="item-order-opt-2">确认收货</view>
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
				orderArr: [{
					title: '线路订单',
					type: 1
				}, {
					title: '茶咖订单',
					type: 2
				}, {
					title: '产品订单',
					type: 3
				}],
				orderType: 1
			}
		},
		methods: {
			toCutOrderType(idx) {
				this.orderArr.map((v, i) => {
					if(idx == i) {
						this.orderType = v.type
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.myOrders {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #F6F9FA;
		.order-type-box {
			width: 100%;
			height: 88upx;
			background-color: $text-color;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30upx;
			border-bottom: 1px solid $border-color;
			.item-order-type {
				line-height: 84upx;
				font-size: 28upx;
				color: $text-main-black;
				border-bottom: 4upx solid transparent;
			}
			.item-active-order {
				font-weight: 800;
				border-color: $main-color;
			}
		}
		.orders-list {
			flex: 1;
			overflow: hidden;
			width: 100%;
			padding: 30upx 30upx 0;
			.orders-list-scroll {
				width: 100%;
				height: 100%;
			}
		}
	}
	.item-orders-box {
		background: $text-color;
		border-radius: 20upx;
		padding: 30upx;
		margin-bottom: 30upx;
		.item-order-status {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.item-order-time {
				display: flex;
				align-items: center;
				.cuIcon-time {
					font-size: 24upx;
					color: $text-grey;
					font-weight: 700;
				}
				.item-order-time-txt {
					font-size: 28upx;
					color: $text-second-black;
					margin-left: 10upx;
				}
				.item-order-store-img {
					width: 30upx;
					height: 30upx;
					background-color: $img-bg;
					margin-right: 10upx;
				}
			}
			.item-order-status-txt {
				font-size: 28upx;
			}
			.order-had-start {
				color: $text-red;
			}
		}
		.item-order-info-box {
			height: 236upx;
			display: flex;
			align-items: center;
			padding: 30upx 0;
			border-bottom: 1px solid $border-color;
			.item-order-img {
				width: 176upx;
				height: 100%;
				background-color: $img-bg;
				margin-right: 20upx;
			}
			.item-order-info {
				flex: 1;
				overflow: hidden;
				height: 100%;
				display: flex;
				flex-direction: column;
				.item-order-title {
					font-size: 24upx;
					color: $text-main-black;
					font-weight: 700;
					margin-bottom: 10upx;
					@extend .ellipse1;
				}
				.item-order-startTime {
					font-size: 24upx;
					color: $text-grey;
					margin-bottom: 10upx;
				}
				.item-order-price-sum {
					display: flex;
					align-items: center;
					justify-content: space-between;
					.item-order-price {
						font-size: 24upx;
						color: $text-grey;
					}
					.item-order-sum {
						font-size: 24upx;
						color: $text-main-black;
					}
				}
			}
		}
		.item-order-total {
			padding-top: 30upx;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			font-size: 24upx;
			color: $text-second-black;
			text {
				display: inline-block;
				margin-left: 20upx;
				font-size: 28upx;
				font-weight: 600;
			}
			.item-order-total-box {
				display: flex;
				align-items: center;
				justify-content: flex-end;
			}
			.item-order-opt {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				.item-order-opt-1 {
					width: 152upx;
					height: 56upx;
					text-align: center;
					line-height: 56upx;
					margin-right: 20upx;
					border: 1px solid #909399;
					border-radius: 28upx;
					margin-bottom: 30upx;
				}
				.item-order-opt-2 {
					width: 152upx;
					height: 56upx;
					text-align: center;
					line-height: 56upx;
					background-color: $main-color;
					border-radius: 28upx;
				}
			}
		}
		.show-out-freight {
			padding: 30upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 28upx;
			color: $text-main-black;
			border-bottom: 1px solid $border-color;
		}
		.item-out-order-total {
			padding-top: 30upx;
			font-size: 24upx;
			color: $text-second-black;
			text {
				display: inline-block;
				margin-left: 20upx;
				font-size: 28upx;
				font-weight: 600;
			}
			.item-order-total-box {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				margin-bottom: 30upx;
			}
			.item-order-opt {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				.item-order-opt-1 {
					width: 152upx;
					height: 56upx;
					text-align: center;
					line-height: 56upx;
					margin-right: 20upx;
					border: 1px solid #909399;
					border-radius: 28upx;
				}
				.item-order-opt-2 {
					width: 152upx;
					height: 56upx;
					text-align: center;
					line-height: 56upx;
					background-color: $main-color;
					border-radius: 28upx;
				}
			}
		}
	}
</style>
