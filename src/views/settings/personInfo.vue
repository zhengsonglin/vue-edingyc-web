<template>
	<transition name="vux-slide">
		<div class="personInfo pageHeader">
			<x-header class="myHeader">
				<x-icon slot="overwrite-left" type="ios-arrow-back" size="32" class="icon-back" @click="$router.back()"></x-icon>
				<span slot="left" class="back-text">个人信息</span>
			</x-header>
			
			<div class="content">
				<div class="itembox">
					<div class="item-cell" @click="gotoPersonPhoto">
						<div class="left">头像</div>
						<div class="right">
							<img src="../../images/home/nickName.jpg" alt="" />
							<x-icon type="ios-arrow-right" size="20" class="icon-right"></x-icon>
						</div>
					</div>
					<div class="item-cell" @click="gotoSetUserName">
						<div class="left">名字</div>
						<div class="right">
							<span>张三</span>
							<x-icon type="ios-arrow-right" size="20" class="icon-right"></x-icon>
						</div>	
					</div>
					<div class="item-cell" @click="gotoSex">
						<div class="left">性别</div>
						<div class="right">
							<span>男</span>
							<x-icon type="ios-arrow-right" size="20" class="icon-right"></x-icon>
						</div>	
					</div>
					<div class="item-cell">
						<div class="left">地区</div>
						<div class="right">
							<span>广东 深圳</span>
							<x-icon type="ios-arrow-right" size="20" class="icon-right"></x-icon>
						</div>	
					</div>
					<div class="item-cell">
						<div class="left">个性签名</div>
						<div class="right">
							<span>暗影流光</span>
							<x-icon type="ios-arrow-right" size="20" class="icon-right"></x-icon>
						</div>	
					</div>
					<div class="item-cell">
						<div class="left">我的地址</div>
						<div class="right">
							<x-icon type="ios-arrow-right" size="20" class="icon-right"></x-icon>
						</div>	
					</div>
				</div>
			</div>
			
			<transition name="vux-slideUp">
				<router-view></router-view>
			</transition>
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
		},
		methods:{
			gotoPersonPhoto(){
				this.$router.push({"path":"personInfo/personPhoto"})
			},
			gotoSex(){
				this.$router.push({"path":"personInfo/sex"})
			},
			gotoSetUserName(){
				this.$router.push({"path":"personInfo/personName"})
			}
		}
	}	
</script>

<style scoped lang="less">
	@import '../../styles/myHeader.less';
	@import '../../styles/transition.less';
	.content{
		.itembox{
			.item-cell{
				display: flex;
				display: -webkit-flex;
				align-items:center;
				justify-content:space-between;
				border-bottom:1px solid #ddd;
				padding: 6px 10px;
				line-height: 40px;
				.right{
					display: flex;
					display: -webkit-flex;
					align-items: center;
					span{
						color:#999;
					}
					img{
						width:40px;
						height:40px;
					}
					.icon-right{
						margin-left:6px;
					}
				}
			}
		}
	}
</style>