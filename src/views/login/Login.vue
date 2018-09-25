<template>
	<div class="loginContainer">
		<div class="sx-top text-center" >
			<img :src="logo" class="logo">
		</div>
		<div class="content">
			<box gap="0px 15px">
		      <x-button type="primary">微信登录</x-button>
		      <x-button type="primary" @click.native="loginByPhone">手机号码登录</x-button>
		    </box>
		</div>
	</div>
</template>

<script>

	export default{
		components: {
    	
		},
		data(){
			return {
				logo:require('@/images/loginIcon.png')
			}
		},
		methods:{
			loginByPhone(){
				//console.log(this.$router)
				this.$router.push("phoneLogin")
			}
		}
	}
</script>

<style lang="less" scoped>
	.loginContainer{
		background: #4E4C52;
    	width:100%;
    	height: 100%;
    	.logo{
    		max-width: 100%;
    		margin: 23% auto 15%;
    		vertical-align: middle;
    	}
	}
</style>