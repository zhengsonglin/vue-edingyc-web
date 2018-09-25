<template>
	<transition name="vux-slide">
		<div class="changePass pageHeader">
			<x-header class="myHeader">
				<x-icon slot="overwrite-left" type="ios-arrow-back" size="32" class="icon-back" @click="$router.back()"></x-icon>
				<span slot="left" class="back-text">修改密码</span>
			</x-header>
			
			<div class="content">
				<group>
			      <x-input type="password" title="新密码" name="pass" placeholder="请输入新密码" :show-clear="false"></x-input>
			      <x-input type="password" title="重复密码" name="rePass" placeholder="再次确认密码" :show-clear="false"></x-input>
			      <x-input title="发送验证码" class="weui-vcode" :show-clear="false">
			        <x-button slot="right" type="primary" mini @click.native="sendCode">发送验证码</x-button>
			      </x-input>
			    </group>
			    
				<box gap="50px 10px 0">
			      <x-button type="primary" @click.native="$router.back()">确定</x-button>
			    </box>  
			</div>
		</div>
	</transition>
</template>

<script>
	import { XHeader, Group, Cell, XInput } from 'vux'
	export default{
		data(){
			return {}
		},
		methods:{
			sendCode(){
				this.$vux.toast.text('发送成功')
			}
		},
		components:{
			XHeader,
			Group,
			Cell,
			XInput
		}
	}
</script>

<style scoped lang="less">
	@import '../../styles/myHeader.less';
	@import '../../styles/transition.less';
	
</style>