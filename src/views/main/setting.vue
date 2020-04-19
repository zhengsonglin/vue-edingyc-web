<template>
	<div class="setting">
		<div class="setting-top">
			<div class="images">
				<img src="../../images/home/nickName.jpg" alt="" width="60px"/>
			</div>
			<div class="nickName">郑松林</div>
			<div class="cropInfo">
				<small>企业id&lt;019412&gt;</small>
			</div>
		</div>
		<div class="setting-content">
			<scroll ref="listContent"  class="list-content"  :data="settingDatas">
				<div class="container listItem">
					<div class="item" @click="gotoAuthoration">
						<p><span class="fl">身份认证</span> <span class="fr right-tips">代理人已认证<x-icon type="ios-arrow-right" size="20" class="icon-right"></x-icon></span></p>
					</div>
					<div class="item" @click="gotoPhoneChange">
						<p><span class="fl">修改登录密码</span> <span class="fr right-tips"><x-icon type="ios-arrow-right" size="20" class="icon-right"></x-icon></span></p>
					</div>
					<div class="item" @click="gotoPhoneBind">
						<p><span class="fl">绑定手机号码</span> <span class="fr right-tips">13098811204<x-icon type="ios-arrow-right" size="20" class="icon-right"></x-icon></span></p>
					</div>
					<div class="item" @click="getCompanyEmployee">
						<p><span class="fl">公司成员</span> <span class="fr right-tips">3人<x-icon type="ios-arrow-right" size="20" class="icon-right"></x-icon></span></p>
					</div>
					<div class="item" @click="getPersonInfo">
						<p><span class="fl">个人信息</span> <span class="fr right-tips"><x-icon type="ios-arrow-right" size="20" class="icon-right"></x-icon></span></p>
					</div>
					<div class="item" @click="getCropInfo">
						<p><span class="fl">企业信息</span> <span class="fr right-tips"><x-icon type="ios-arrow-right" size="20" class="icon-right"></x-icon></span></p>
					</div>
					<div class="item" @click="gotoUs">
						<p><span class="fl">关于一订有车</span> <span class="fr right-tips"><x-icon type="ios-arrow-right" size="20" class="icon-right"></x-icon></span></p>
					</div>
					<div class="item" @click="contactCus">
						<p><span class="fl">联系客户</span> <span class="fr right-tips"><x-icon type="ios-arrow-right" size="20" class="icon-right"></x-icon></span></p>
					</div>
					<div class="item" @click="userXieYi">
						<p><span class="fl">用户协议</span> <span class="fr right-tips"><x-icon type="ios-arrow-right" size="20" class="icon-right"></x-icon></span></p>
					</div>
					<div class="item-logout">
						<p @click="logout">退出</p>
					</div>
				</div>
			</scroll>
		</div>
		<transition name="vux-slide">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	import Scroll from 'base/scroll/scroll'
	export default{
		data(){
			return {
				settingDatas:[]
			}
		},
		components:{
			Scroll
		},
		methods:{
			gotoAuthoration(){
				this.$vux.alert.show({
				  title: '提示',
				  content: '身份认证审核中或者已认证状态下无法修改认证信息。',
				  onShow () {},
				  onHide () {}
				})

			},
			gotoPhoneChange(){
				this.$router.push({"path":"setting/changePass"})
			},
			gotoPhoneBind(){
				this.$vux.alert.show({
				  title: '提示',
				  content: '你已经绑定过手机号码，暂不支持重写绑定!',
				})
			},
			getCompanyEmployee(){
				this.$router.push({"path":"setting/companyEmployee"})
			},
			getPersonInfo(){
				this.$router.push({"path":"setting/personInfo"})
			},
			getCropInfo(){
				this.$router.push({"path":"setting/enterpriseInfo"})
			},
			gotoUs(){
				this.$router.push({"path":"setting/aboutUs"})
			},
			contactCus(){
				this.$router.push({"path":"setting/contactCustomer"})
			},
			userXieYi(){
				this.$router.push({"path":"setting/uArgument"})
			},
			logout(){
				this.$router.push({"path":"login"})
			}
		}
	}
</script>

<style lang="less" scoped>
	.setting{
		.setting-top{
			height: 110px;
			background: #4F4C53;
			display: flex;
			display: -webkit-flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			color:#fff;
			padding:10px 0;
			position:relative;
			z-index:100;
			.images{
				img{
					border-radius: 50%;
				}
			}
		}
		.setting-content{
			position:absolute;
			top:130px;
			width: 100%;
			bottom: 50px;
			.list-content{
				margin:10px;
				height: 100%;
				overflow: hidden;
				.listItem{
					padding-bottom: 50px;
					.item{
					    height: 46px;
					    line-height: 44px;
					    border-radius: 5px;
					    border: 1px solid #ddd;
					    margin: 10px 0;
					    padding: 0 10px;
					    font-size: 14px;
					    color:#333;
					    .right-tips{
					    	color:#ccc;
					    	.icon-right{
						    	vertical-align: middle;
						    	fill: #ccc;
						    	margin-top:-2px;
						    }
					    }
					    
					}
					.item-logout{
						width: 40%;
					    height: 44px;
					    line-height: 44px;
					    margin: 20px auto 0;
					    display: block;
					    color: #333;
					    border: 1px solid #ddd;
					    text-align: center;
					    border-radius: 5px;
					}
				}
			}
		}
	}
</style>