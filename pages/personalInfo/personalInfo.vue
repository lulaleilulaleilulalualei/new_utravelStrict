<template>
	<view class="personalInfo">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">个人资料</block></cu-custom>
		<view class="info-box">
			
			<view class="item-info-box">
				<view class="item-info-title">头像</view>
				<view class="item-show-info">
					<view class="item-show-info-head"></view>
				</view>
			</view>
			
			<view class="item-info-box">
				<view class="item-info-title">昵称</view>
				<view class="item-show-info">
					<view class="item-show-info-txt" @tap="toEditInfo('name')">柳顺子</view>
				</view>
			</view>
			
			<view class="item-info-box item-area-box" @tap="toEditTel">
				<view class="item-info-title">手机号码</view>
				<view class="item-show-info">
					<view class="item-show-info-txt">131****5659</view>
				</view>
			</view>
			
			<view class="item-info-box">
				<view class="item-info-title">性别</view>
				<view class="item-show-info">
					<picker @change="bindPickerSex" :value="sexIdx" :range="sexArray">
						<view class="item-show-info-txt">{{sexArray[sexIdx]}}</view>
					</picker>
				</view>
			</view>
			
			<view class="item-info-box">
				<view class="item-info-title">出生日期</view>
				<view class="item-show-info">
					<picker mode="date" :value="birthDate" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="item-show-info-txt">{{birthDate}}</view>
					</picker>
				</view>
			</view>
			
			<view class="item-info-box item-area-box">
				<view class="item-info-title">身份证</view>
				<view class="item-show-info">
					<view class="item-show-info-txt" @tap="toEditInfo('idcard')">请输入您的身份证号</view>
				</view>
			</view>
			
			<view class="item-info-box">
				<view class="item-info-title">所在地区</view>
				<view class="item-show-info">
					<picker mode="region" @change="bindAreaChange" :value="areaArr">
						<view class="item-show-info-txt" v-if="areaArr.length == 0">请选择您所在的地区</view>
						<view class="item-show-info-txt" v-else>{{areaArr[0]}} {{areaArr[1]}} {{areaArr[2]}}</view>
					</picker>
				</view>
			</view>
			
			<view class="item-info-box">
				<view class="item-info-title">所在俱乐部</view>
				<view class="item-show-info">
					<picker @change="bindPickerClub" :value="clubIdx" :range="clubArr">
						<view class="item-show-info-txt" v-if="clubIdx === null">请选择您所在的俱乐部</view>
						<view class="item-show-info-txt" v-else>{{clubArr[clubIdx]}}</view>
					</picker>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sexIdx: 0,
				sexArray: ['男', '女'],
				sexType: 1,
				birthDate: '', //出生日期
				areaArr: [], //地区
				
				clubIdx: null,
				clubArr: ['俱乐部一', '俱乐部二', '俱乐部三']
			}
		},
		onLoad() {
			this.birthDate = this.getDate()
		},
		computed: {
		    startDate() {
		        return this.getDate('start');
		    },
		    endDate() {
		        return this.getDate('end');
		    }
		},
		methods: {
			bindPickerSex(e) { //选择性别
				if(this.sexIdx != e.detail.value) {
					this.sexIdx = e.detail.value
					if(this.sexIdx == 0) {
						this.sexType = 1
					}else if(this.sexIdx == 1) {
						this.sexType = 2
					}
				}
			},
			bindDateChange(e) { //选择出生日期
				this.birthDate = e.detail.value
			},
			bindAreaChange(e) {
				this.areaArr = e.detail.value
			},
			bindPickerClub(e) {
				if(this.clubIdx != e.detail.value) {
					this.clubIdx = e.detail.value
				}
			},
			toEditInfo(type) {
				uni.navigateTo({
					url: `/pages/personalInfo/editPersonnalInfo?type=${type}`
				})
			},
			toEditTel() {
				uni.navigateTo({
					url: '/pages/personalInfo/editTel'
				})
			},
			getDate(type) {
			    const date = new Date();
			    let year = date.getFullYear();
			    let month = date.getMonth() + 1;
			    let day = date.getDate();
			
			    if (type === 'start') {
			        year = year - 100;
			    } else if (type === 'end') {
			        year = year + 100;
			    }
			    month = month > 9 ? month : '0' + month;;
			    day = day > 9 ? day : '0' + day;
			    return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style scoped lang="scss">
	.info-box {
		padding: 0 30upx;
		.item-area-box {
			border-bottom: 1px solid $border-color;
		}
		.item-info-box {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30upx 0;
			.item-info-title {
				font-size: 28upx;
				color: $text-second-black;
			}
			.item-show-info {
				flex: 1;
				overflow: hidden;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				font-size: 28upx;
				color: $text-grey;
				&:after {
					content: '';
					display: block;
					width: 10upx;
					height: 10upx;
					border: 3upx solid #CCCCCC;
					border-top-color: transparent;
					border-left-color: transparent;
					transform: rotate(-45deg);
					margin-left: 20upx;
					position: relative;
					left: -2upx;
				}
			}
			picker {
				width: 100%;
				height: auto;
			}
		}
	}
	.item-show-info-head {
		width: 72upx;
		height: 72upx;
		border-radius: 50%;
		background-color: $img-bg;
	}
	.item-show-info-txt {
		flex: 1;
		overflow: hidden;
		text-align: right;
	}
</style>
