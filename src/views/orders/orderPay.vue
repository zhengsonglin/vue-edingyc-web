<template>
	<transition name="vux-slide">
		<div class="orderPay pageHeader">
			<x-header class="myHeader">
				<x-icon slot="overwrite-left" type="ios-arrow-back" size="32" class="icon-back" @click="$router.back()"></x-icon>
				<span slot="left" class="back-text">订单支付</span>
			</x-header>
			
			<div class="content">
				<group class="noTop-group">
      				<cell>
      					<span slot="title" class="sameCss title">订单金额</span>
      					<span slot="value" class="sameCss value">需支付:<span class="money">5000元</span></span>
      				</cell>
      				<cell is-link @click.native="payUnderline">
      					<div slot="title" class="baseItem">
      						<div class="left-item card"></div>
      						<div class="right-item">
      							<p class="top">线下支付</p>
      							<p class="bottom">线下汇款，然后提供回单截图</p>
      						</div>
      					</div>
      				</cell>
      				<cell is-link>
      					<div slot="title" class="baseItem">
      						<div class="left-item wechatpay"></div>
      						<div class="right-item">
      							<p class="top">微信支付</p>
      							<p class="bottom">仅安装微信6.0.2 及以上版本客户端使用</p>
      						</div>
      					</div>
      				</cell>
      			</group>	
			</div>
			
			<transition name="vux-slide">
				<router-view></router-view>
			</transition>
		</div>
	</transition>	
</template>

<script>
	import { XHeader, Group, Cell } from 'vux'
	export default{
		data(){
			return {
				
			}
		},
		components:{
			XHeader,
			Group,
			Cell
		},
		methods:{
			payUnderline(){
				this.$router.push({"path":"orderPay/depositReceipt"})	
			}
		}
	}	
</script>

<style scoped lang="less">
	@import '../../styles/myHeader.less';
	@import '../../styles/transition.less';
	.orderPay{
		.content{
			.noTop-group{
				margin-top:-20px;
				span.sameCss{
					font-size:14px;
					color:#999;
					.money{
						color: #FF5722;
					}
				}
				.baseItem{
					display: flex;
					align-items:center;
					.left-item{
						width:35px;
						height:35px;
						background-image: url("../../images/order/home-pay-icon.png");
						background-repeat:no-repeat;
						background-size:35px;
						&.card{
							background-position:0 0;
						}
						&.wechatpay{
							background-position: 0 -140px;
						}
					}
					.right-item{
						height:48px;
						display: flex;
						flex-direction: column;
						font-size:14px;
						justify-content: center;
						margin-left:10px;
						.top{
							height:24px;
							line-height: 24px;
						}
						.bottom{
							color: #848689;
							height:24px;
							line-height: 24px;
						}
					}
				}
			}	
		}
	}
</style>