<template>
	<view class="skeletonBox">
		<view v-for="(item, idx) in skeletonRectLists" :key="idx" class="itemSkeletonBox skeleton-rect" :style="{width: item.width + 'px', height: item.height + 'px', position: 'absolute', left: item.left + 'px', top: item.top + 'px'}"></view>
		<view v-for="(item, idx) in skeletonCircleLists" :key="idx" class="itemSkeletonBox skeleton-circle" :style="{width: item.width + 'px', height: item.height + 'px', borderRadius: item.width + 'px', position: 'absolute', left: item.left + 'px', top: item.top + 'px'}"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				skeletonRectLists: [],
				skeletonCircleLists: []
			}
		},
		methods: {
			rectHandle: function(){
				const that = this;

				//绘制不带样式的节点
				uni.createSelectorQuery().selectAll(`.skeleton-rect`).boundingClientRect().exec(function(res){
					that.skeletonRectLists = res[0];
				});

			},
			circleHandle: function(){
				const that = this;

				uni.createSelectorQuery().selectAll(`.skeleton-circle`).boundingClientRect().exec(function(res){
					that.skeletonCircleLists = res[0];
				});
			}
		},
		created() {
			setTimeout(() => {
				//绘制矩形
				this.rectHandle();
				
				//绘制圆形
				this.circleHandle();
			}, 100)
		},
		// onLoad() {
		// 	setTimeout(() => {
		// 		//绘制矩形
		// 		this.rectHandle();
		// 		
		// 		//绘制圆形
		// 		this.circleHandle();
		// 	}, 100)
		// }
	}
</script>

<style scoped>
.skeletonBox {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background-color: #FFF;
	z-index: 99;
	overflow: hidden;
}
.skeleton-rect {
	border-radius: 4upx;
}
.itemSkeletonBox {
	background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
	-webkit-animation: ant-skeleton-loading 1.4s ease infinite;
			animation: ant-skeleton-loading 1.4s ease infinite;
  background-size: 400% 100%;
}

@keyframes ant-skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>
