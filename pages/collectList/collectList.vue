<template>
	<view class="collectList">
		<cu-custom bgColor="white" :isBack="true" :isShowBorder="false"><block slot="content">我的收藏</block></cu-custom>
		
		<view class="collect-type-box">
			<view :class="['item-collect-type', {'item-active-type': selectType == item.type}]" v-for="(item, idx) in typeArr" :key="idx" @tap="toCutCollectType(idx)">
				<text>{{item.title}}</text>
			</view>
		</view>
		
		<!-- 全部收藏 -->
		<view class="collect-list" v-if="selectType == ''">
			<scroll-view v-if="all_dataList.length != 0" class="collect-list-scroll" :scroll-y="true" @scrolltolower="toLoadMore">
				<view class="item-collect-box" v-for="(item, idx) in all_dataList" :key="idx" @tap="toJumpDetail(idx)">
					<view class="item-collect-img">
						<image :src="item.infoObj.thumb" mode=""></image>
						<view class="item-collect-type-icon">{{item.type == 1? '线路': '商品'}}</view>
					</view>
					<view class="item-collect-info">
						<view class="item-collect-title">{{item.infoObj.title}}</view>
						<view class="item-collect-price">
							<view class="item-collect-price-cost">￥ <text>{{item.min_adult_price || '暂无定价'}}</text></view>
							<view class="item-collect-price-txt" v-if="item.min_adult_price">起</view>
						</view>
					</view>
				</view>
				
				<noMore v-if="!all_isMore"></noMore>
			</scroll-view>
			
			<view class="no-data-box" v-if="all_dataList.length == 0">
				<view class="noDataImg"><img src="/static/noData.png" alt=""></view>
				<view class="noDataText">还没有收藏~</view>
			</view>
		</view>
		
		<!-- 收藏的线路 -->
		<view class="collect-list"  v-if="selectType == 1">
			<scroll-view v-if="line_dataList.length != 0" class="collect-list-scroll" :scroll-y="true" @scrolltolower="toLoadMore">
				<view class="item-collect-box" v-for="(item, idx) in line_dataList" :key="idx" @tap="toJumpDetail(idx)">
					<view class="item-collect-img">
						<image :src="item.infoObj.thumb" mode=""></image>
						<view class="item-collect-type-icon">线路</view>
					</view>
					<view class="item-collect-info">
						<view class="item-collect-title">{{item.infoObj.title}}</view>
						<!-- <view class="item-collect-tags">
							<text class="item-collect-tag">美食长沙</text>
							<text class="item-collect-tag">美食长沙</text>
						</view> -->
						<view class="item-collect-price">
							<view class="item-collect-price-cost">￥ <text>{{item.min_adult_price || '暂无定价'}}</text></view>
							<view class="item-collect-price-txt" v-if="item.min_adult_price">起</view>
						</view>
					</view>
				</view>
				
				<noMore v-if="!line_isMore"></noMore>
			</scroll-view>
			
			<view class="no-data-box" v-if="line_dataList.length == 0">
				<view class="noDataImg"><img src="/static/noData.png" alt=""></view>
				<view class="noDataText">还没有线路收藏~</view>
			</view>
		</view>
		
		<!-- 收藏的商品 -->
		<view class="collect-list"  v-if="selectType == 2">
			<scroll-view v-if="pro_dataList.length != 0" class="collect-list-scroll" :scroll-y="true" @scrolltolower="toLoadMore">
				<view class="item-collect-box" v-for="(item, idx) in pro_dataList" :key="idx" @tap="toJumpDetail(idx)">
					<view class="item-collect-img">
						<image :src="item.infoObj.thumb" mode=""></image>
						<view class="item-collect-type-icon">商品</view>
					</view>
					<view class="item-collect-info">
						<view class="item-collect-title">{{item.infoObj.title}}</view>
						<view class="item-collect-price">
							<view class="item-collect-price-cost">￥ <text>{{item.min_adult_price || '暂无定价'}}</text></view>
							<view class="item-collect-price-txt" v-if="item.min_adult_price">起</view>
						</view>
					</view>
				</view>
				
				<noMore v-if="!pro_isMore"></noMore>
			</scroll-view>
			
			<view class="no-data-box" v-if="pro_dataList.length == 0">
				<view class="noDataImg"><img src="/static/noData.png" alt=""></view>
				<view class="noDataText">还没有商品收藏~</view>
			</view>
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
				typeArr: [{
					title: '全部',
					type: ''
				}, {
					title: '线路',
					type: 1
				}, {
					title: '商品',
					type: 2
				}],
				selectType: '', //默认为1
				isLoadErr: false, //加载失败
				
				all_index: 1,
				all_size: 10,
				all_dataList: [],
				all_isMore: true,
				
				line_index: 1,
				line_size: 10,
				line_dataList: [],
				line_isMore: true,
				
				pro_index: 1,
				pro_size: 10,
				pro_dataList: [],
				pro_isMore: true
				
			}
		},
		components: { noMore, loadErr },
		onLoad() {
			this.getAllList() //默认加载
		},
		methods: {
			toJumpDetail(idx) {
				const $this = this
				if(this.selectType == '') {
					if(this.all_dataList[idx].type == 1) {
						uni.navigateTo({
							url:`/pages/lineDetail/lineDetail?id=${$this.all_dataList[idx].third_id}`
						})
					}else if(this.all_dataList[idx].type == 2) {
						uni.navigateTo({
							url:`/pages/outdoorsPro/outProDetail?id=${$this.all_dataList[idx].third_id}`
						})
					}
				}else if(this.selectType == 1) {
					uni.navigateTo({
						url:`/pages/lineDetail/lineDetail?id=${$this.line_dataList[idx].third_id}`
					})
				}else if(this.selectType == 2) {
					uni.navigateTo({
						url:`/pages/outdoorsPro/outProDetail?id=${$this.pro_dataList[idx].third_id}`
					})
				}
			},
			toRelaodData() {
				this.isLoadErr = false
				if(this.selectType == '') {
					this.all_index == 1
					this.all_isMore = true
					this.all_dataList = []
					this.getAllList()
				}else if(this.selectType == 1) {
					this.line_index == 1
					this.line_isMore = true
					this.line_dataList = []
					this.getLineList()
				}else if(this.selectType == 2) {
					this.pro_index == 1
					this.pro_isMore = true
					this.pro_dataList = []
					this.getProList()
				}
			},
			toLoadMore() {
				if(this.selectType == '') {
					if(this.all_isMore) {
						this.getAllList()
					}
				}else if(this.selectType == 1) {
					if(this.line_isMore) {
						this.getLineList()
					}
				}else if(this.selectType == 2) {
					if(this.pro_isMore) {
						this.getProList()
					}
				}
			},
			toCutCollectType(idx) {
				this.typeArr.map((v, i) => {
					if(idx == i) {
						this.selectType = v.type
						if(v.type == '' && this.all_dataList.length == 0 && this.all_isMore) {
							this.getAllList()
						}else
						if(v.type == 1 && this.line_dataList == 0 && this.line_isMore) {
							this.getLineList()
						}else
						if(v.type == 2 && this.pro_dataList == 0 && this.pro_isMore) {
							this.getProList()
						}
					}
				})
			},
			getAllList() { //获取全部列表
				if(this.all_index == 1) {
					uni.showLoading({
						title: '数据加载中',
						mask: true
					})
				}
				this.$api.ajax({
					url: this.$config.collectList,
					data: {
						index: this.all_index,
						size: this.all_size,
						type: this.selectType
					}
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						let arr = res.data.data
						arr.map(v => {
							v.infoObj = JSON.parse(v.third_json)
						})

						if(arr.length < this.all_size) {
							this.all_dataList = this.all_dataList.concat(arr)
							this.all_isMore = false //没有更多了
						}else {
							this.all_dataList = this.all_dataList.concat(arr)
							this.all_index++
						}
						setTimeout(() => {
							uni.hideLoading();
						}, 500)
					}else {
						if(this.all_index == 1) {
							this.isLoadErr = true
						}else {
							this.$api.warnNotice(res.data.message)
						}
						uni.hideLoading();
					}
				})
				.catch((err) => {
					if(this.all_index == 1) {
						this.isLoadErr = true
					}else {
						this.$api.warnNotice('列表加载失败')
					}
					uni.hideLoading();
				})
			},
			getLineList() { //获取线路列表
				if(this.line_index == 1) {
					uni.showLoading({
						title: '数据加载中',
						mask: true
					})
				}
				this.$api.ajax({
					url: this.$config.collectList,
					data: {
						index: this.line_index,
						size: this.line_size,
						type: this.selectType
					}
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						let arr = res.data.data
						arr.map(v => {
							v.infoObj = JSON.parse(v.third_json)
						})
						
						if(arr.length < this.line_size) {
							this.line_dataList = this.line_dataList.concat(arr)
							this.line_isMore = false //没有更多了
						}else {
							this.line_dataList = this.line_dataList.concat(arr)
							this.line_index++
						}
						setTimeout(() => {
							uni.hideLoading();
						}, 500)
					}else {
						if(this.line_index == 1) {
							this.isLoadErr = true
						}else {
							this.$api.warnNotice(res.data.message)
						}
						uni.hideLoading();
					}
				})
				.catch((err) => {
					if(this.line_index == 1) {
						this.isLoadErr = true
					}else {
						this.$api.warnNotice('列表加载失败')
					}
					uni.hideLoading();
				})
			},
			getProList() { //获取线路列表
				if(this.pro_index == 1) {
					uni.showLoading({
						title: '数据加载中',
						mask: true
					})
				}
				this.$api.ajax({
					url: this.$config.collectList,
					data: {
						index: this.pro_index,
						size: this.pro_size,
						type: this.selectType
					}
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						let arr = res.data.data
						arr.map(v => {
							v.infoObj = JSON.parse(v.third_json)
						})
			
						if(arr.length < this.pro_size) {
							this.pro_dataList = this.pro_dataList.concat(arr)
							this.pro_isMore = false //没有更多了
						}else {
							this.pro_dataList = this.pro_dataList.concat(arr)
							this.pro_index++
						}
						setTimeout(() => {
							uni.hideLoading();
						}, 500)
					}else {
						if(this.pro_index == 1) {
							this.isLoadErr = true
						}else {
							this.$api.warnNotice(res.data.message)
						}
						uni.hideLoading();
					}
				})
				.catch((err) => {
					if(this.pro_index == 1) {
						this.isLoadErr = true
					}else {
						this.$api.warnNotice('列表加载失败')
					}
					uni.hideLoading();
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.collectList {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		.collect-type-box {
			background-color: $text-color;
			display: flex;
			align-items: center;
			padding: 0 30upx;
			height: 88upx;
			overflow: hidden;
			border-bottom: 1px solid $border-color;
			.item-collect-type {
				display: flex;
				justify-content: center;
				flex: 1;
				text {
					display: inline-block;
					line-height: 84upx;
					height: 84upx;
					font-size: 28upx;
					color: $text-second-black;
					border-bottom: 4px solid transparent;
				}
			}
			.item-active-type {
				text {
					font-weight: 800;
					border-color: $main-color;
				}
			}
		}
	}
	.collect-list {
		position: relative;
		flex: 1;
		overflow: hidden;
		padding: 30upx 30upx 0;
		.collect-list-scroll {
			width: 100%;
			height: 100%;
			.item-collect-box {
				padding: 30upx 0;
				display: flex;
				align-items: center;
				height: 260upx;
				width: 100%;
				&:not(:last-child) {
					border-bottom: 1px solid $border-color
				}
				.item-collect-img {
					width: 200upx;
					height: 100%;
					border-radius: 20upx;
					background-color: $img-bg;
					position: relative;
					overflow: hidden;
					margin-right: 20upx;
					.item-collect-type-icon {
						position: absolute;
						left: 0;
						bottom: 0;
						width: 96upx;
						height: 46upx;
						text-align: center;
						line-height: 46upx;
						background-image: linear-gradient(90deg, #FCEC61 0%, #F2B912 100%);
						border-radius: 0 12upx 0 0;
						font-size: 24upx;
						color: $text-second-black;
					}
				}
				.item-collect-info {
					height: 100%;
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.item-collect-title {
						font-size: 32upx;
						font-weight: 600;
						color: $text-main-black;
						@extend .ellipse2;
					}
					.item-collect-tags {
						display: flex;
						flex-wrap: wrap;
						.item-collect-tag {
							padding: 2upx 10upx;
							background-color: $img-second-bg;
							font-size: 20upx;
							color: $text-second-black;
							margin: 0 10upx 10upx 0;
						}
					}
					.item-collect-price {
						display: flex;
						align-items: center;
						.item-collect-price-cost {
							font-size: 24upx;
							color: $text-red;
							text {
								font-size: 32upx;
								font-weight: 600;
							}
						}
						.item-collect-price-txt {
							margin-left: 10upx;
							font-size: 20upx;
							color: $text-second-black;
						}
					}
				}
			}
		}
	}
</style>
