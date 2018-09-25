<template>
	<transition name="slide">
		<div class="loginContainer">
			<div class="login-form">
				<div class="form-group">
				    <input type="text" class="inputText" placeholder="手机号" v-model="LoginForm.phone" onfocus="this.type='text'" 
				    	autocomplete="off" @keyup="inputKeyUp">
				</div>
				<div class="form-group">
				    <input type="text" class="inputText" placeholder="密码" v-model="LoginForm.pass" onfocus="this.type='password'" 
				    	autocomplete="off" @keyup="inputKeyUp">
				</div>
				  
				<div class="form-group linkgroup">
				  	 <a href="javascript:;" class="fl link">新用户注册</a>
					 <a href="javascript:;" class="fr link">忘记密码</a>
				</div>
				<div class="form-group text-center">
				  	<x-button mini type="primary" class="btn-login" :disabled="isDisable" @click.native.stop="loginByPhone">登录</x-button>
				</div>
			</div>
			<div class="quick-login">
		      	<h4 class="text-center">微信登录</h4>
				<!--<a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe7d789ae31af2210&redirect_uri=http://w.1dingyouche.com/wxauth&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect" class="weiXin">
					<img src="../../images/wechat.png"/>
				</a>-->
				<a href="javascript:;"  class="weiXin"><img src="../../images/wechat.png"/></a>
			</div>
		</div>
	</transition>
</template>

<script>
	import Cookies from 'js-cookie'
	export default{
		data(){
			return {
				isDisable:true,
				LoginForm:{
					phone:'',
					pass:''
				}
			}
		},
		components:{
		},
		methods:{
			inputKeyUp(){
				let phone = this.LoginForm.phone.trim()
				let pass = this.LoginForm.pass
				
				if(phone.length>0 && pass.length>0){
					this.isDisable = false
				}else{
					this.isDisable = true
				}
			//	this.$vux.toast.text('hello')
			},
			loginByPhone(){
				let phone = this.LoginForm.phone.trim()
				let pass = this.LoginForm.pass
				if(phone.length>0 && pass.length>0){
					this.$vux.loading.show({
					 	text: 'Loading'
					})
					this.$store.dispatch('LoginByUsername', this.LoginForm).then(() => {
						Cookies.set('userInfo', this.LoginForm)
			            this.$vux.loading.hide()
			            this.$router.push({ path: '/main' })
			        }).catch(() => {
			            this.$vux.loading.hide()
			        })
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.loginContainer{
		background: #4E4C52;
    	width:100%;
    	height: 100%;
    	.login-form {
    		margin: 0 auto;
    		width: 90%;
    		padding-top: 25%;
	    	.inputText {
			    display: block;
			    width: 100%;
			    height: 1.8rem;
			    font-size: 16px;
			    color: #555;
			    background-color: #fff;
			    background-image: none;
			    border: 1px solid #ccc;
			    border-radius: 4px;
			    margin-bottom: 1rem;
			    text-indent: 10px;
			}
			.linkgroup{
				overflow:hidden;
				margin:10px 0;
				a.link{
					color: #eee;
					font-size:12px;
				}
			}  
			.btn-login{
				font-size:16px;
			}
		} 
		.quick-login {
		    border-top: 2px solid #aaa;
		    position: relative;
		    margin-top: 40px;
		    h4 {
			    width: 70px;
			    height: 16px;
			    color: #fff;
			    background: #4E4C52;
			    position: absolute;
			    left: 0;
			    right: 0;
			    margin: -10px auto;
			    font-size: 12px;
			}  
			a.weiXin {
			    width: 48px;
			    height: 48px;
			    margin: 25px auto 10px;
			    display: block;
			    img {
				    width: 40px;
				    height: 40px;
				    margin: 0 auto;
				}
			}
		} 
	}
	
	.slide-enter-active, .slide-leave-active{
		transition: all 0.3s
	}
  	.slide-enter, .slide-leave-to{
  		transform: translate3d(100%, 0, 0)
  	}
    
</style>