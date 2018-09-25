<template>
	<div class="orderDetail pageHeader">
		<x-header class="myHeader">
			<x-icon slot="overwrite-left" type="ios-arrow-back" size="32" class="icon-back" @click="$router.back()"></x-icon>
			<span slot="left" class="back-text">订单详情</span>
		</x-header>
		
		
		<div class="content">
			<scroll ref="listContent"  class="list-content" :refreshDelay="100" :click="false">
				<div class="item-cells">
					<div class="slide-banner bg-banner">
						<div class="imgBox"><img src="../../images/order/order-banner-2.png"/></div>
						<div class="contentBox">
							<p class="item-title">请尽快支付订金</p>
							<p class="item-normal">请在30分钟内支付订金，否则系统会关闭订单</p>
						</div>
					</div>
					<div class="section-1">
						<div class="item-row">
							<span class="fl">2017-07-18 18:15:06</span>
							<span class="fr">广州物流自提</span>
						</div>
						 
						<group class="noTop-group">
						    <cell-box class="cell-brandInfo">
						      <p class="left-text"><span class="resorce-title">卡罗拉 17款 1.8T 双擎精英版 </span></p>
						      <p class="right-price"><span class="fr">14.98</span></p>  
						    </cell-box>
						    <cell-box class="cell-brandInfo">
						      <p class="left-text"><span class="cell-row-title">颜色:</span><span class="resorce-title">白/黑</span></p>
						      <p class="right-price"><span class="cell-row-title">指导价:</span><span class="fr">14.98万</span></p>  
						    </cell-box>
						    <cell-box class="cell-brandInfo">
						      <p class="left-text"><span class="cell-row-title">库龄:</span><span class="resorce-title">≤0个月</span></p>
						      <p class="right-price"><span class="cell-row-title">优惠价:</span><span class="fr">0.95万</span></p>  
						    </cell-box>
						    <cell-box class="cell-brandInfo">
				              <div class="weui-cell__bd">
				              	  <span class="item-tag">无保险</span>
				              	  <span class="item-tag">现车</span>
				              </div>
					        </cell-box>
					        <cell-box class="cell-brandInfo">
					            <div class="weui-cell__bd">
					              	 <span class="weui-cell__ft cell-item-title">下单人:</span><span class="">郑松林/首行郑松林</span>
					            </div>
					        </cell-box>
					          
					        <cell-box class="cell-brandInfo">
					              <div class="weui-cell__bd">
					              	 <span class="weui-cell__ft cell-item-title">订单号:</span><span class="">0102000Qy2xfRYGc</span>
					              </div>
					        </cell-box>
					        <cell-box class="cell-brandInfo" @click.stop>
					              <div class="weui-cell__bd">
					              	 <!--付订金  -->   
						            	<x-button mini type="primary" class="order-link-btn fr" @click.native="gotoOrderPay">付订金</x-button>
						            	<x-button mini plain type="warn" class="order-link-btn fr">取消订单</x-button>
					              </div>
					        </cell-box>
					         
					        <cell-box class="cell-price">
					            <div class="weui-cell__bd">
					              	<div class="weui-flex">
										<div class="weui-flex__item line">
										  	  <p class="top"><span class="h1 price-num">5000.00</span><span class="small-font">元</span></p>
										  	  <p class="bottom h5">订金金额</p>
										</div>
										<div class="weui-flex__item">
										  	  <p class="top"><span class="h1 price-num">256200</span><span class="small-font">元</span></p>
										  	  <p class="bottom h5">尾款金额</p>
										</div>
									</div>
					            </div>
					        </cell-box>
					        <cell-box class="cell-brandInfo">
				              	<div class="weui-cell__bd">
				              	  	<span class="item-tag">车身油漆费:2000元</span>
				              	</div>
					        </cell-box>  
					         
					        <cell-box class="cell-brandInfo">
					            <div class="weui-cell__bd">
					              	 <span class="weui-cell__ft cell-item-title">发票金额:</span><span class="">110000元</span>
					            </div>
					        </cell-box> 
					        
					        <cell-box class="cell-brandInfo emailAddress" is-link @click.native.prevent="orderEmailAddress">
						        <div class="weui-cell__bd" >
					              	<span>邮寄地址</span>
					            </div>   
						    </cell-box>
						    
						    <cell-box class="cell-brandInfo">
					            <div class="weui-cell__bd">
					              	 <span class="weui-cell__ft cell-item-title">保险金额:</span><span class="">0元</span>
					            </div>
					        </cell-box> 
					        <cell-box class="cell-brandInfo">
					            <div class="weui-cell__bd">
					              	 <span class="weui-cell__ft cell-item-title">发票合格证:</span><span class=""></span>
					            </div>
					        </cell-box> 
					        <cell-box class="cell-brandInfo">
					            <div class="weui-cell__bd">
					              	 <span class="weui-cell__ft cell-item-title cell-Certificate">合格证天数:</span><span class="">3~5个工作日</span>
					            </div>
					        </cell-box> 
					        <cell-box class="cell-brandInfo">
					            <div class="weui-cell__bd">
					              	 <span class="weui-cell__ft cell-item-title">车源地:</span><span class="">本省</span>
					            </div>
					        </cell-box> 
					        <cell-box class="cell-brandInfo">
					            <div class="weui-cell__bd">
					              	 <span class="weui-cell__ft cell-item-title">发货地:</span><span class="">外省</span>
					            </div>
					        </cell-box>
					        <cell-box class="cell-brandInfo">
					            <div class="weui-cell__bd">
					              	 <span class="weui-cell__ft cell-item-title cell-longTime">提车/送车时间:</span><span class=""></span>
					            </div>
					        </cell-box> 
					        <cell-box class="cell-brandInfo">
					            <div class="weui-cell__bd">
					              	 <span class="weui-cell__ft cell-item-title">声明:</span><span class=""></span>
					            </div>
					        </cell-box>
					        <cell-box class="cell-brandInfo">
					            <div class="weui-cell__bd">
					              	 <span class="weui-cell__ft cell-item-title">限制条件:</span><span class="">（客服工号6696）</span>
					            </div>
					        </cell-box>
						</group>
					</div>
					
				</div>	
			</scroll>
		</div>
		
		<x-button type="primary" link="orderDetail/orderMessage" class="fix-bottom w750">联系客服</x-button>
		
		<transition name="vux-slide">
			<router-view></router-view>
		</transition>
	</div>	
