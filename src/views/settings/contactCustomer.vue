<template>
	<transition name="vux-slide">
		<div class="contactCustomer pageHeader">
			<x-header class="myHeader">
				<x-icon slot="overwrite-left" type="ios-arrow-back" size="32" class="icon-back" @click="$router.back()"></x-icon>
				<span slot="left" class="back-text">联系客服</span>
			</x-header>
			
			<div class="content">
				<div class="phoneBox">
					<div class="left-img">
						<img src="../../images/settings/mobile.png"/>
					</div>
					<div class="right-text">
						<p class="bTitle">客服热线0755-66861616</p>
						<p class="sMsg">工作日9:00-19:00非工作日10:00-18:30</p>
					</div>
					<div class="right-icon">
						<x-icon type="ios-arrow-right" size="24" class="icon-right"></x-icon>
					</div>
				</div>
			</div>
		</div>
	</transition>	
</template>

<script>
	import { XHeader} from 'vux'
	import Icon from 'vue-awesome/components/Icon'
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
	
	.contactCustomer{
		.phoneBox{
			display:flex;
			display:-webkit-flex;
			padding:6px 0;
			.left-img{
				width: 40px;
            	display: flex;
            	align-items:center;
            	justify-content: center;
            	img{
            		width:20px
            	}
			}
			.right-text{
	            display: flex;
	            flex: 1;
	            flex-direction:column;
	            .bTitle{
	            	font-size:14px;
	            }
	            .sMsg{
	            	font-size: 12px;
				    color: #aaa;
	            }
	        }
			.right-icon{
				width: 30px;
				display: flex;
            	align-items:center;
            	justify-content: space-around;
            	.icon-right{
			    	fill: #ccc;
			    }
			}
		}
	}	
</style>