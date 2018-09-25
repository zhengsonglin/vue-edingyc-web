<template>
	<div class="editUserName pageHeader">
		<x-header class="myHeader" title="设置名字" :left-options="{showBack: false, backText: ''}">
			<span slot="left" class="left-text-noIcon" @click="$router.back()">取消</span>
			<span slot="right" class="right-menu-text" @click="save">完成</span>
		</x-header>
		
		<div class="content">
			<div class="sub-sex">
				<group>
				    <x-input v-model="value" ref="input"></x-input>
				</group>
			</div>
		</div>
	</div>
</template>

<script>
	import { XHeader, XInput, Group } from 'vux'
	export default{
		data(){
			return {
				value:''
			}
		},
		components:{
			XHeader,
			XInput,
			Group
		},
		methods:{
			save(){
				this.$vux.toast.show({
				 	text: '设置成功'
				})
				this.$router.back();
			}
		},
		created(){
			setTimeout(()=>{
				this.$refs.input.focus()
			},100)
		}
	}	
</script>

<style scoped lang="less">
	@import '../../styles/myHeader.less';
</style>