<template>
	<div class="resourceDetail pageHeader w750">
		<x-header class="myHeader">
			<x-icon slot="overwrite-left" type="ios-arrow-back" size="32" class="icon-back" @click="$router.back()"></x-icon>
			<span slot="left" class="back-text">车源详情</span>
		</x-header>
		
		
		<div class="content">
			<scroll ref="listContent"  class="list-content" :refreshDelay="100" :click="false">
				<div class="box-content">
					<div class="release-time">
						<span class="fl">已发布0天12小时34分</span><span class="fr">指导价</span>
					</div>
					<div class="item-celle strong">
						<span class="fl">雷凌 17款 1.2T 改款 185T CVT自动精英版</span><span class="fr">12.68</span>
					</div>
					<div class="item-celle">
						<p class="clearfix"><span class="fl"><span class="title">颜色：</span>珍珠白/黑</span><span class="fr">发货地: 本省</span></p>
					</div>
					<div class="item-celle">
						<p class="clearfix"><span class="fl"><span class="title">库龄：</span>3个月</span><span class="fr">车源地: 本省</span></p>
					</div>
					<div class="item-celle item-tagWrap">
						<span class="source-tag">特价车</span><span class="source-tag">现车</span>
					</div>
					<div class="item-celle marginTop5">
						<span class="fl bold">下单计算器</span><span class="fr">我在：<i class="fa fa-map-marker map"> </i> <span class="map"> 深圳市</span></span>
					</div>
					<div class="item-celle strong flexItem">
						<div class="rightline strong"><strong>总计</strong></div>
						<div class="rightItem paddingleft10">24.95万（总优惠：3.73万元）</div>
					</div>
					<div class="item-celle flexItem">
						<div class="rightline">运费</div>
						<div class="rightItem">
							<p class="price-tag moreRow" :class="{'actived':item.isActive}" v-for="(item, index) in logistics" @click="checkRoute(index)">
								<span class="tagTop">{{item.title}}</span><span class="tagPrice">{{item.price}}</span>
							</p>
						</div>
					</div>
					<div class="item-celle flexItem">
						<div class="rightline moreRow servicePrice" >垫资</br>服务费</div>
						<div class="rightItem">
							<p class="paddingleft10"><span>600元</span><span>全款垫付, 点我更优惠</span></p>
						</div>
					</div>
					<div class="item-celle flexItem">
						<div class="rightline">服务费</div>
						<div class="rightItem paddingleft10">0元</div>
					</div>
					<div class="item-celle flexItem">
						<div class="rightline">车架</div>
						<div class="rightItem paddingleft10">11.63万</div>
					</div>
					<div class="lineTitle">
						<p>注意: 以上计价价格不包含保险费用</p>
					</div>
					<div class="item-celle noRight">
						<p class="clearfix"><span class="fl"><span class="title">发票金额：</span>约116300元</span></p>
					</div>
					<div class="item-celle noRight">
						<p class="clearfix"><span class="fl"><span class="title">订金：</span>5000元</span></p>
					</div>
					<div class="item-celle noRight">
						<p class="clearfix"><span class="fl"><span class="title">合格证天数：</span>3~5个工作日</span></p>
					</div>
					<div class="item-celle noRight">
						<p class="clearfix "><span class="fl"><span class="title">保险类型：</span>无</span></p>
					</div>
					<div class="item-celle noRight">
						<p class="clearfix"><span class="fl"><span class="title">保险返点：</span>0%</span></p>
					</div>
					<div class="item-celle noRight">
						<p class="clearfix"><span class="fl"><span class="title">限制条件：</span>无</span></p>
					</div>
				</div>
			</scroll>
		</div>
		
		<x-button type="primary" class="fix-bottom w750">下单</x-button>
	</div>	
</template>

<script>
	import { XHeader } from 'vux'
	import Scroll from 'base/scroll/scroll'
	
	export default{
		data(){
			return {
				logistics:[
					{title:"送到天津", price:"3100元", isActive:true},
					{title:"天津物流自提", price:"3100元", isActive:false},
					{title:"店内自提", price:"0元(2150km)", isActive:false},
				]
				
			}
		},
		methods:{
			checkRoute(index){
				this.logistics.forEach((item, num, arrs)=>{
					arrs[num].isActive = index == num
				})
			}
		},
		components:{
			XHeader,
			Scroll
		}
	}
</script>

<style scoped lang="less">
	@import '../../styles/myHeader.less';
	.content{
		position: absolute;
		top:50px;
		bottom:46px;
		width: 100%;
		overflow: hidden;
		.list-content{
			height:100%;
		}
	}
	.box-content{
		font-size: 13px;
		padding-bottom:60px;	
		.release-time{
			height: 28px;
		    background: #f5f5f5;
		    line-height: 28px;
		    color: #aaa;
		    padding: 0 10px;
		}
		.item-celle{
			height: 1.5rem;
			line-height: 1.5rem;
			border-bottom: 1px solid #e6e6e6;
			padding: 0 10px;
			background: #fff;
			&.strong{
				font-weight: bold;
				color: #000;
			}
			&.item-tagWrap{
				display: flex;
				align-items: center;
				border-bottom: 8px solid #eee;
				.source-tag{
					background:#5ACDB5;
					margin-right: 10px;
					width:2.3rem;
					color:#fff;
				    height: 1rem;
				    line-height: 1rem;
				    text-align: center;
				}
			}
			&.marginTop5{
				margin-top:5px;
				.bold{
					font-weight: bold;
				}
				.map{
					color: #5ACDB5;
				}
			}
			&.flexItem{
				display: flex;
				height: auto;
				.paddingleft10{
					padding-left: 0.4rem;
					display: inline-block;
				}
				.moreRow{
					line-height:0.7rem;
				}
				.rightline{
					/*width:70px;*/
					flex-basis: 2.3rem;
					display: flex;
    				align-items: center;
					border-right:1px solid #ddd;
					color:#999;
				}
				.rightItem{
					flex:1;
					display: flex;
					align-items: center;
					.price-tag{
						margin:0.4rem 0 0.4rem 0.4rem;
						display: flex;
						flex-direction: column;
						background:#ddd;
						padding:0.25rem 0.35rem;
						text-align: center;
						border: 2px solid #ddd;
						position: relative;
						&.actived{
							background: #fff;
	    					border: 2px solid #31c137;
	    					&:after{
	    						content: "√";
							    background: #31c137;
							    display: block;
							    height: 10px;
							    width: 10px;
							    color: white;
							    position: absolute;
							    bottom: 0;
							    right: 0;
							    font-size: 12px;
							    line-height: 12px;
	    					}
						}
					}
				}
			}
			&.noRight .title{
				display: inline-block;
				width: 80px;
			}
		}
		.title{
			color:#999;
		}
		.servicePrice{
			padding:0.2rem 0;
		}
		strong, .strong{
			color:#000;
		}
		.lineTitle{
			background: #eee;
			 p{
				padding-left:3rem;
				letter-spacing: 1px;
				line-height: 1.5rem;
			}
		}
	}
	.fix-bottom{
		position:fixed;
		bottom:0;
	}
</style>