<template>
	<div class="bankAccount pageHeader">
		<x-header class="myHeader">
			<x-icon slot="overwrite-left" type="ios-arrow-back" size="32" class="icon-back" @click="$router.back()"></x-icon>
			<span slot="left" class="back-text">银行账户</span>
		</x-header>
		
		<div class="content">
			<div class="sub-account">
				<group label-width="50">
			      <x-input title="账号" name="pass" placeholder="请输入银行卡号" :show-clear="true"></x-input>
			      <x-input title="户名" name="rePass" placeholder="请输入银行账户户名" :show-clear="true"></x-input>
			      <x-input title="开户行" name="rePass" placeholder="请输入开户行名称" :show-clear="true"></x-input>
			    </group>  
			    <box gap="50px 10px 0">
			      <x-button type="primary" @click.native="$router.back()">保存</x-button>
			    </box>  
			</div>
		</div>
	</div>
</template>

<script>
	import { XHeader, Group, XInput} from 'vux'
	export default{
		data(){
			return {
				
			}
		},
		components:{
			XHeader,
			Group,
			XInput
		}	
	}	
</script>

<style scoped lang="less">
	@import '../../styles/myHeader.less';
	@import '../../styles/transition.less';
</style>