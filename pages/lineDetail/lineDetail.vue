<template>
	<view class="lineDetail">
		<!-- <skeleton v-if="isShowSkeleton"></skeleton> -->
		<cu-custom :bgColor="navColor" :isBack="true" :textOpacity="textOpacity"><block slot="content">线路详情</block></cu-custom>
		
		<view class="detailBox">
			<scroll-view class="detailBoxScroll" 
						:scroll-y="true" 
						@scroll="toScroll"
						:scroll-top="toViewScroll"
						:scroll-with-animation="true">
				<view class="detail-banner">
					<swiper class="screen-swiper" :indicator-dots="false" circular="true" @change="bindChangeSwiper" interval="5000" duration="500">
					  <swiper-item class="item-swiper-box" v-for="(item, idx) in swiperList" :key="idx">
						<view v-if="item.type == 'img'" class="item-swiper-img" @click="toPriviewBanner(idx)"><image :src="item.url" mode="aspectFill"></image></view> 
					  </swiper-item>
					</swiper>
					<view class="self-dots-box">
						<view v-for="(item, idx) in swiperList" :key="idx" :class="['item-self-dots', {'item-active-dots': currentSwiper == idx}]"></view>
					</view>
					
					<view v-if="lineObj.video_url" class="toShowVideo" @click="toPlayVideo"><text class="cuIcon-video lg"></text></view>
				</view>
				<video v-if="isPlayVideo" id="videoBox" :src="lineObj.video_url" :autoplay="true" @fullscreenchange="toQuitFullscreen"></video>
				<!-- 产品信息 -->
				<view class="detail-info-box-1">
					<view class="detail-info-title">{{lineObj.sub_title || '--'}}</view>
					<view class="detial-info-tags" v-if="lineObj.theme_list.length != 0">
						<text class="item-info-tag" v-for="(item, idx) in lineObj.theme_list" :key="idx">{{item}}</text>
					</view>
					<view class="detail-info-price">
						<view class="detail-info-price-num" v-if="lineObj.min_adult_price">￥ <text>{{lineObj.min_adult_price}}</text>起</view>
						<view class="detail-info-price-num" v-if="!lineObj.min_adult_price"><text>{{lineObj? '暂无定价': '￥ --'}}</text></view>
						<view class="detail-info-price-sell">已售 <text>{{lineObj.sell_num || 0}}份</text></view>
					</view>
					<view class="to-open-member-card" @tap="toJumpMemberCard">
						<view class="member-card-icon"><image src="/static/member_icon.png" mode="aspectFill"></image></view>
						<view class="member-card-text">超级会员尊享全品类旅游线路会员价</view>
						<view class="to-open-member-txt">立即开通</view>
						<view class="to-open-member-icon">
							<image src="/static/to_open_icon.png" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<!-- 选择班期 -->
				<view class="detail-info-box-2">
					<view class="detail-info-box-title" @tap="toSelectBatch"> <text>选择班期</text> </view>
					<view class="show-batch-list" v-if="lineObj.batch_list.length != 0">
						<scroll-view class="show-batch-list-scroll" :scroll-x="true">
							<view class="show-item-batch-out" v-for="(item, idx) in lineObj.batch_list" :key="idx" @tap="toSelectBatch(idx)">
								<view class="show-item-batch">
									<view class="show-item-batch-date">{{item.date}} {{item.week_name}}</view>
									<view class="show-item-batch-price">¥ {{item.adult_price}}起</view>
								</view>
							</view>
						</scroll-view>
						<view class="to-more-batch" v-if="lineObj.batch_list.length > 3" @tap="toSelectBatch">更多班期</view>
					</view>
				</view>
				<!-- 评分 -->
				<view class="detail-info-box-3">
					<view class="detail-info-score-top">
						<view class="detail-info-score-sum">评分 {{lineObj.comment_star || 0}}/5</view>
						<view class="to-all-comment" @tap="toJumpCommentList"><text>查看全部({{lineObj.comment_num || 0}})</text></view>
					</view>
					<view class="detail-comment-type" v-if="lineObj.comment_tag_list.length != 0">
						<scroll-view class="detail-comment-type-scroll" :scroll-x="true">
							<view class="item-comment-type-box">
								<view class="item-comment-type" v-for="(item, idx) in lineObj.comment_tag_list" :key="idx">{{item.tag_name}} {{item.count}}</view>
							</view>
						</scroll-view>
						<view class="more-type-black"></view>
					</view>
					<view class="detail-new-comment" v-if="lineObj.top_comment">
						<view class="detail-new-comment-top">
							<view class="detail-comment-user-head"><image :src="lineObj.top_comment.avatar" mode="aspectFill"></image></view>
							<view class="detail-comment-user-info">
								<view class="detail-comment-user-name">
									<text class="detail-comment-user-name-txt">{{lineObj.top_comment.nick_name}}</text>
									<text class="detail-comment-time">{{lineObj.top_comment.sub_time}}</text>
								</view>
								<view class="detail-comment-user-start">
									<text :class="[{'cuIcon-favorfill': lineObj.top_comment.star >= idx+1}, {'cuIcon-favor': lineObj.top_comment.star < idx+1}, 'lg', {'active-comment-start': lineObj.top_comment.star >= idx+1}]" v-for="(val, idx) in 5" :key="idx"></text>
								</view>
							</view>
						</view>
						<view class="show-commemt-txt">{{lineObj.top_comment.content}}</view>
						<view class="show-comment-imgs" v-if="lineObj.top_comment.picture_arr">
							<scroll-view class="show-comment-imgs-scroll" :scroll-x="true">
								<view class="item-show-comment-img" v-for="(item, idx) in lineObj.top_comment.imgs" :key="idx" @tap="toPreviewImg(idx)">
									<image :src="item" mode="aspectFill"></image>
								</view>
							</scroll-view>
						</view>
					</view>
					
				</view>
				<!-- 线路内容 -->
				<view class="lineContent">
					<view id="contentNavBox">
						<view class="contentNav" :style="[{position: navPostion, top: isFloat? customBar: 0}]">
							<view :class="['itemContent', {'itemActiveContent': item.isActive}]" 
								v-for="(item, idx) in titleArr"
								:key="idx"
								@tap="toCutTitle(idx)">{{item.name}}</view>
						</view>
					</view>
					
					
					<!-- 图文介绍 -->
					<view id="lineIntro">
						<rich-text v-if="carRich" class="richTextShow" type="text" :nodes="lineLight"></rich-text>
						<text style="text-align: center; margin-top: 30px" decode="true" wx:else>由于您的微信版本过低 \n 无法正常阅读当前内容</text>
					</view>
					<!-- 线路行程 -->
					<view id="journeyLine">
						<view class="item-content-title">线路行程</view>
						<view class="to-show-line-box">
							<view class="item-line-day" v-for="(item, index) in lineArr" :key="index">
								<view class="item-line-head-box">
									<view class="item-line-day-title-day">D{{index+1}}</view>
									<view class="item-line-day-box">
										<view class="item-line-day-title">{{item.title}}</view>
										<text :decode="true" class="item-line-day-desc">{{item.desc}}</text>
									</view>
								</view>
								<view class="item-line-day-spot" v-for="(val, idx) in item.childList" :key="idx">
									<view v-if="val.type == 1" class="item-line-day-spot-icon"><image src="/static/food_icon.png" mode="aspectFill"></image></view>
									<view v-if="val.type == 2" class="item-line-day-spot-icon"><image src="/static/hotel_icon.png" mode="aspectFill"></image></view>
									<view v-if="val.type == 3" class="item-line-day-spot-icon"><image src="/static/spot_icon.png" mode="aspectFill"></image></view>
									<view class="item-line-day-spot-box">
										<view class="item-line-day-spot-title">{{val.name}}</view>
										<template v-if="val.imgList.length != 0">
											<view class="item-line-day-spot-img" v-for="(v, i) in val.imgList" :key="i" @tap="toPreviewRouteImg(v.url || v)">
												<image v-if="v" :src="v.url || v" mode="aspectFill"></image>
											</view>
										</template>
										<view class="item-line-day-spot-desc">{{val.desc}}</view>
									</view>
								</view>
							</view>
						</view>
						
					</view>
					<!-- 费用说明 -->
					<view id="useExplain">
						<view class="item-content-title">费用说明</view>
						<view class="useExplain-text">
							<!-- <view class="useExplain-text-title">费用包含：</view> -->
							<!-- <text decode="true" class="useExplain-text-box">
								
							</text> -->
							<view style="width: 100%;height: auto; overflow: hidden;">
								<rich-text v-if="carRich" class="richTextShow" type="text" :nodes="lineObj.cost_text"></rich-text>
								<text style="text-align: center; margin-top: 30px" decode="true" wx:else>由于您的微信版本过低 \n 无法正常阅读当前内容</text>
							</view>
						</view>
					</view>
					<!-- 购买须知 -->
					<view id="buyNotice">
						<view class="item-content-title">购买须知</view>
						<!-- <text decode="true" class="buyNotice-text">
							
						</text> -->
						<view style="width: 100%;height: auto; overflow: hidden;">
							<rich-text v-if="carRich" class="richTextShow" type="text" :nodes="lineObj.reserve_text"></rich-text>
							<text style="text-align: center; margin-top: 30px" decode="true" wx:else>由于您的微信版本过低 \n 无法正常阅读当前内容</text>
						</view>
						
					</view>
				</view>
				<!-- 底部操作 -->
				<view class="detail-bottom-opt">
					<view class="detail-bottom-opt-left">
						<view class="detail-bottom-opt-box">
							<view class="detail-bottom-opt-icon"><image src="/static/consult_icon.png" mode="aspectFill"></image></view>
							<view class="detail-bottom-opt-icon-txt">咨询</view>
							<button class="serviceBtn" open-type="contact"></button>
						</view>
						<view :class="['detail-bottom-opt-box', {'to-active-collect-line': lineObj.is_collected == 1}]" @tap="toCollectLine">
							<view v-if="lineObj.is_collected == 0" class="detail-bottom-opt-icon"><image src="/static/collect_icon.png" mode="aspectFill"></image></view>
							<view v-if="lineObj.is_collected == 1" class="detail-bottom-opt-icon"><image src="/static/collect_select_icon.png" mode="aspectFill"></image></view>
							<view class="detail-bottom-opt-icon-txt">{{lineObj.is_collected == 0? '收藏': '已收藏'}}</view>
						</view>
					</view>
					<view class="detail-bottom-opt-right">
						<view class="detail-bottom-opt-right-box"  @tap="toJumpSelectBatch">
							<view class="detail-bottom-opt-buy">直接购买</view>
							<view class="detail-bottom-opt-member-buy">
								<view>会员购买</view>
								<text>立减¥300元券</text>
							</view>
						</view>
					</view>
					<button v-if="!isAuth" class="toAuthBtn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">授权</button>
				</view>
				<!-- 底部顶高 -->
				<view class="cu-tabbar-height"></view>
			</scroll-view>
		</view>
		
		<loadErr v-if="isLoadErr" @toRelaodData="toRelaodData"></loadErr>
	</view>
