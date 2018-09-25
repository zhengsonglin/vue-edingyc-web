<template>
	<div class="personPhoto pageHeader">
		<x-header class="myHeader" title="个人头像" :left-options="{showBack: false, backText: ''}" :right-options="{showMore: true}" @on-click-more="showMenus = true">
			<!--<x-icon slot="overwrite-left" type="ios-arrow-back" size="32" class="icon-back" @click="$router.back()"></x-icon>
			<span slot="left" class="back-text">个人信息</span>-->
			<span slot="left" class="left-text-noIcon" @click="$router.back()">取消</span>
		</x-header>
		<div v-transfer-dom>
	      <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu="handleMenu"></actionsheet>
	    </div>
		<div class="content">
			<div class="imgBox">
				<img src="../../images/home/nickName.jpg" alt="" />
			</div>
		</div>
	</div>	
</template>

<script>
	import { XHeader, Actionsheet, TransferDom} from 'vux'
	export default{
		directives: {
		    TransferDom
		},
		data(){
			return {
				menus: {
			        menu1: '拍照',
			        menu2: '从手机相册选择'
			    },
			    showMenus: false
			}
		},
		components:{
			XHeader,
			Actionsheet
		},
		methods:{
			handleMenu(key, val){
				console.log(key +"," + val)
				// 显示文字
				this.$vux.toast.text('尚在开发中', 'middle')
			}
		}
	}	
</script>

<style scoped lang="less">
	@import '../../styles/myHeader.less';
	.imgBox{
		img{
			max-width:100%;
			max-height:100%;
			position:relative;
			margin:50% 0 0 50%;
			transform: translate(-50%, -25%);
		}
	}
</style>