</template>

<script>
	import { XHeader, Group, CellBox, Cell } from 'vux'
	import Scroll from 'base/scroll/scroll'
	export default{
		data(){
			return {
				
			}
		},
		components:{
			XHeader,
			Group,
			CellBox,
			Cell,
			Scroll
		},
		methods:{
			orderEmailAddress(){
				this.$router.push({"path":"orderDetail/orderEmailAddress"})
			},
			gotoOrderPay(){
				this.$router.push({"path":"./orderDetail/orderPay"})
			}
			
		}
	}	
</script>

<style scoped lang="less">
	@import '../../styles/myHeader.less';
	
	.weui-flex{
		display: flex;
		.weui-flex__item{
			width:100%;
			text-align:center;
			padding: 15px 0;
			&.line{
			    border-right: 1px solid #ddd;
			}
		}
		
	}
	.content{
		position: absolute;
		top:50px;
		bottom:46px;
		overflow: hidden;
		.list-content{
			height:100%;
			.item-cells{
				padding-bottom: 30px;
			}	
		}
		.slide-banner{
			position:relative;
			.imgBox{
				img{
					max-width:100%;
					max-height:100%;
					display: block;
				}
			}
			.contentBox{
				position:absolute;
				top:0;
				left:0;
				width:100%;
				height:100%;
				display:flex;
				display:webkit-flex;
				flex-direction:column;
				color:#fff;
				justify-content: center;
				//align-items:center;
				p{
					width: 50%;
					margin-left:32px;
					&.item-title{
						font-size:19px;
					}
					&.item-normal{
						font-size:14px;
					}
				}
			}
		}
		.section-1{
			.item-row{
				height: 30px;
			    background: #f5f5f5;
			    line-height: 30px;
			    padding:0 15px;
			    color: #999;
			    font-size: 14px;
			    margin-bottom: -1.3em;
			}
			.noTop-group{
				.cell-brandInfo{
			    	justify-content: space-between;
			    	font-size:16px;
			    	height:34px;
			    	.cell-row-title{
			    		width:70px;
			    		color: #999;
			    		display: inline-block;
			    	}
			    	.item-tag {
					    min-width: 70px;
					    height: 35px;
					    background: #E6EFF5;
					    color: #6a6f7b;
					    font-size: 13px;
					    border-radius: 2px;
					    text-align: center;
					    line-height: 36px;
					    display: inline-block;
					    margin: 4px 10px 4px 0;
					    padding: 0 15px;
					  }  
					  .cell-item-title {
					    width: 70px;
					    display: inline-block;
					    text-align: left;
					    &.cell-Certificate{
					    	width: 100px;
					    } 
					    &.cell-longTime{
					    	width: 120px;
					    }
				    }
				    .order-link-btn{
				    	vertical-align: middle;
				    	margin: 0 0 0 15px;
				    }
		    	}
		    	.cell-price{
		    		color: #999;
		    		font-size:16px;
		    		padding:0 15px;
		    		.top{
		    			color: #1aad19;
		    			.price-num{
		    			    font-size:1.2rem;
			    		}
		    		}
		    	}
		    	.emailAddress{
		    		color: #31c137;
		    		&:after{
		    			border-color: #31c137;
		    		}
		    	} 
			}
			
		}
	}
	.fix-bottom{
		position:fixed;
		bottom:0;
	}
</style>