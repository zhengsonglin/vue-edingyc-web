<template>
	<div class="userSex pageHeader">
		<x-header class="myHeader" title="设置性别" :left-options="{showBack: false, backText: ''}">
			<span slot="left" class="left-text-noIcon" @click="$router.back()">取消</span>
			<span slot="right" class="right-menu-text" @click="saveUserSex">完成</span>
		</x-header>
		
		<div class="content">
			<div class="sub-sex">
				<group title="">
			      <radio :options="items" v-model="sex"></radio>
			    </group>
			</div>
		</div>
	</div>
</template>

<script>
	import { XHeader, Radio, Group } from 'vux'
	export default{
		data(){
			return {
				items:["男","女"],
				sex:"男"
			}
		},
		components:{
			XHeader,
			Radio,
			Group
		},
		methods:{
			saveUserSex(){
				this.$vux.toast.show({
				 	text: '性别为'+this.sex
				})
				this.$router.back();
			}
		}
	}	
</script>

<style scoped lang="less">
	@import '../../styles/myHeader.less';
</style>