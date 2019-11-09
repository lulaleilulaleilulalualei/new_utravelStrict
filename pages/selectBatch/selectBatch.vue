<template>
	<view class="selectBatch">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">选择班期/人数</block></cu-custom>
		<view class="batch-page-title">选择班期</view>
		<view class="batch-month-list">
			<scroll-view class="batch-month-list-scroll" :scroll-x="true">
				<view v-for="(item, idx) in batchData" :key="idx" :class="['item-month-batch', {'select-batch-month': cur_Month == item.mon }]" @tap="selectBatchMonth(idx)">
					<view v-if="item.mon < 10">0{{item.mon}}月</view>
					<view v-if="item.mon >= 10">{{item.mon}}月</view>
					<text>¥ {{item.min_price}}起</text>
				</view>
			</scroll-view>
		</view>
		<!-- 日期选择区域 -->
		<view class="dateSelectView">
		    <view class="weekBgView">
				<view class="weekView" v-for="(item, idx) in weeks_ch" :key="idx">{{item}}</view>
		    </view>
		    <view class="dateBgView">
				<template v-if="hasEmptyGrid">
					<view :style="[{width: averageW}]"  class="dateEmptyView" v-for="(item, idx) in empytGrids" :key="idx"></view>
				</template>
				<view :style="[{width: averageW}]" class="dateView" v-for="(item, idx) in days" :key="idx" @tap="dateSelectAction(idx)">
					<view :class="['datesView', {'noCanToSelect': !item.isCanSelect}, {'activeSelectDay': item.sign == todaySign}]">
						<text class="currentDay">{{item.day}}</text>
						<text v-if="item.isCanSelect" class="currentPrice">￥{{item.adultPrice}}</text>
					</view>
				</view>
		    </view>
		</view>
		
		<template v-if="sltBatchObj">
			<view class="batch-page-title">选择数量 <text class="cut-batch-num">余位：{{sltBatchObj.stockNum == -1? '不限': sltBatchObj.stockNum}}</text></view>
			<view class="select-batch-num">
				<view class="select-batch-price">成人 ( ¥ {{sltBatchObj.adultPrice}} ）</view>
				<view class="select-travler-num">
					<view class="select-num-mul" @tap="toMinusNum(1)">
						<text class="cuIcon-move lg"></text>
					</view>
					<view class="select-num-txt">{{adultNum}}</view>
					<view class="select-num-add" @tap="toAddNum(1)">
						<text class="cuIcon-add lg"></text>
					</view>
				</view>
			</view>
			<view class="select-batch-num">
				<view class="select-batch-price">儿童 ( ¥ {{sltBatchObj.childPrice}} ）</view>
				<view class="select-travler-num select-child-num">
					<view class="select-num-mul" @tap="toMinusNum(2)">
						<text class="cuIcon-move lg"></text>
					</view>
					<view class="select-num-txt">{{childNum}}</view>
					<view class="select-num-add" @tap="toAddNum(2)">
						<text class="cuIcon-add lg"></text>
					</view>
				</view>
			</view>
		</template>
		
		<view class="batch-bottom-btn">
			<view class="show-all-price">¥ {{totalPrice}}</view>
			<view class="to-write-order" @tap="toJumpWriteOrder">填写订单</view>
		</view>
		<!-- 底部顶高 -->
		<view class="cu-tabbar-height"></view>
		
		<loadErr v-if="isLoadErr" @toRelaodData="toRelaodData"></loadErr>
	</view>
</template>

<script>
	import loadErr from '@/components/loadErr.vue'
	
	export default {
		data() {
			return {
				cur_Month: null,
				// 日期选择框
				hasEmptyGrid: false,
				empytGrids: [],
				cur_year: '',
				cur_month: '',
				weeks_ch: ['日', '一', '二', '三', '四', '五', '六'],
				newData: '',
				days: [],
				todaySign: null,
				averageW: '107upx',
				id: null, //id
				fromDate: null, //获取日期
				
				batchData:[],
				sltBatchObj: null, //选择批次数据
				adultNum: 0,
				childNum: 0,
				totalPrice: 0, //总价
				isLoadErr: false
			}
		},
		onLoad(opt) {
			this.id = opt.id
			if(opt.date) {
				this.fromDate = opt.date
			}
			
			this.getBatchData() //获取批次数据
			
			let sys = uni.getSystemInfoSync()
			this.averageW = sys.windowWidth / 7 + 'px'
			
		},
		methods: {
			toRelaodData() {
				this.isLoadErr = false
				this.getBatchData()
			},
			getBatchData() {
				uni.showLoading({
					title: '数据加载中',
					mask: true
				})
				this.$api.ajax({
					url: this.$config.lineBatch,
					data: {
						rt_id: this.id
					}
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						let arr = res.data.data
						this.batchData = arr
						if(this.batchData.length != 0) {
							this.setNowDate();
						}
					}else {
						this.isLoadErr = true
						this.$api.warnNotice(res.data.message)
					}
				})
				.catch((err) => {
					this.isLoadErr = true
				})
			},
			toMinusNum: function(type) {
				if(type == 1) {//成人
					if (this.adultNum > 0) {
						this.totalPrice = this.$api.pointProblem(this.totalPrice, this.sltBatchObj.adultPrice, 'sub')
						this.adultNum--
					}
				}else { //儿童
					if (this.childNum > 0) {
						this.totalPrice = this.$api.pointProblem(this.totalPrice, this.sltBatchObj.childPrice, 'sub')
						this.childNum--
					}
				}
			},
			toAddNum: function(type) {
				if(type == 1) { //成人
					this.adultNum++
					this.totalPrice = this.$api.pointProblem(this.totalPrice, this.sltBatchObj.adultPrice, 'add')
				}else { //儿童
					this.childNum++
					this.totalPrice = this.$api.pointProblem(this.totalPrice, this.sltBatchObj.childPrice, 'add')
				}
			},
			setNowDate: function () {
				//当前时间
				let date = new Date();
				const newData = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
				this.newData = newData
				
				this.batchData.map(v => {
					v.mon = parseInt(v.ym.split('-')[1])
				})
				if(this.fromDate) {
					// 获取月份
					this.cur_Month = parseInt(this.fromDate.split('-')[1])
					// 月份加载
					this.batchData.map((v, i) => {
						v.batch_list.map((val, idx) => {
							if(val.date == this.fromDate) {
								let y = v.ym.split('-')[0],m = v.ym.split('-')[1]
								this.calculateEmptyGrids(y, m);
								this.calculateDays(y, m, v.batch_list);
							}
						})
					})
					
				}else {
					// 获取默认月份
					this.cur_Month = parseInt(this.batchData[0].ym.split('-')[1])
					
					// 初始月份加载
					let obj = this.batchData[0]
					let y = obj.ym.split('-')[0],m = obj.ym.split('-')[1]
					this.calculateEmptyGrids(y, m);
					this.calculateDays(y, m, obj.batch_list);
				}
				
			},
			calculateEmptyGrids(year, month, bth) { //当月1号星期几计算
				// console.log(year)
				// console.log(month)
				// console.log(bth)
			  const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
			  let empytGrids = [];
			  if (firstDayOfWeek > 0) {
			    for (let i = 0; i < firstDayOfWeek; i++) {
			      empytGrids.push(i);
			    }
				this.hasEmptyGrid = true
				this.empytGrids = empytGrids
			  } else {
				this.hasEmptyGrid = false
				this.empytGrids = []
			  }
			},
			calculateDays(year, month, bth) { //当月日期计算
				bth = bth.filter(v => {
					if(v.date.split('-')[0] == year && v.date.split('-')[1] == month) {
						return this.newData < new Date(v.date.split('-')[0], v.date.split('-')[1] - 1, v.date.split('-')[2]).getTime()
					}
				})

				let days = [], idx_day = 0, isBtach = null
				const $this = this
				const thisMonthDays = this.getThisMonthDays(year, month);
				for (let i = 1; i <= thisMonthDays; i++) { //天数循环
				    let getTimes = new Date(year, month - 1, i).getTime()
					if(this.newData <  getTimes) {
						isBtach = (day) => {
							for(let j=idx_day; j<bth.length;j++) {
								let d = parseInt(bth[j].date.split('-')[2]) //获取日期天数)
								if(d == day) {
									let obj = {
										day: day,
										month: month,
										year: year,
										sign: `${year}-${month}-${day}`,
										adultPrice: bth[j].adult_price,
										childPrice: bth[j].child_price,
										stockNum: bth[j].stock_num,
										des: `${month}月${i}日`,
										isCanSelect: true,
									}
									days.push(obj);
									if(this.fromDate && parseInt(this.fromDate.split('-')[2]) == d) {
										this.todaySign = obj.sign
										this.sltBatchObj = obj
									}
									idx_day = j + 1
									return true
								}else {
									return false
								}
							}
						}
						if(!isBtach(i)) {
							days.push({
								day: i,
								month: month,
								year: year,
								sign: `${year}-${month}-${i}`,
								des: `${month}月${i}日`,
								isCanSelect: false
							});
						}
					}else {
						days.push({
							day: i,
							month: month,
							year: year,
							sign: `${year}-${month}-${i}`,
							des: `${month}月${i}日`,
							isCanSelect: false
						});
					}
				}
				this.days = days
				uni.hideLoading();
			},
			dateSelectAction(idx) { //选择某天
				if(this.days[idx].isCanSelect) {
					this.todaySign = this.days[idx].sign
					this.sltBatchObj = this.days[idx]
					this.adultNum = 0
					this.childNum = 0
					this.totalPrice = 0
				}
			},
			selectBatchMonth(idx) { //选择月份
				let obj = this.batchData[idx]
				let y = obj.ym.split('-')[0],m = obj.ym.split('-')[1]
				this.cur_Month = parseInt(obj.ym.split('-')[1])
				this.calculateEmptyGrids(y, m);
				this.calculateDays(y, m, obj.batch_list);
			},
			getThisMonthDays(year, month) {
			  return new Date(year, month, 0).getDate();
			},
			getFirstDayOfWeek(year, month) {
			  return new Date(Date.UTC(year, month - 1, 1)).getDay();
			},
			toJumpWriteOrder() {
				if(this.sltBatchObj) {
					if(this.adultNum >= 1) {
						if(this.adultNum <= this.sltBatchObj.stockNum) {
							uni.navigateTo({
								url: '/pages/writeOrder/writeOrder'
							})
						}else {
							this.$api.warnNotice('您所选人数已超过余位')
						}
					}else {
						this.$api.warnNotice('请选择至少一名成人')
					}
				}else {
					this.$api.warnNotice('请选择班期')
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	
	.batch-page-title {
		font-size: 28upx;
		color: $text-second-black;
		font-weight: 600;
		padding: 30upx 30upx 40upx;
		.cut-batch-num {
			font-size: 24upx;
			color: $text-red;
			display: inline-block;
			margin-left: 20upx;
		}
	}
	.batch-month-list {
		height: 100upx;
		width: 100%;
		.batch-month-list-scroll {
			width: 100%;
			height: 100%;
			white-space: nowrap;
			.item-month-batch {
				height: 100%;
				width: auto;
				display: inline-block;
				padding: 0 20upx;
				color: $text-second-black;
				view { font-size: 32upx; text-align: center;}
				text { font-size: 24upx; }
				border-bottom: 4upx solid transparent;
				transition: all 0.2s;
				margin-right: 30upx;
				&:first-child {
					margin-left: 30upx;
				}
			}
			.select-batch-month {
				font-weight: 700;
				border-color: $main-color;
			}
		}
	}
	
	.dateSelectView {
		background-color: #fff;
		width: 100%;
		height: auto;
		margin-bottom: 30upx;
		.weekBgView {
			width: auto;
			height: 86rpx;
			padding: 0 40rpx;
			background-color: #F5F7FA;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-weight: 600;
			.weekView {
				font-size: 24upx;
				color: $text-second-black;
				&:first-child {
					color: $main-color;
				}
				&:last-child {
					color: $main-color;
				}
			}
		}
		.dateBgView {
			width: auto;
			display: flex;
			flex-wrap: wrap;
			border-bottom: 1rpx solid  #F9F9F9;
			.dateEmptyView {
				width: 107upx;
				height: 114upx;
				border-bottom: 1px solid #E7E7E7; 
			}
			.datesView {
				width: 107upx;
				height: 114upx;
				border-bottom: 1px solid #E7E7E7;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				color: $text-second-black;
				position: relative;
				.currentDay {
					font-size: 28upx;
					font-weight: 600;
				}
				.currentPrice {
					font-size: 24upx;
				}
			}
			.activeSelectDay {
				background: #FFF4C7;
				border: 1px solid #FCD202;
				border-radius: 0 20upx 20upx 20upx;
				.currentPrice {
					color: $text-red;
				}
			}
			.noCanToSelect {
				// background-color: #f2f2f2;
				color: #eee;
			}
		}
	}
	
	.select-batch-num {
		display: flex;
		padding: 0 30upx;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 40upx;
		.select-batch-price {
			font-size: 28upx;
			color: $text-second-black;
		}
		.select-travler-num {
			display: flex;
			align-items: center;
			.select-num-mul {
				width: 76upx;
				height: 56upx;
				border: 1px solid #D8DCE6;
				border-radius: 8upx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28upx;
				color: $text-second-black;
			}
			.select-num-txt {
				width: 100upx;
				height: 56upx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28upx;
				color: $text-second-black;
			}
			.select-num-add {
				width: 76upx;
				height: 56upx;
				background: #F5F7FA;
				border: 1px solid #D8DCE6;
				border-radius: 8upx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28upx;
				color: $text-second-black;
			}
		}
		.select-child-num {
			.select-num-mul {
				border-color: #FFF4C7;
			}
			.select-num-add {
				border-color: transparent;
				background: #FFF4C7;
			}
		}
	}
	
	.batch-bottom-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 10;
		width: 100%;
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 6upx 30upx;
		border-top: 1px solid #F4F4F4;
		background-color: $text-color;
		.show-all-price {
			font-size: 40upx;
			color: $text-red;
			font-weight: 700;
		}
		.to-write-order {
			width: 192upx;
			height: 84upx;
			border-radius: 42upx;
			background-color: $main-color;
			text-align: center;
			line-height: 84upx;
			font-size: 28upx;
			color: $text-main-black;
			
		}
	}
</style>