<template>
	<view class="lineList">
		<skeleton v-if="isShowSkeleton"></skeleton>
		
		<cu-custom bgColor="white" :isBack="true"><block slot="content">全部线路</block></cu-custom>
		<view class="top-search-box">
			<view class="top-search-input item-filter-recom">
				<view class="top-search-icon"><image src="/static/search-icon.png" mode=""></image></view>
				<view class="to-search-inp-box"><input type="text" :value="keyword" confirm-type="go" @confirm="toSearchKeyword" placeholder="搜索目的地/线路名" /></view>
			</view>
		</view>
		<!-- <view class="select-type-box">
			<scroll-view class="select-type-scroll" :scroll-x="true">
				<view :class="['item-select-type', {'item-type-active': item.isSelect}]" 
					v-for="(item, idx) in selectType" 
					:key="idx"
					@click="toCutType(idx)">{{item.name}}</view>
			</scroll-view>
		</view> -->
		<view class="filter-box-out">
			<view class="filter-box">
				<view class="item-filter">
					<view :class="['item-filter-txt', {'to-active-filter': curFilter == 1}]" @click="selectFilter(1)">
						<text v-if="lineType.length != 0">{{filteValChange(lineTypeVal, lineType, 1)}}</text>
						<text v-else>选择分类</text>
					</view>
				</view>
				<view class="item-filter">
					<view :class="['item-filter-txt', {'to-active-filter': curFilter == 2}]" @click="selectFilter(2)">
						<text>{{filteValChange(recomFilterVal, recomFilter, 2)}}</text>
					</view>
				</view>
				<view class="item-filter">
					<view :class="['item-filter-txt', {'to-active-filter': curFilter == 3}]" @click="selectFilter(3)">
						<text class="item-filter-txt-box" v-if="selectAreaName">{{selectAreaName}}</text>
						<text v-else>选择地区</text>
					</view>
				</view>
				<view class="item-filter">
					<view :class="['item-filter-txt', {'to-active-filter': curFilter == 4}]" @click="selectFilter(4)">
						<text>{{filteValChange(selectDayVal, selectDay, 4)}}</text>
					</view>
				</view>
			</view>
			<!-- 筛选内容框 -->
			<view class="select-filter-box" :style="{height: curFilter != ''? filterH: 0}">
				<scroll-view class="filter-scroll-box" :scroll-y="true">
					<view class="select-filter-box-recom" v-if="curFilter != 3">
						<template v-if="curFilter == 1">
							<view class="item-filter-recom" v-for="(item, idx) in lineType" :key="item.cate_id" @tap="selectFilterType(idx)">
								<text :class="['item-filter-recom-txt', {'item-active-filter': item.cate_id == lineTypeVal}]">{{item.cate_name}}</text>
								<text v-if="item.cate_id == lineTypeVal" class="lg cuIcon-check item-active-filter"></text>
							</view>
						</template>
						<template v-if="curFilter == 2">
							<view class="item-filter-recom" v-for="(item, idx) in recomFilter" :key="idx"  @tap="selectFilterCom(idx)">
								<text :class="['item-filter-recom-txt', {'item-active-filter': item.value == recomFilterVal}]">{{item.name}}</text>
								<text v-if="item.value == recomFilterVal" class="lg cuIcon-check item-active-filter"></text>
							</view>
						</template>
						<template v-if="curFilter == 4">
							<view class="item-filter-recom" v-for="(item, idx) in selectDay" :key="idx"  @tap="selectFilterDay(idx)">
								<text :class="['item-filter-recom-txt', {'item-active-filter': item.value == selectDayVal}]">{{item.name}}</text>
								<text v-if="item.value == selectDayVal" class="lg cuIcon-check item-active-filter"></text>
							</view>
						</template>
					</view>
					<view class="select-area-box" v-if="curFilter == 3">
						<view class="show-select-total-area">
							<scroll-view :scroll-y="true">
								<veiw class="item-total-area" :class="{'item-active-total-area': idx == areaPrtIdx}" v-for="(item, idx) in selectArea" :key="item.area_id" @tap="toSelectPrtArea(idx)">
									<text>{{item.area_name}}</text>
								</veiw>
							</scroll-view>
						</view>
						<veiw class="show-select-item-area">
							<scroll-view :scroll-y="true">
								<view class="item-small-area" v-for="(item, idx) in selectArea[areaPrtIdx].child_list" :key="item.area_id" @tap="toSelectClrArea(idx)">
									<text :class="{'item-active-filter': item.area_id == selectClrArea.area_id}">{{item.area_name}}</text>
									<text v-if="item.area_id == selectClrArea.area_id" class="lg cuIcon-check item-active-filter"></text>
								</view>
							</scroll-view>
						</veiw>
					</view>
				</scroll-view>
			</view>
			
		</view>
		
		<view class="list-scroll">
			<view :class="curFilter != '' && 'show-modal-active'" @click="toCloseFilterbox" class="list-modal-box"></view>
			<scroll-view v-if="lineList.length != 0" class="list-scroll-box" :scroll-y="curFilter == '' && !isShowSkeleton" @scrolltolower="toLoadMore">
				<view class="item-line" v-for="(item, idx) in lineList" :key="item.rt_id" @click="toJumpLineDetail(idx)">
					<view class="item-line-img skeleton-rect">
						<image :src="item.thumb" mode=""></image>
						<text :decode="true" class="item-line-type">
							<text v-if="item.start_city_arr">{{item.start_city}}出发</text>
							<text class="item-type-border-line" v-if="item.start_city_arr && item.cate_name">|</text>
							<text v-if="item.cate_name">{{item.cate_name}}</text>
						</text>
					</view>
					<view class="item-line-info">
						<view class="item-line-title skeleton-rect">{{item.title}}</view>
						<view class="item-line-icon skeleton-rect">
							<view class="item-line-icon-tag" v-for="(v, i) in item.theme_list" :key="i">{{v}}</view>
						</view>

						<view class="item-line-data-num skeleton-rect">
							<view class="item-line-price-box" v-if="item.have_price == 1">
								<view class="item-line-price">￥<text>{{item.min_price}}</text></view>
								<text class='item-line-startTxt'>起</text>
							</view>
							<view class="item-line-price-box" v-if="item.have_price == 0">
								<view class="item-line-price"><text>暂无定价</text></view>
							</view>
							<view class="item-line-sell-num">已售{{item.sell_num || 0}}</view>
						</view>
						
					</view>
				</view>
				<noMore v-if="!isMore"></noMore>
				<!-- 底部顶高 -->
				<!-- <view class="cu-tabbar-height"></view> -->
			</scroll-view>
			
			<view class="no-data-box" v-if="lineList.length == 0 && !isShowSkeleton">
				<view class="noDataImg"><img src="/static/noData.png" alt=""></view>
				<view class="noDataText">还没有线路~</view>
			</view>
		</view>
		
		<loadErr v-if="isLoadErr" @toRelaodData="toRelaodData"></loadErr>
	</view>