</template>

<script>
	// import skeleton from '@/components/quick-skeleton.vue'
	import loadErr from '@/components/loadErr.vue'
	import { mapGetters , mapActions } from 'vuex';
	
	export default {
		data() {
			return {
				isShowSkeleton: false, //骨架屏
				navColor: 'white',//导航背景色
				textOpacity: 0, //导航透明度
				isLoadErr: false, //页面加载出错
				
				currentSwiper: 0,
				swiperList: [],
				
				titleArr: [
				  {
				    name: '图片介绍',
				    boxId: 'lineIntro',
				    boxTop: 0,
				    isActive: true
				  },
				  {
				    name: '行程线路',
				    boxId: 'journeyLine',
				    boxTop: 0,
				    isActive: false
				  },
				  {
				    name: '费用说明',
				    boxId: 'useExplain',
				    boxTop: 0,
				    isActive: false
				  },
				  {
				    name: '购买须知',
				    boxId: 'buyNotice',
				    boxTop: 0,
				    isActive: false
				  }
				],
				
				// 线路行程方面
				lineArr: [],
				routeImgs: [], //线路图片
				toViewScroll: 0,
				navCutTop: null,
				navPostion: 'absolute',
				isFloat: false, //导航浮动
				scrollNum: null,
				isActive: false,
				
				id: null ,//线路id
				lineObj: null, //线路数据对象
				lineLight: '', //线路亮点
				carRich: uni.canIUse('rich-text'),
				isPlayVideo: false, //是否播放视频
				
				isAuth: false, //是否授权
			}
		},
		// components: {skeleton, loadErr},
		onLoad(opt) {
			this.id = opt.id
			if(this.$userInfo) {
				this.isAuth = true
			}else {
				this.$api.userLogin((status) => {
					if(status == 1) {
						this.isAuth = true
					}
				})
			}
			this.getDetailData()
		},
		computed: {
			customBar() {
				return this.CustomBar + 'px'
			}
		},
		onShow() {
			if (!this.navCutTop) {
			  this.queryMultipleNodes('#contentNavBox', (top) => {
				this.navCutTop = top - this.CustomBar
			  })
			}
		},
		methods: {
			getUserInfo: function(e) { //按钮登录授权
			  if (e.detail.errMsg == 'getUserInfo:ok') {
			    uni.showLoading({
			      title: '授权登陆中...',
			      mask: true
			    })
			    const $this = this
			    this.$api.userLogin((status) => {
			      if (status == '1') {
			          uni.hideLoading()
			          uni.showToast({
			            title: '授权登录成功',
			            icon: 'success',
			            mask: true,
			            success: () => {
							$this.isAuth = true
							$this.getDetailData()
			            }
			          })
			      }
			    })
			  }else {
			    this.$api.warnNotice('您已拒绝授权！')
			    this.isAuth = false
			  }
			},
			toPreviewImg(idx) {
				const $this = this
				uni.previewImage({
					current: $this.lineObj.top_comment.imgs[idx],
					urls: $this.lineObj.top_comment.imgs
				})
			},
			toPreviewRouteImg(url) { //预览线路图片
				let arr = []
				this.routeImgs.map(v => {
					arr.push(v.url)
				})
				uni.previewImage({
					current: url,
					urls: arr
				})
			},
			toJumpMemberCard() {
				uni.navigateTo({
					url: '/pageMember/utravelMember/utravelMember'
				})
			},
			toJumpCommentList() {
				const $this = this
				uni.navigateTo({
					url: `/pages/commentList/commentList?id=${$this.id}&type=line`
				})
			},
			toScroll(e) {
				let top = e.detail.scrollTop
				this.textOpacity = top / 400 > 1 ? 1 : top / 400
				this.navFloatScroll(top)
			},
			toPriviewBanner(idx) {
				const $this = this
				let arr = []
				this.swiperList.map(v => {
					if(v.type == 'img') {
						arr.push(v.url)
					}
				})
				uni.previewImage({
					current: $this.swiperList[idx].url,
					urls: arr
				})
			},
			toSelectBatch(idx) {
				const $this = this
				if(this.lineObj.batch_list.length != 0) {
					if(typeof idx == 'number' || typeof idx == 'string') {
						uni.navigateTo({
							url: `/pages/selectBatch/selectBatch?id=${$this.id}&date=${$this.lineObj.batch_list[idx].date}`
						})
					}else {
						uni.navigateTo({
							url: `/pages/selectBatch/selectBatch?id=${$this.id}`
						})
					}
				}else {
					this.$api.warnNotice('当前线路没有班期')
				}
			},
			bindChangeSwiper(e) {
				this.currentSwiper = e.detail.current
			},
			// 线路相关
			scrollListen (n, callback) {
			  if (this.scrollNum === null) this.scrollNum = n
			
			  if (this.scrollNum == n) {
			    if (!this.isActive) {
			      this.isActive = true
			      typeof callback == 'function' && callback(n)
			    }
			  } else {
			    // this.isActive = false
			    this.scrollNum = n
				typeof callback == 'function' && callback(n)
			  }
			},
			queryMultipleNodes(id,callBack) {
				var query = uni.createSelectorQuery().in(this)//创建节点查询器 query
				query.select(id).boundingClientRect( data => {
					typeof callBack == 'function' && callBack(data.top)
				}).exec()//这段代码的意思是选择Id=the-id的节点，获取节点位置信息的查询请求
			},
			toCutTitle(idx) {
				this.titleArr.map((v, i) => {
					if(idx == i) {
						v.isActive = true
						this.toViewScroll = v.boxTop
					}else {
						v.isActive = false
					}
				})
			},
			navFloatScroll(val) {
				if (val > this.navCutTop) {
				    if (!this.isFloat) {
					  this.navPostion = 'fixed'
					  this.isFloat = true
				    }
				} else {
				    if (this.isFloat) {
					  this.navPostion = 'absolute'
					  this.isFloat = false
				    }
				}
				
				let arr = this.titleArr
				for(let i = 0; i<arr.length; i++) {
				    if (val > arr[0].boxTop) {
				      if (arr[i + 1]) {
				        if (arr[i].boxTop <= val && val < arr[i + 1].boxTop) {
				          this.scrollListen(i, n => {
				              this.titleArr.map((v, ind) => {
				                if(ind == n) {
								  this.titleArr[ind].isActive = true
				                }else {
								  this.titleArr[ind].isActive = false
				                }
				              })
				          })
				        }
				      }else {
				        if (val > arr[i].boxTop) {
				          this.scrollListen(i, n => {
				            this.titleArr.map((v, ind) => {
				              if (ind == n) {
								this.titleArr[ind].isActive = true
				              } else {
				                this.titleArr[ind].isActive = false
				              }
				            })
				          })
				        }
				      }
				    }else {
					  this.titleArr[0].isActive = true
				    }
				}
			},
			toCollectLine() { //收藏线路
				if(this.lineObj.is_collected == 0) {
					this.addColoctLine()
				}else {
					this.cancelColoctLine()
				}
			},
			addColoctLine() { //收藏线路
				this.$api.ajax({
					url: this.$config.addCollect,
					method: "POST",
					data: {
						type: 1,
						third_id: this.id
					}
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						uni.showToast({
							title: '操作成功',
							icon: 'success',
							success: () => {
								this.lineObj.is_collected = 1
								this.lineObj.collect_id = res.data.data
							}
						})
					}else {
						this.$api.warnNotice(res.data.message)
					}
				})
				.catch((err) => {
					this.$api.warnNotice('收藏失败')
				})
			},
			cancelColoctLine() { //取消收藏
				this.$api.ajax({
					url: this.$config.cancelCollect,
					method: 'DELETE',
					data: {
						collect_id: this.lineObj.collect_id
					}
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						uni.showToast({
							title: '操作成功',
							icon: 'success',
							success: () => {
								this.lineObj.is_collected = 0
							}
						})
					}else {
						this.$api.warnNotice(res.data.message)
					}
				})
				.catch((err) => {
					this.$api.warnNotice('取消收藏失败')
				})
			},
			toJumpSelectBatch() { //购买
				if(this.lineObj.batch_list && this.lineObj.batch_list.length == 0) {
					this.$api.warnNotice('当前线路没有班期')
					return
				}
			
				const $this = this
				uni.navigateTo({
					url: `/pages/selectBatch/selectBatch?id=${$this.id}`
				})
			},
			toRelaodData() {
				this.isLoadErr = false
				this.lineObj = null
				this.getDetailData()
			},
			getDetailData() { //获取详情数据
				uni.showLoading({
					title: '数据加载中',
					mask: true
				})
				const $this = this
				let data = { rt_id: this.id } 
				if(this.$userInfo) {
					data.uid = this.$userInfo.uid
				}
				this.$api.ajax({
					url: this.$config.lineDetail,
					data: data
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						let obj = res.data.data
						// 评论图片分割
						if(obj.top_comment && obj.top_comment.picture_arr) {
							obj.top_comment.imgs = obj.top_comment.picture_arr.split(',')
						}
						this.lineObj = obj
						// 线路行程json转数据
						if(obj.route_content_json) {
							this.lineArr = JSON.parse(obj.route_content_json)
							this.lineArr.map((val, idx) => {
								val.childList.map((v, i) => {
									if(v.imgList != 0) {
										this.routeImgs.push(...v.imgList)
									}
								})
							})
						}else {
							this.lineArr = []
						}
						
						// swiper图片数组
						let arr = obj.picture_arr != '' ?obj.picture_arr.split(',') : obj.thumb? [obj.thumb]: [], imgArr = []
						arr.map(v => {
							imgArr.push({
								url: v,
								type: 'img'
							})
						})
						this.swiperList = imgArr
						
						// 富文本处理
						if(res.data.data.feature_text) {
							let content = res.data.data.feature_text.replace(/section/g, "div")
							content = content.replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
							this.lineLight = content
						}else {
							this.lineLight = res.data.data.feature_text
						}
						
						// 计算top高度
						setTimeout(() => {
							this.titleArr.map((v, i) => {
								if(!v.boxTop) {
									this.queryMultipleNodes(`#${v.boxId}`, (top) => {
										v.boxTop = top - ((wx.getSystemInfoSync().windowWidth / 750) * 82 + this.CustomBar)
									})
								}
							})
							uni.hideLoading();
						}, 1000)
					}else {
						uni.hideLoading();
						this.$api.warnNotice(res.data.message)
						this.isLoadErr = true
					}
				})
				.catch((err) => {
					console.log(err)
					uni.hideLoading();
					this.isLoadErr = true
				})
			},
			toPlayVideo() { //播放视频
				this.isPlayVideo = true
				uni.createVideoContext('videoBox').requestFullScreen()
			},
			toQuitFullscreen(e) { //退出全屏
				if(!e.detail.fullScreen) {
					this.isPlayVideo = false
				}
			}
		},
		onShareAppMessage() {
			const $this = this
			return {
				// path: `/pages/apply/apply?dear_id=${$this.dear_id}`,
				title: $this.lineObj.title,
				imageUrl: $this.lineObj.thumb
			}
		}
	}
