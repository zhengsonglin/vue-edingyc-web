<template>
	<div class="depositReceipt pageHeader">
		<x-header class="myHeader">
			<x-icon slot="overwrite-left" type="ios-arrow-back" size="32" class="icon-back" @click="$router.back()"></x-icon>
			<span slot="left" class="back-text">定金回单</span>
		</x-header>
		
		<div class="content">
			<div class="section-img">
				<img src="../../images/order/order-pay-bg.png" alt="" />
			</div>
			<div class="section-payInfo">
				<p class="pay-title">上传汇款单</p>
				<p class="pay-derc">线下汇款后，拍照上传汇款单即可完成支付</p>
				<h3 class="pay-strong">如果分多笔汇款, 请上传多张回单</h3>
			</div>
			<div class="section-payMoney">
				<p class="text-center item1"><span class="h5">金额:</span><span class="rect1-price">￥5000.0</span></p>
			</div>
			<box gap="10px 3%">
				<div class="fileWrap weui-btn fix-bottom weui-btn_primary">
					<p>上传回单</p>
					<input type="file" class="fileBtn weui-btn fix-bottom weui-btn_primary">
				</div>
			</box>
		</div>
	</div>
</template>

<script>
	import { XHeader, Box} from 'vux'
	export default{
		data(){
			return {
				
			}
		},
		components:{
			XHeader,
			Box
		}	
	}	
</script>

<style scoped lang="less">
	@import '../../styles/myHeader.less';
	@import '../../styles/transition.less';
	
	.section-img{
		width: 92%;
    	margin: 20px auto 0;
    	position: relative;
    	border: 1px solid #ddd;
    	min-height: 5rem;
    	img{
    		max-width: 100%;
		    border: 0;
		    display: block;
		    vertical-align: middle;
    	}
	}
	.section-payInfo{
		text-align: center;
		.pay-title{
			margin: 0.5rem 0;
		}
		.pay-derc{
			color: #7B7B7B;
    		font-size: 14px;
		}
		.pay-strong{
			margin: 0.5rem 0;
		}
	}
	.section-payMoney{
		.item1 span {
		    vertical-align: middle;
		    margin: 0 5px;
		    &.rect1-price {
			    color: #31c137;
			    font-size: 2rem;
			}    
		}
	}
	.fileWrap{
		position: relative;
		.fileBtn{
			position: absolute;
			left:0;
			top:0;
			width:100%;
			z-index: 10;
			opacity: 0;
		}
	}
</style>