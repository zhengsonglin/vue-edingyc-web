<template>
	<transition name="vux-slide">
		<div class="aboutUs pageHeader">
			<x-header class="myHeader">
				<x-icon slot="overwrite-left" type="ios-arrow-back" size="32" class="icon-back" @click="$router.back()"></x-icon>
				<span slot="left" class="back-text">关于我们</span>
			</x-header>
			
			<div class="content">
				
			</div>
		</div>
	</transition>	
</template>

<script>
	import { XHeader} from 'vux'
	export default{
		data(){
			return {
				
			}
		},
		components:{
			XHeader
		}	
	}	
</script>

<style scoped lang="less">
	@import '../../styles/myHeader.less';
	@import '../../styles/transition.less';
</style>