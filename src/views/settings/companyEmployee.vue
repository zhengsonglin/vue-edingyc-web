<template>
	<transition name="vux-slide">
		<div class="companyEmployee pageHeader">
			<x-header class="myHeader">
				<x-icon slot="overwrite-left" type="ios-arrow-back" size="32" class="icon-back" @click="$router.back()"></x-icon>
				<span slot="left" class="back-text">公司成员</span>
			</x-header>
			
			<div class="content">
				<box gap="0 10px" class="cropName bottom-line">
			    	<flexbox justify="space-between" :gutter="0">
				      <flexbox-item :span="1/4"><div class="flex-demo"></div></flexbox-item>
				      <flexbox-item :span="1/2"><div class="flex-demo text-center">企业id：019412</div></flexbox-item>
				      <flexbox-item :span="1/4">
				      	<div class="flex-demo text-right">
				      		<x-button  type="primary" mini @click.native="addMenmber">添加成员</x-button>
				      	</div>
				      </flexbox-item>
				    </flexbox>
			    </box>
			    <box gap="0 10px" class="bottom-line">
			    	<flexbox :gutter="0">
				      <flexbox-item :span="15/100"><div class="flex-demo headpic"><img src="../../images/settings/cusLogo.jpg"/></div></flexbox-item>
				      <flexbox-item :span="32/100"><div class="flex-demo realName text-overellipsis">首行郑松林</div></flexbox-item>
				      <flexbox-item :span="16/100"><div class="flex-demo position text-center">代理人</div></flexbox-item>
				      <flexbox-item>
				      	<div class="flex-demo text-right">
				      		<!--<x-button  type="primary" mini @click.native="addMenmber">删除</x-button>-->
				      	</div>
				      </flexbox-item>
				    </flexbox>
			    </box>
			    <box gap="0 10px" class="bottom-line" v-for="item in list">
			    	<flexbox :gutter="0">
				      <flexbox-item :span="15/100"><div class="flex-demo headpic"><img src="../../images/settings/cusLogo.jpg"/></div></flexbox-item>
				      <flexbox-item :span="32/100"><div class="flex-demo realName text-overellipsis">{{item.realName}}</div></flexbox-item>
				      <flexbox-item :span="16/100"><div class="flex-demo position text-center">{{item.position}}</div></flexbox-item>
				      <flexbox-item>
				      	<div class="flex-demo text-right">
				      		<x-button  type="primary" mini @click.native="deleteMenmber">删除</x-button>
				      	</div>
				      </flexbox-item>
				    </flexbox>
			    </box>
			    
				 
			</div>
		</div>
	</transition>
</template>

<script>
	import { XHeader, Group, Flexbox, XInput, FlexboxItem } from 'vux'
	export default{
		data(){
			return {
				list:[
					{
						realName:'A一订有车～黄远健13662623516',
						position:'销售'
					},
					{
						realName:'A一订有车～李剑13662622065',
						position:'销售'
					},
					{
						realName:'A一订有车～黄远健13662623516',
						position:'销售'
					},
					{
						realName:'A一订有车～黄远健13662623516',
						position:'销售'
					}
				]
			}
		},
		methods:{
			addMenmber(){
				this.$vux.toast.show({
				 	text: '无权限操作',
				 	type:'warn'
				})
			},
			deleteMenmber(){
				// 显示
				this.$vux.toast.show({
				 	text: '无权限操作',
				 	type:'warn'
				})
			}
		},
		components:{
			XHeader,
			Group,
			XInput,
			Flexbox,
			FlexboxItem
		}
	}
</script>

<style scoped lang="less">
	@import '../../styles/myHeader.less';
	@import '../../styles/transition.less';
	
	.flex-demo {
	  /*text-align: center;
	  color: #fff;
	  background-color: #20b907;
	  border-radius: 4px;
	  background-clip: padding-box;*/
	}
	.content{
		.cropName{
			//padding:8px 0;
		}
		.headpic{
			position: relative;
			img{
				width: 32px;
			    height: 32px;
			    border-radius: 100%;
			    position:absolute;
			    left:0;
			    right:0;
			    top:0;
			    bottom:0;
			    margin:auto;
			}
		}
		.bottom-line{
			border-bottom:1px solid #ccc;
			padding:9px 0;
		}
	}
</style>