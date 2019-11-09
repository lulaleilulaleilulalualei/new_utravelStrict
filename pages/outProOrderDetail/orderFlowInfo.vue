<template>
	<view class="order-flow-info">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">订单详情</block></cu-custom>
		<view class="order-flow-content">
			<view class="flow-company-info">
				<view class="flow-company-info-content">
					<view class="flow-company-img"><image src="" mode="aspectFill"></image></view>
					<view class="flow-company-info-box">
						<view class="item-flow-company-info">
							<veiw class="flow-company-info-title">物流公司：</veiw>
							<view class="item-show-flow-company-name">天天快递</view>
						</view>
						<view class="item-flow-company-info">
							<veiw class="flow-company-info-title">物流公司：</veiw>
							<view class="item-show-flow-orderNo">
								<text>1569156156156</text>
								<view class="to-copy-flow-orderNo">复制</view>
							</view>
						</view>
						<view class="item-flow-company-info">
							<veiw class="flow-company-info-title">物流公司：</veiw>
							<view class="item-show-flow-phone">13463643586</view>
						</view>
					</view>
				</view>
			</view>
			<view class="to-get-goods-no">
				<view class="to-get-goods-no-1">到站取件</view>
				<view class="to-get-goods-no-2">取件码</view>
				<view class="to-get-goods-no-3">3-1-3085</view>
			</view>
			<view class="flow-item-info-box">
				<view class="item-flow-info">
					<view class="item-flow-info-icon"><image src="/static/get_goods_address.png" mode="aspectFill"></image></view>
					<view class="item-flow-info-box">
						<view class="item-flow-info-txt">[收货地址] 湖南省长沙市岳麓区 什么街道 麓谷街道第36栋</view>
						<view class="item-flow-info-txt">2018-12-06 20:23:56</view>
					</view>
				</view>
				<view class="item-flow-info">
					<view class="item-flow-info-icon"><image src="/static/wait_get_goods.png" mode="aspectFill"></image></view>
					<view class="item-flow-info-box item-active-flow-show">
						<view class="item-flow-info-status">待取件</view>
						<view class="item-flow-info-txt">您的快件已由男款女款男款女款男款女款男款你能看你那可能可能可能男款女款男款女款那你看你看</view>
						<view class="item-flow-info-txt">2018-12-06 20:23:56</view>
					</view>
				</view>
				<view class="item-flow-info">
					<view class="item-flow-info-icon"><image src="/static/delivery_in_being.png" mode="aspectFill"></image></view>
					<view class="item-flow-info-box">
						<view class="item-flow-info-status">派送中</view>
						<view class="item-flow-info-txt">南京南京南京南京南京南京南京南京你那你就南京南京 潘芸慧 <text>151515151515</text> 正在为您派件</view>
						<view class="item-flow-info-txt">2018-12-06 20:23:56</view>
					</view>
				</view>
				<view class="item-flow-info">
					<view class="item-flow-info-icon"><image src="/static/transport_being.png" mode="aspectFill"></image></view>
					<view class="item-flow-info-box">
						<view class="item-flow-info-status">派送中</view>
						<view class="item-flow-info-txt">把剪短发艰苦奋斗健康百废待举看白癜风健康环保合法代表好的发红包回家吧</view>
						<view class="item-flow-info-txt">2018-12-06 20:23:56</view>
					</view>
				</view>
				<view class="item-flow-info">
					<view class="item-flow-info-icon"><image src="/static/to_send_goods.png" mode="aspectFill"></image></view>
					<view class="item-flow-info-box">
						<view class="item-flow-info-status">已发货</view>
						<view class="item-flow-info-txt">把剪短发艰苦奋斗健康百废待举看白癜风健康环保合法代表好的发红包回家吧</view>
						<view class="item-flow-info-txt">2018-12-06 20:23:56</view>
					</view>
				</view>
			</view>
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
	.order-flow-content {
		padding: 30upx;	
	}
	.flow-company-info {
		.flow-company-info-content {
			width: 100%;
			display: flex;
		}
		.flow-company-img {
			width: 144upx;
			height: 144upx;
			background-color: $img-bg;
			margin-right: 20upx;
		}
		.flow-company-info-box {
			flex: 1;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.item-flow-company-info {
				display: flex;
				align-items: center;
				font-size: 26upx;
				.flow-company-info-title {
					color: $text-grey;
				}
				.item-show-flow-company-name {
					color: $text-red;
				}
				.item-show-flow-orderNo {
					display: flex;
					align-items: center;
					color: $text-grey;
					.to-copy-flow-orderNo {
						width: 68upx;
						height: 42upx;
						line-height: 42upx;
						text-align: center;
						border: 1px solid $text-main-black;
						color: $text-main-black;
						margin-left: 20upx;
					}
				}
				.item-show-flow-phone {
					color: $text-blue;
				}
			}
		}
		&:after {
			content: '';
			display: block;
			width: 100%;
			height: 10upx;
			background-color: #F7F7F7;
			margin-top: 30upx;
		}
	}
	.to-get-goods-no {
		padding-top: 30upx;
		&:after {
			content: '';
			display: block;
			width: 100%;
			height: 10upx;
			background-color: #F7F7F7;
			margin-top: 30upx;
		}
		.to-get-goods-no-1 {
			font-size: 28upx;
			color: $text-main-black;
			font-weight: 700;
			margin-bottom: 10upx;
			text-align: center;
		}
		.to-get-goods-no-2 {
			font-size: 24upx;
			color: $text-grey;
			margin-bottom: 10upx;
			text-align: center;
		}
		.to-get-goods-no-3 {
			font-size: 48upx;
			color: $text-main-black;
			text-align: center;
		}
	}
	.flow-item-info-box {
		position: relative;
		.item-flow-info {
			display: flex;
			position: relative;
			z-index: 10;
			&:first-child {
				.item-flow-info-icon {
					padding-top: 30upx;
					height: 78upx;
					background-color: $text-color;
				}
				.item-flow-info-txt  {
					padding-top: 30upx;
				}
			}
			&:last-child {
				background-color: $text-color;
				padding-bottom: 30upx;
			}
			&:not(:last-child) {
				margin-bottom: 40upx;
			}
			.item-flow-info-icon {
				width: 48upx;
				height: 48upx;
				border-radius: 50%;
				margin-right: 40upx;
			}
			.item-flow-info-box {
				flex: 1;
				font-size: 24upx;
				color: $text-grey;
				.item-flow-info-status {
					font-size: 28upx;
				}
				.item-flow-info-txt {
					text {
						display: inline-block;
						color: $text-red;
						margin: 0 10upx;
					}
				}
			}
			.item-active-flow-show {
				color: $text-main-black;
			}
		}
		&:before {
			content: '';
			display: block;
			position: absolute;
			left: 24upx;
			top: 0;
			width: 3upx;
			height: 100%;
			z-index: 1;
			background-color: #CCCCCC;
		}
	}
</style>
