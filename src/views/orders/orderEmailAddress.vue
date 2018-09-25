<template>
	<transition name="vux-slide">
		<div class="emailAddress pageHeader">
			<x-header class="myHeader">
				<x-icon slot="overwrite-left" type="ios-arrow-back" size="32" class="icon-back" @click="$router.back()"></x-icon>
				<span slot="left" class="back-text">邮寄地址</span>
			</x-header>
			
			<div class="content">
				<load-more :show-loading="false" tip="暂无数据" background-color="#fbf9fe"></load-more>
			</div>
		</div>
	</transition>	
</template>

<script>
	import { XHeader, LoadMore } from 'vux'
	export default{
		data(){
			return {
				
			}
		},
		components:{
			XHeader,
			LoadMore 
		}	
	}	
</script>

<style scoped lang="less">
	@import '../../styles/myHeader.less';
	@import '../../styles/transition.less';
</style>