</template>

<script>
	import skeleton from '@/components/quick-skeleton.vue'
	import noMore from '@/components/noMore.vue'
	import loadErr from '@/components/loadErr.vue'
	
	export default {
		data() {
			return {
				isShowSkeleton: true,
				curFilter: '', //当前筛选
				//全部分类
				lineTypeVal: '',
				lineType: [],
				//综合排序
				recomFilterVal: '',
				recomFilter: [{
					name: '综合排序',
					value: '',
				}, {
					name: '销量 高 → 底',
					value: 1
				}, {
					name: '评分 高 → 底',
					value: 2
				}, {
					name: '价格 高 → 底',
					value: 3,
				}, {
					name: '价格 底 → 高',
					value: 4
				}],
				selectDayVal: '',
				selectDay: [{
					name: '全部天数',
					value: '',
				}, {
					name: '两天',
					value: 2
				}, {
					name: '三天',
					value: 3
				}, {
					name: '四天',
					value: 4
				}, {
					name: '五天',
					value: 5
				}, {
					name: '六天',
					value: 6
				}, {
					name: '七天及七天以上',
					value: 7
				}],
				
				selectArea: [],
				areaPrtIdx: null, //父级下标
				selectClrArea: null, //子级选择对象
				selectAreaName: null, //选择区域名称
				selectAreaId: '', //选择区域
				area_type: '', //地区 0是子级地区， 1是父级地区
				
				keyword: '',
				isLoadErr: false, //页面加载出错
				isMore: true,
				lineList: [{},{},{},{},{},{}], //线路数组
				index: 1,
				size: 10,
			}
		},
		components: { noMore, skeleton, loadErr },
		computed: {
			filterH() { //筛选列高度
				let sys = uni.getSystemInfoSync();
				let h = 0
				if(this.curFilter == 1) {
					h = this.lineType.length * 100
					if(h > 540) h = 540
				}else if(this.curFilter == 2) {
					h = this.recomFilter.length * 100
					if(h > 540) h = 540
				}else if(this.curFilter == 3) {
					h = 540
				}else if(this.curFilter == 4) {
					h = this.selectDay.length * 100
					if(h > 540) h = 540
				}
				return (sys.windowWidth / 750) * h + 'px'
			}
		},
		onLoad(opt) {
			if(opt.areaid !== undefined && opt.areaid !== null) {
				this.selectAreaId = opt.areaid
			}else {
				if(opt.keyword) {
					this.keyword = opt.keyword
				}
			}
			
			setTimeout(() => {
				this.getDataList() //列表数据加载
				this.toGetLineCdi() //条件加载
			}, 100)
		},
		methods: {
			toSelectPrtArea(idx) { //选择大区域
				this.paramsBlank()
				if(this.areaPrtIdx != idx) {
					this.areaPrtIdx = idx
					this.selectClrArea = null
					// this.selectAreaName = this.selectArea[idx].area_name
					// this.selectAreaId = this.selectArea[idx].area_id
					// this.area_type = 1
				}else {
					this.areaPrtIdx = null
					this.selectAreaName = null
					this.selectAreaId = ''
					this.area_type = ''
					this.getDataList()
				}
			},
			toSelectClrArea(idx) { //选择子区域
				this.paramsBlank()
				let obj = this.selectArea[this.areaPrtIdx].child_list[idx]
				if(this.selectClrArea) {
					if(obj.area_id == this.selectClrArea.area_id) {
						this.selectClrArea = null
						this.selectAreaName = this.selectArea[this.areaPrtIdx].area_name
						this.selectAreaId = this.selectArea[this.areaPrtIdx].area_id
						this.area_type = 1
					}else {
						this.selectClrArea = obj
						this.selectAreaName = obj.area_name
						this.selectAreaId = obj.area_id
						this.curFilter = ''
						this.area_type = 0
					}
				}else {
					this.selectClrArea = obj
					this.selectAreaName = obj.area_name
					this.selectAreaId = obj.area_id
					this.curFilter = ''
					this.area_type = 0
				}
				this.getDataList()
			},
			selectFilterType(idx) { //选择分类
				this.paramsBlank()
				this.lineTypeVal = this.lineType[idx].cate_id
				this.curFilter = ''
				this.getDataList()
			},
			selectFilterCom(idx) { //选择综合排序
				this.paramsBlank()
				this.recomFilterVal = this.recomFilter[idx].value
				this.curFilter = ''
				this.getDataList()
			},
			selectFilterDay(idx) { //选择天数
				this.paramsBlank()
				this.selectDayVal = this.selectDay[idx].value
				this.curFilter = ''
				this.getDataList()
			},
			filteValChange(val, obj, type) { //过滤
				let name = ''
				if(type == 1) {
					obj.map(v => {
						if(v.cate_id == val) {
							name = v.cate_name
						}
					})
				}else {
					obj.map(v => {
						if(v.value == val) {
							name = v.name
						}
					})
				}
				return name
			},
			toCutType(idx) { //已废除
				this.selectType.map((v, i) => {
					if(idx == i) {
						v.isSelect = true
					}else {
						v.isSelect = false
					}
				})
			},
			selectFilter(type) { //切换筛选类
				if(this.curFilter == type) {
					this.curFilter = ''
				}else {
					this.curFilter = type
				}
			},
			toCloseFilterbox() {
				this.curFilter = ''
			},
			toJumpLineDetail(idx) {
				const $this = this
				uni.navigateTo({
					url:`/pages/lineDetail/lineDetail?id=${$this.lineList[idx].rt_id}`
				})
			},
			toGetLineCdi() { //获取线路筛选条件
				this.$api.ajax({
					url: this.$config.lineCondition
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						let obj = res.data.data
						this.lineType = obj.cate_list
						this.lineType.unshift({
							cate_id: '',
							cate_name: '全部分类'
						})
						this.selectArea = obj.area_list

						if(this.selectAreaId !== undefined && this.selectAreaId !== null) {
							this.selectArea.map((v, i) => {
								if(v.area_id === this.selectAreaId) {
									this.areaPrtIdx = i
									this.selectAreaName = v.area_name
								}
							})
						}
					}else {
						this.$api.warnNotice(res.data.message)
					}
				})
				.catch((err) => {
					this.$api.warnNotice('条件加载失败')
				})
			},
			toSearchKeyword(e){
				this.paramsBlank()
				this.keyword = e.detail.value
				this.getDataList()
			},
			paramsBlank() {
				this.keyword = ''
				this.lineTypeVal = ''
				this.selectAreaId = ''
				this.recomFilterVal = ''
				this.selectDayVal = ''
				this.area_type = ''
				this.index = 1
			},
			getDataList() {
				this.$api.ajax({
					url: this.$config.lineList,
					data: {
						index: this.index,
						size: this.size,
						keyword: this.keyword,
						cate_id: this.lineTypeVal,
						area_id: this.selectAreaId,
						area_type: this.area_type, //分类地区
						sort: this.recomFilterVal,
						day: this.selectDayVal
					}
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						if(this.index == 1) {
							this.lineList = []
						}
						
						let arr = res.data.data
						if(arr.length < this.size) {
							this.lineList = this.lineList.concat(arr)
							this.isMore = false //没有更多了
						}else {
							this.lineList = this.lineList.concat(arr)
							this.index++
						}
						setTimeout(() => {
							this.isShowSkeleton = false
						}, 200)
					}else {
						if(this.index == 1) {
							this.isLoadErr = true
						}else {
							this.$api.warnNotice(res.data.message)
						}
						this.isShowSkeleton = false
					}
				})
				.catch((err) => {
					if(this.index == 1) {
						this.isLoadErr = true
					}else {
						this.$api.warnNotice('线路列表加载失败')
					}
					this.isShowSkeleton = false
				})
			},
			toLoadMore() {
				if(this.isMore) {
					this.getDataList()
				}
			},
			toRelaodData() { //刷新加载
				this.paramsBlank()
				this.isShowSkeleton = false
				this.isLoadErr = false
				this.isMore = true
				this.getDataList()
			}
		}
	}
