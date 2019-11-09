<template>
	<view class="commentList">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">{{navTitle}}</block></cu-custom>
		<view class="show-comment-tag" v-if="tagArr.length != 0">
			<view :class="['item-comment-tag', {'active-comment-tag': type == item.tag_id}]" 
				v-for="(item, idx) in tagArr" 
				:key="idx" 
				@tap="toSelectCommentTag(idx)">{{item.tag_name}} {{item.count}}</view>
		</view>
		<view class="comment-list-box">
			<scroll-view v-if="commentList.length != 0" class="comment-list-scroll" :scroll-y="true" @scrolltolower="toLoadMore">
				<view class="item-comment-box" v-for="(item, index) in commentList" :key="item.comment_id">
					<view class="item-comment-box-top">
						<view class="item-comment-user-head"><image :src="item.avatar" mode="aspectFill"></image></view>
						<view class="item-comment-user-info">
							<view class="item-comment-user-name">
								<text class="item-comment-user-name-txt">{{item.nick_name}}</text>
								<text class="item-comment-time">{{item.sub_time}}</text>
							</view>
							<view class="item-comment-user-start">
								<text :class="[{'cuIcon-favorfill': item.star >= idx+1}, {'cuIcon-favor': item.star < idx+1}, 'lg', {'active-comment-start': item.star >= idx+1}]" v-for="(val, idx) in 5" :key="idx"></text>
							</view>
						</view>
					</view>
					<view class="show-commemt-txt">{{item.content}}</view>
					<view class="show-comment-imgs" v-if="item.imgs.length != 0">
						<scroll-view class="show-comment-imgs-scroll" :scroll-x="true">
							<view class="item-show-comment-img" v-for="(val, idx) in item.imgs" :key="idx" @tap="toPreviewImg(index, idx)">
								<image :src="val" mode="aspectFill"></image>
							</view>
						</scroll-view>
					</view>
				</view>
				<noMore v-if="!isMore"></noMore>
			</scroll-view>
			
			<view class="no-data-box" v-if="commentList.length == 0">
				<view class="noDataImg"><img src="/static/noData.png" alt=""></view>
				<view class="noDataText">还没有评论~</view>
			</view>
		</view>
		
		<loadErr v-if="isLoadErr" @toRelaodData="toRelaodData"></loadErr>
	</view>
</template>

<script>
	import loadErr from '@/components/loadErr.vue'
	import noMore from '@/components/noMore.vue'
	
	export default {
		data() {
			return {
				navTitle: '点评',
				commentType: null, //评论类型
				index: 1,
				size: 10,
				commentList: [],
				isLoadErr: false, //页面加载出错
				isMore: true,
				id: null,
				type: '', //
				tagArr: [], //标签
				
				
			}
		},
		components: { loadErr, noMore },
		onLoad(opt) {
			this.id = opt.id
			this.commentType = opt.type
			
			this.getCommentTag()
			this.getCommentData()
		},
		methods: {
			toSelectCommentTag(idx) {
				if(this.type == this.tagArr[idx].tag_id) {
					this.type = ''
				}else {
					this.type = this.tagArr[idx].tag_id
				}
 
				this.isMore = true
				this.index = 1
				this.commentList = []
				this.getCommentData()
			},
			toPreviewImg(pIdx, cIdx) {
				const $this = this
				uni.previewImage({
					current: $this.commentList[pIdx].imgs[cIdx],
					urls: $this.commentList[pIdx].imgs
				})
			},
			getCommentTag() {
				this.$api.ajax({
					url: this.commentType == 'line'? this.$config.lineCommentTag: '',
					data: {
						rt_id: this.id
					}
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						let arr = res.data.data
						this.tagArr = arr
					}else {
						this.$api.warnNotice(res.data.message)
					}
				})
				.catch((err) => {
					// this.$api.warnNotice('标签加载失败')
				})
			},
			toLoadMore() {
				if(this.isMore) {
					this.getCommentData()
				}
			},
			getCommentData() {
				if(this.index == 1) {
					uni.showLoading({
						title: '数据加载中',
						mask: true
					})
				}
				this.$api.ajax({
					url: this.commentType == 'line'? this.$config.lineComment: '',
					data: {
						index: this.index,
						size: this.size,
						type: this.type,
						rt_id: this.id
					}
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						let arr = res.data.data
						arr.map(v => {
							if(v.picture_arr) {
								v.imgs = v.picture_arr.split(',')
							}else {
								v.imgs = []
							}
						})
						if(arr.length < this.size) {
							this.commentList = this.commentList.concat(arr)
							this.isMore = false //没有更多了
						}else {
							this.commentList = this.commentList.concat(arr)
							this.index++
						}
						setTimeout(() => {
							uni.hideLoading();
						}, 500)
					}else {
						if(this.index == 1) {
							this.isLoadErr = true
						}else {
							this.$api.warnNotice(res.data.message)
						}
						uni.hideLoading();
					}
				})
				.catch((err) => {
					if(this.index == 1) {
						this.isLoadErr = true
					}else {
						this.$api.warnNotice('列表加载失败')
					}
					uni.hideLoading();
				})
			},
			toRelaodData() { //刷新加载
				this.isLoadErr = false
				this.isMore = true
				this.index = 1
				this.commentList = []
				this.getCommentData()
			}
		}
	}
</script>

<style scoped lang="scss">
	.commentList {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		.show-comment-tag {
			padding: 30upx 30upx 20upx 30upx;
			display: flex;
			flex-wrap: wrap;
			border-bottom: 1px solid $border-color;
			.item-comment-tag {
				padding: 6upx 20upx;
				border-radius: 10upx;
				overflow: hidden;
				font-size: 20upx;
				color: $text-second-black;
				margin: 0 10upx 10upx 0;
				background-color: $main-color;
				opacity: 0.5;
			}
			.active-comment-tag {
				opacity: 1;
			}
		}
	}
	.comment-list-box {
		flex: 1;
		overflow: hidden;
		width: 100%;
		padding-left: 30upx;
		.comment-list-scroll {
			width: 100%;
			height: 100%;
		}
		.item-comment-box {
			padding: 30upx 0;
			border-bottom: 1px solid $border-color;
			.item-comment-box-top {
				display: flex;
				align-items: center;
				padding-right: 30upx;
				margin-bottom: 20upx;
				.item-comment-user-head {
					width: 60upx;
					height: 60upx;
					border-radius: 50%;
					background-color: $img-bg;
					margin-right: 10upx;
				}
				.item-comment-user-info {
					flex: 1;
					overflow: hidden;
					.item-comment-user-name {
						display: flex;
						justify-content: space-between;
						align-items: center;
						.item-comment-user-name-txt {
							flex: 1;
							overflow: hidden;
							font-size: 24upx;
							font-weight: 600;
							color: $text-third-black;
							@extend .ellipse1;
						}
						.item-comment-time {
							margin-left: 20upx;
							font-size: 20upx;
							color: $text-grey;
						}
					}
					.item-comment-user-start {
						font-size: 24upx;
						color: $text-grey;
						.lg {
							&:not(:last-child) {
								margin-right: 4upx;
							}
						}
						.active-comment-start {
							color: $main-color;
						}
					}
				}
			}
			.show-commemt-txt {
				font-size: 24upx;
				color: $text-third-black;
				padding-right: 30upx;
			}
			.show-comment-imgs {
				width: 100%;
				height: 168upx;
				margin-top: 20upx;
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
							margin-right: 20upx;
						}
					}
				}
			}
		}
	}
</style>