</script>

<style scoped lang="scss">
	.lineDetail {
		width: 100%;
		height: 100%;
		background-color: #F1F1F5;
		position: relative;
		.detailBox {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 10;
			.detailBoxScroll {
				width: 100%;
				height: 100%;
			}
		}
		.showVideoBox {
			padding: 20upx;
			width: 100%;
			height: 500upx;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: rgba(0,0,0,0.6);
		}
	}
	.richTextShow {
		width: 100%;
		height: auto;
		overflow: hidden;
	}
	#videoBox {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 200;
	}
	.detail-banner {
		width: 100%;
		height: 590upx;
		position: relative;
		z-index: 1;
		background-color: $img-bg;
		.screen-swiper {
			width: 100%;
			height: 100%;
			.item-swiper-box {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: rgba(0,0,0,0.7);
				.item-swiper-img {
					width: 100%;
					height: 100%;
				}
			}
		}
		.self-dots-box {
			position: absolute;
			width: 100%;
			height: 10upx;
			left: 0;
			bottom: 40upx;
			display: flex;
			justify-content: center;
			.item-self-dots {
				width: 10upx;
				height: 10upx;
				border-radius: 5upx;
				overflow: hidden;
				transition: all 0.5s;
				background-color: rgba(255,255,255,0.6);
				&:not(:last-child) {
					margin-right: 8upx;
				}
			}
			.item-active-dots {
				width: 30upx;
				background-color: rgba(255,255,255,1);
			}
		}
		.toShowVideo {
			position: absolute;
			bottom: 20upx;
			right: 0;
			width: 100upx;
			height: 100upx;
			background-color: rgba(0,0,0,0.7);
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 52upx;
			color: $text-color;
			font-weight: 900;
			border-radius: 4upx;
		}
	}
	.detail-info-box-1 {
		position: relative;
		top: -20upx;
		z-index: 5;
		background-color: $text-color;
		border-radius: 20rpx 20rpx 0 0;
		overflow: hidden;
		padding: 30upx 30upx 20upx;
		.detail-info-title {
			font-size: 32upx;
			color: $text-main-black;
			margin-bottom: 20upx;
			font-weight: 700;
		}
		.detial-info-tags {
			display: flex;
			flex-wrap: wrap;
			margin-bottom: 10upx;
			.item-info-tag {
				padding: 2upx 10upx;
				background: #F5F7FA;
				border-radius: 2upx;
				font-size: 20upx;
				color: $text-second-black;
				margin: 0 10upx 10upx 0;
			}
		}
		.detail-info-price {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 20upx;
			.detail-info-price-num {
				font-size: 24upx;
				color: $text-red;
				text {
					display: inline-block;
					margin: 0 4upx;
					font-size: 40upx;
					font-weight: 800;
				}
			}
			.detail-info-price-sell {
				font-size: 24upx;
				color: #A0A0A0;
				text {
					margin-left: 4px;
					display: inline-block;
					color: #79797B;
					font-weight: 600;
				}
			}
		}
		.to-open-member-card {
			width: 100%;
			height: 90upx;
			border-radius: 12upx;
			background-image: linear-gradient(90deg, #FDECCA 0%, #F2D08E 100%);
			overflow: hidden;
			display: flex;
			align-items: center;
			padding: 0 30upx;
			.member-card-icon {
				width: 44upx;
				height: 44upx;
				border-radius: 50%;
				overflow: hidden;
				margin-right: 20upx;
				background-image: linear-gradient(133deg, #646464 1%, #000000 98%);
			}
			.member-card-text {
				font-size: 24upx;
				color: $text-second-black;
				font-weight: 600;
				margin-right: 40upx;
			}
			.to-open-member-txt {
				font-size: 24upx;
				color: $text-second-black;
				font-weight: 600;
				margin-right: 20upx;
			}
			.to-open-member-icon {
				width: 26upx;
				height: 26upx;
				border-radius: 50%;
				background-color: $text-second-black;
				overflow: hidden;
			}
		}
	}
	.detail-info-box-2 {
		width: 100%;
		height: auto;
		background-color: $text-color;
		padding: 20upx 30upx;
		margin-bottom: 20upx;
		.detail-info-box-title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			text {
				font-size: 32upx;
				color: $text-third-black;
				font-weight: 800;
			}
			&:after {
				content: '';
				display: block;
				width: 10upx;
				height: 10upx;
				border: 2upx solid #C5C9D6;
				border-top-color: transparent;
				border-left-color: transparent;
				transform: rotate(-45deg);
				position: relative;
				left: -2upx;
			}
		}
		.show-batch-list {
			width: 100%;
			height: 100upx;
			overflow: hidden;
			position: relative;
			margin-top: 20upx;
			.show-batch-list-scroll {
				width: 100%;
				height: 100%;
				white-space: nowrap;
				.show-item-batch-out {
					height: 100upx;
					display: inline-block;
					&:not(:last-child) {
						margin-right: 10upx;
					}
				}
				.show-item-batch {
					padding: 16upx 20upx;
					background-color: $img-second-bg;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					.show-item-batch-date {
						font-size: 24upx;
						color: $text-third-black;
					}
					.show-item-batch-price {
						font-size: 24upx;
						color: $text-third-black;
						font-weight: 800;
					}
				}
			}
			.to-more-batch {
				position: absolute;
				top: 0;
				right: 0;
				z-index: 10;
				width: 36upx;
				height: 100upx;
				padding: 0 10upx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 16upx;
				color: $text-second-black;
				background-color: $img-second-bg;
				box-shadow: 10upx 0 20upx 0 rgba(0,0,0,0.8);
			}
		}
	}
	
	.detail-info-box-3 {
		margin-bottom: 20upx;
		padding: 20upx 30upx;
		background-color: $text-color;
		.detail-info-score-top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 14upx;
			.detail-info-score-sum {
				font-size: 32upx;
				color: $text-third-black;
				font-weight: 800;
			}
			.to-all-comment {
				font-size: 24upx;
				color: #559CFF;
				display: flex;
				align-items: center;
				&:after {
					content: '';
					display: block;
					width: 10upx;
					height: 10upx;
					border: 2upx solid #559CFF;
					border-top-color: transparent;
					border-left-color: transparent;
					transform: rotate(-45deg);
					margin-left: 6upx;
					position: relative;
					top: 2upx;
				}
			}
		}
		.detail-comment-type {
			width: 100%;
			height: 54upx;
			overflow: hidden;
			position: relative;
			margin-bottom: 20upx;
			.detail-comment-type-scroll {
				width: 100%;
				height: 100%;
				white-space: nowrap;
				.item-comment-type-box {
					height: 100%;
					display: flex;
					align-items: center;
				}
			}
			.item-comment-type {
				height: 100%;
				width: auto;
				display: flex;
				align-items: center;
				padding: 0 20upx;
				background: #E9F3FE;
				border-radius: 8upx;
				font-size: 24upx;
				color: $text-third-black;
				&:not(:last-child) {
					margin-right: 10upx;
				}
			}
			.more-type-black {
				position: absolute;
				top: 0;
				right: 0;
				z-index: 10;
				width: 100upx;
				height: 54upx;
				background-image: linear-gradient(-90deg, #FFFFFF 17%, rgba(255,255,255,0.00) 100%);
			}
		}
		.detail-new-comment {
			.detail-new-comment-top {
				display: flex;
				align-items: center;
				margin-bottom: 20upx;
				.detail-comment-user-head {
					width: 60upx;
					height: 60upx;
					border-radius: 50%;
					background-color: $img-bg;
					margin-right: 10upx;
				}
				.detail-comment-user-info {
					flex: 1;
					overflow: hidden;
					.detail-comment-user-name {
						display: flex;
						justify-content: space-between;
						align-items: center;
						.detail-comment-user-name-txt {
							flex: 1;
							overflow: hidden;
							font-size: 24upx;
							font-weight: 600;
							color: $text-third-black;
							@extend .ellipse1;
						}
						.detail-comment-time {
							margin-left: 20upx;
							font-size: 20upx;
							color: $text-grey;
						}
					}
					.detail-comment-user-start {
						font-size: 24upx;
						color: $text-grey;
						.active-comment-start {
							color: $main-color;
						}
					}
				}
			}
			.show-commemt-txt {
				font-size: 24upx;
				color: $text-third-black;
				@extend .ellipse2;
			}
			.show-comment-imgs {
				margin-top: 20upx;
				width: 100%;
				height: 168upx;
				border-radius: 4px;
				overflow: hidden;
				.show-comment-imgs-scroll {
					width: 100%;
					height: 100%;
					white-space: nowrap;
					.item-show-comment-img {
						display: inline-block;
						width: 168upx;
						height: 100%;
						background-color: $img-bg;
						&:not(:last-child) {
							margin-right: 6upx;
						}
					}
				}
			}
		}
	}
	
	.detail-bottom-opt {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 99;
		width: 100%;
		height: 100upx;
		background-color: $text-color;
		box-shadow: 0 0 0 0 #EAEAEA;
		padding: 6upx 30upx 6upx 0;
		display: flex;
		.detail-bottom-opt-left {
			flex: 1;
			display: flex;
			position: relative;
			.detail-bottom-opt-box {
				position: relative;
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				justify-content: center;
				.detail-bottom-opt-icon {
					width: 40upx;
					height: 40upx;
					margin-bottom: 6upx;
				}
				.serviceBtn {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					z-index: 5;
					opacity: 0;
				}
			}
			.detail-bottom-opt-icon-txt {
				font-size: 20upx;
				color: $text-third-black;
			}
			.to-active-collect-line {
				.detail-bottom-opt-icon-txt {
					color: $main-color;
				}
			}
		}
		.detail-bottom-opt-right {
			position: relative;
			width: 452upx;
			height: 84upx;
			border-radius: 42upx;
			overflow: hidden;
			.detail-bottom-opt-right-box {
				width: 100%;
				height: 100%;
				display: flex;
			}
			.detail-bottom-opt-buy {
				flex: 1;
				height: 100%;
				background-color: #FFFBE6;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28upx;
				color: $text-main-black;
			}
			.detail-bottom-opt-member-buy{
				flex: 1;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				background-color: $main-color;
				justify-content: center;
				view {
					font-size: 28upx;
					color: $text-main-black;
				}
				text {
					font-size: 10px;
					color: rgba(10,8,0,0.51);
				}
			}
		}
	}
	
	// 线路行程方面
	.lineContent {
		width: 100%;
		height: auto;
		#contentNavBox {
			width: 100%;
			height: 84upx;
			background-color: $text-color;
			position: relative;
		}
		.contentNav {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 88;
			width: 100%;
			height: 84upx;
			padding: 0 30upx;
			background-color: $text-color;
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #EFEFEF;
			.itemContent {
				line-height: 84upx;
				height: 100%;
				font-size: 32rpx;
				color: $text-third-black;
				border-bottom: 2px solid transparent;
				transition: all 0.3s;
				position: relative;
				z-index: 1;
				top: 1px;
			}
			.itemActiveContent {
				border-bottom-color: $main-color;
				font-weight: 800;
			}
		}
	}
	#lineIntro {
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-bottom: 20upx;
		background-color: $text-color;
		padding: 30upx 30upx 40upx;
		image {
			width: 100%;
			height: 400upx;
			border-radius: 12upx;
			overflow: hidden;
			margin: 10upx 0;
		}
		text {
			font-size: 28upx;
			color: $text-third-black;
			line-height: 36upx;;
		}
	}
	.item-content-title {
		display: flex;
		align-items: center;
		font-size: 32upx;
		color: $text-third-black;
		margin-bottom: 20upx;
		font-weight: 600;
		&:before {
			content: '';
			display: block;
			width: 10upx;
			height: 36upx;
			background-color: $main-color;
			margin-right: 20upx;
		}
	}
	#journeyLine {
		margin-bottom: 20upx;
		background-color: $text-color;
		padding: 30upx 30upx 40upx;
		.to-show-line-box {
			width: 100%;
			height: auto;
			position: relative;
			.item-line-day {
				&:not(:last-child) {
					margin-bottom: 60upx;
				}
				&:before {
					content: '';
					display: block;
					width: 4upx;
					height: 100%;
					position: absolute;
					left: 18upx;
					top: 0;
					z-index: 0;
					background-color: #F4F4F4;
				}
				.item-line-head-box {
					display: flex;
				}
				.item-line-day-title-day {
					font-size: 44upx;
					height: 54upx;
					line-height: 54upx;
					color: $text-third-black;
					font-weight: 800;
					margin-right: 20upx;
					background-color: $text-color;
					position: relative;
					z-index: 1;
				}
				.item-line-day-box {
					flex: 1;
					overflow: hidden;
					.item-line-day-title {
						font-size: 32upx;
						color: $text-third-black;
						font-weight: 600;
						margin-bottom: 20upx;
					}
					.item-line-day-desc {
						display: block;
						font-size: 28upx;
						color: $text-third-black;
						margin-bottom: 60upx;
						line-height: 46upx;
					}
				}
				.item-line-day-spot {
					display: flex;
					&:not(:last-child) {
						margin-bottom: 60upx;
					}
					.item-line-day-spot-icon {
						width: 40upx;
						height: 40upx;
						border-radius: 50%;
						overflow: hidden;
						background-color: $img-bg;
						margin-right: 26upx;
						position: relative;
						z-index: 1;
					}
					.item-line-day-spot-box {
						flex: 1;
						overflow: hidden;
						.item-line-day-spot-title {
							font-size: 28upx;
							color: $text-third-black;
							font-weight: 800;
							margin-bottom: 20upx;
						}
						.item-line-day-spot-img {
							width: 100%;
							height: 300upx;
							border-radius: 12upx;
							margin-bottom: 20upx;
							overflow: hidden;
						}
						.item-line-day-spot-desc {
							font-size: 28upx;
							color: $text-third-black;
							line-height: 42upx;
						}
					}
				}
			}
		}
	}
	#useExplain {
		margin-bottom: 20upx;
		background-color: $text-color;
		padding: 30upx 30upx 40upx;
		.useExplain-text {
			&:not(:last-child) {
				margin-bottom: 40upx;
			}
			.useExplain-text-title {
				font-size: 28upx;
				color: $text-third-black;
				font-weight: 600;
				margin-bottom: 10upx;
			}
			.useExplain-text-box {
				font-size: 28upx;
				color: $text-third-black;
				line-height: 42upx;
			}
		}
	}
	#buyNotice {
		background-color: $text-color;
		padding: 30upx 30upx 40upx;
		.buyNotice-text {
			font-size: 28upx;
			color: $text-third-black;
			line-height: 42upx;
		}
	}
</style>
