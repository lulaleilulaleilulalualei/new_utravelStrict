<template>
	<view class="succurityNotice">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">旅游安全须知</block></cu-custom>
		<view class="succurityNoticeBox">
			<view class="h3Title">《旅游安全须知》</view>
			<view class="h4Title">一、出发前准备事项</view>
			<view class="pContent">
			  <text>1. 您在旅行前应充分考虑自身身体状况进行合理、适合您的行程安排，建议旅行前做一次身体检查。同时也建议您出行前购买合适的旅游保险以更好地保障您的权益及出行安全。</text>
			  <text>2. 您应根据自己的身体状况随身携带一些必备的药品及常用药品（如感冒药、止泻药、晕车药等），根据天气变化准备衣物及雨具。为了防止火灾事故的发生，请勿携带易燃、易爆物品，不要乱扔烟头和火种。</text>
			  <text>3. 临行前尽量将旅游线路等信息告知家人，留一份自己的身份证、护照复印件给家人，以便遇到紧急情况的时候备用。</text>
			  <text>4. 您应在出行前了解旅行地的天气、气象情况及当地治安情况。</text>
			</view>
			<view class="h4Title">二、乘坐交通工具注意事项</view>
			<view class="pContent">
			  <text>您在乘坐飞机、火车、汽车等交通工具时，应注意遵守相关乘客安全管理规定。</text>
			  <text>当地出行时，您应选择路况较好的旅行线路和安全可靠的交通工具。如遇恶劣天气，请您审慎出行。</text>
			</view>
			<view class="h4Title">三、风险项目提示</view>
			<view class="pContent">
			  <text>游泳、漂流、潜水、冲浪、探险、热气球、高山索道、滑雪、溜冰等涉水、攀爬、户外、探险类的活动项目，均可能存在人身危险。您在参加此类活动项目前应根据自身条件认真评估自身健康状况及风险承受能力，提前了解项目要求和当地气象条件，并充分参考当地相关部门及其它专业机构的相关公告和建议后量力而行。同时也建议您事先购买必要的专项旅游保险以更好地保障您的权益及出行安全。</text>
			</view>
			<view class="h4Title">四、目的地出行</view>
			<view class="pContent">
			  <text>您在目的地出行时应遵守当地法律法规、尊重风俗习惯、文化传统及宗教信仰。您在当地选择出游时请选择正规的旅游机构。</text>
			</view>
			<view class="h4Title">五、理性消费</view>
			<view class="pContent">
			  <text>购买商品要冷静，理性消费，不要盲目听信商家推荐，不贪小便宜，谨防上当受骗。</text>
			</view>
			<view class="h4Title">六、公共安全事件</view>
			<view class="pContent">
			  <text>如遇自然灾害、意外事故、人身伤害、被抢被盗、旅游纠纷等情况，请及时就近报警并与中国驻当地使馆联系。</text>
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
	.succurityNotice {
		width: 100%;
		height: auto;
		.succurityNoticeBox {
			padding: 30upx 30upx 60upx;
		}
	}
	.h3Title {
	  font-size: 36upx;
	  color: #000000;
	  font-weight: 600;
	  margin-bottom: 30upx;
	}
	.h4Title {
	  font-size: 28upx;
	  color: #000000;
	  font-weight: 600;
	  margin-bottom: 20upx;
	}
	.pContent {
	  margin-bottom: 30upx;
	}
	.pContent>text {
	  display: block;
	  font-size: 24upx;
	  color: #000000;
	  line-height: 44upx;
	  text-indent: 48upx;
	}
	.pContent>text:not(:last-child) {
	  margin-bottom: 10upx;
	}
	.pContent .itemPContent {
	  display: block;
	  font-size: 24upx;
	  color: #000000;
	  line-height: 44upx;
	}
	.pContent .specialNotice {
	  color: #F7372C;
	}
</style>