</script>

<style scoped lang="scss">
	.lineList {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
	.top-search-box {
		padding: 30upx;
		.top-search-input {
			background: #F6F9FA;
			width: 100%;
			height: 64upx;
			border-radius: 32upx;
			display: flex;
			align-items: center;
			padding: 0 30upx;
			.top-search-icon {
				width: 30upx;
				height: 30upx;
				margin-right: 20upx;
			}
			.to-search-inp-box {
				flex: 1;
				overflow: hidden;
				height: 100%;
				input {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.select-type-box {
		width: 100%;
		height: 60upx;
		.select-type-scroll {
			width: 100%;
			height: 100%;
			white-space: nowrap;
			.item-select-type {
				font-size: 28upx;
				color: $text-second-black;
				display: inline-block;
				margin: 0 30upx;
				height: 100%;
				border-bottom: 6upx solid transparent;
			}
			.item-type-active {
				border-bottom-color: $main-color;
				font-weight: 800;
			}
		}
	}
	.filter-box-out {
		position: relative;
		width: 100%;
		height: auto;
		// z-index: 99;
		.select-filter-box {
			position: absolute;
			top: 82upx;
			left: 0;
			z-index: 10;
			width: 100%;
			background-color: $text-color;
			transition: all 0.3s;
			.filter-scroll-box {
				width: 100%;
				height: 100%;
			}
		}
	}
	.select-filter-box-recom {
		padding: 0 30upx;
		.item-filter-recom {
			padding: 30upx 0;
			font-size: 28upx;
			color: $text-second-black;
			display: flex;
			justify-content: space-between;
			&:not(:last-child) {
				border-bottom: 1px solid #F4F4F4;
			}
			.cuIcon-check {
				font-size: 32upx;
			}
		}
	}
	.item-active-filter {
		color: $main-color;
	}	
	.select-area-box {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		padding: 0 30upx;
		scroll-view {
			width: 100%;
			height: 100%;
		}
		.show-select-total-area {
			display: block;
			width: 300upx;
			height: 100%;
			.item-total-area {
				display: flex;
				align-items: center;
				width: 100%;
				height: 100upx;
				line-height: 100upx;
				font-size: 28upx;
				color: $text-second-black;
				background-color: #F5F7FA;
				&:before {
					content: '';
					display: block;
					width: 6upx;
					height: 30upx;
					border-radius: 0 10upx 10upx 0;
					background-color: transparent;
					margin-right: 20upx
				}
			}
			.item-active-total-area {
				background-color: #FFF;
				&:before {
					background-color: $main-color;
				}
			}
		}
		.show-select-item-area {
			flex: 1;
			overflow: hidden;
			height: 100%;
			padding-left: 30upx;
			.item-small-area {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				height: 100upx;
				line-height: 100upx;
				font-size: 28upx;
				color: $text-second-black;
				padding: 0 20upx;
				&:not(:last-child) {
					border-bottom: 1px solid $border-color;
				}
			}
		}
	}
	.filter-box {
		display: flex;
		padding: 0 30upx 0;
		align-items: center;
		justify-content: space-between;
		box-shadow: 0 10upx 20upx 0 #F9F9F9;
		.item-filter {
			flex: 1;
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			padding: 0 10upx;
			.item-filter-txt {
				font-size: 24upx;
				color: $text-main-black;
				display: flex;
				align-items: center;
				padding: 20upx 0 30upx;
				text {
					display: block;
					flex: 1;
					overflow: hidden;
					@extend .ellipse1;
				}
				.item-filter-txt-box {
					display: flex;
				}
				&::after {
					margin-left: 16upx;
					content: '';
					display: block;
					border: 6upx solid $text-main-black;
					transform: rotate(45deg);
					border-left-color: transparent;
					border-top-color: transparent;
					position: relative;
					top: -3upx;
				}
			}
			.to-active-filter {
				color: $main-color;
				&::after {
					transform: rotate(225deg);
					top: 5upx;
					border-right-color: $main-color;
					border-bottom-color: $main-color;
				}
			}
		}
	}
	.list-scroll {
		flex: 1;
		overflow: hidden;
		position: relative;
		z-index: 1;
		.list-modal-box {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,0.4);
			transition: all 1s;
			z-index: -1;
			opacity: 0;
		}
		.show-modal-active {
			z-index: 10;
			opacity: 1;
		}
		.list-scroll-box {
			padding: 0 30upx;
			width: 100%;
			height: 100%;
			.item-line {
				display: flex;
				width: 100%;
				padding: 30upx 0;
				border-bottom: 1px solid $border-color;
				.item-line-img {
					width: 200upx;
					height: 200upx;
					background-color: $img-bg;
					border-radius: 12upx;
					overflow: hidden;
					position: relative;
					margin-right: 20upx;
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
					flex: 1;
					overflow: hidden;
					height: 200upx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.item-line-title {
						font-size: 32upx;
						color: $text-main-black;
						font-weight: 600;
						margin-bottom: 20upx;
						min-height: 42upx;
						@extend .ellipse2;
					}
					.item-line-icon {
						display: flex;
						flex-wrap: wrap;
						margin-bottom: 12upx;
						min-height: 32upx;
						.item-line-icon-member {
							padding: 2upx 12upx;
							border: 1px solid #979797;
							border-radius: 4upx;
							margin-right: 10upx;
							font-size: 20upx;
							color: $text-main-black;
						}
						.item-line-icon-tag {
							background: #F6F9FA;
							border-radius: 4upx;
							padding: 2upx 12upx;
							font-size: 20upx;
							color: #7A8188;
							margin-right: 10upx;
						}
					}
					.item-line-data-num {
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						min-height: 52upx;
						.item-line-price-box {
							display: flex;
							align-items: flex-end;
							margin-bottom: 10upx;
							.item-line-price {
								font-size: 24upx;
								color: $text-red;
								margin-right: 10upx;
								text {
									font-size: 32upx;
									color: $text-red;
									font-weight: 600;
								}
							}
							.item-line-startTxt {
								font-size: 24upx;
								color: #7A8188;
								position: relative;
								top: -2upx;
							}
						}
						.item-line-sell-num {
							font-size: 24upx;
							color: $text-grey;
						}
					}
				}
			}
		}
	}
</style>
