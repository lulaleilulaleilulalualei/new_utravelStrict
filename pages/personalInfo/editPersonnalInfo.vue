<template>
	<view class="edit-personal-info">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">{{editTitle}}</block></cu-custom>
		
		<view class="edit-info-box">
			<view class="edit-info-input">
				<veiw class="edit-info-title" v-if="editType == 'name'">昵称</veiw>
				<veiw class="edit-info-title" v-if="editType == 'idcard'">身份证</veiw>
				
				<input class="edit-info-input-box" v-if="editType == 'name'" type="text" maxlength="10" />
				<input class="edit-info-input-box" v-if="editType == 'idcard'" type="idcard" />
			</view>
			
			<view class="to-sure-btn">确定</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				editTitle: '',
				editType: ''
			}
		},
		onLoad(opt) {
			this.editType = opt.type
			if(opt.type == 'name') {
				this.editTitle = '编辑昵称'
			}else if(opt.type == 'idcard') {
				this.editTitle = '编辑身份证'
			}
		}
	}
</script>

<style scoped lang="scss">
	 .edit-info-box {
		 padding: 0 30upx;
		 .edit-info-input {
			 width: 100%;
			 height: 120upx;
			 border-bottom: 1px solid $border-color;
			 display: flex;
			 align-items: center;
			 margin-bottom: 80upx;
			.edit-info-title {
				 font-size: 28upx;
				 color: $text-second-black;
			 }
			 .edit-info-input-box {
				 flex: 1;
				 height: 100%;
				 font-size: 28upx;
				 color: $text-second-black;
			 }
		 }
		 .to-sure-btn {
			 width: 100%;
			 height: 80upx;
			 background-color: $main-color;
			 text-align: center;
			 line-height: 80upx;
			 font-size: 28upx;
			 color: $text-second-black;
			 font-weight: 700;
		 }
	 }
</style>
