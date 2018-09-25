<template>
	<div class="order">
		<div class="searchBox">
			<div class="letf-item">
				<p class="similar-search" @click="goToSearch">
					<x-icon type="ios-search" size="20" class="icon-search"></x-icon>
					<span>订单快速搜索</span>
				</p>
				<span class="icon-msg text-center" @click="goToMessageList"><img src="../../images/order/message.png" alt="" /><badge text="8" class="myBadge"></badge></span>
			</div>
			<div class="right-item text-center" @click="toggleSwitch">
				{{swtchText}}
			</div>
		</div>
		<div class="nav-item">
		    <tab >
		      <tab-item  v-for="(item, index) in navItems" @on-item-click="onItemClick(item, index)" :selected="index===0" :class="{'vux-1px-r':index!=navItems.length-1}">{{item.text}}</tab-item>
		      <!--selected-->
		    </tab>
		</div>
		<div class="content w750">
			<div id="orderMescroll" class="mescroll"> 
            	<div class="item-list">
					<div class="order-item" v-for="item in dataList" @click="linkToDetail">
						<div class="item-top">
		          			<span class="fl">{{item.time}}</span>
		          			<span class="fr">{{item.logistics}}</span>
		          		</div>
		          		<div class="item-bottom">
		          			<div class="item-content-top">
		           				<p class="section-one">
		           					<span class="resorce-title">{{item.brand + " " + item.year+" 款 "+ item.desc}}</span>
		           					<span class="fr price">{{item.price}}</span> 
		           				</p>
		           				<p class="section-two">
		           					<span class="fl">{{item.inColor +"/" + item.exColor}}</span>
		           					<span class="user-icon">{{item.cusName}}</span>
		           					<span class="fr">{{item.state}}</span>
		           				</p>
		           			</div>
		          		</div>
					</div>
				</div>
				
        	</div>  
		</div>
		<transition name="vux-slide">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	import { Tab, TabItem, Badge } from 'vux'
	import 'mescroll.js/mescroll.min.css'
	import {mapGetters, mapMutations} from 'vuex'
	let MeScroll = require("mescroll")
	
	export default {
		data(){
			return {
				index:0,
				navItems:[
					{
						state:0,
						text:'全部订单'
					},
					{
						state:1,
						text:'待确认'
					},
					{
						state:2,
						text:'待付款'
					},
					{
						state:3,
						text:'待验收'
					},
					{
						state:4,
						text:'已完成'
					},
				],
				dataList: [],
		        mescroll: null,
		        isCompany:true
			}
		},
		computed:{
			swtchText(){
				return this.isCompany?'我的订单':'公司所有订单'
			},
			...mapGetters([
		    	'refreshOrder'
		    ])
		},
		components:{
			Tab, TabItem, Badge
		},
		methods:{
			toggleSwitch(){
				this.isCompany = !this.isCompany 
				this.reGetOrderDatas()
			},
			goToSearch(){
				this.$router.push({"path":"order/search"})
			},
			goToMessageList(){
				this.$router.push({"path":"order/message"})
			},
			onItemClick(item, index){
				if(this.index !== index){	//不等于当前索引
					this.reGetOrderDatas()
				}
				this.index = index
			},
			reGetOrderDatas(){
				this.dataList = []
				//重置列表数据
				this.mescroll.resetUpScroll();
				//隐藏回到顶部按钮
				this.mescroll.hideTopBtn();
				//回到顶部
				this.mescroll.scrollTo( 0, 0 );
			},
		    //上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
			upCallback(page) {
				//联网加载数据
				var self = this;
				this.getListDataFromNet(page.num, page.size, (curPageData)=> {
					//curPageData=[]; //打开本行注释,可演示列表无任何数据empty的配置
					
					//如果是第一页需手动制空列表 (代替clearId和clearEmptyId的配置)
					if(page.num == 1) this.dataList = [];
					
					//更新列表数据
					this.dataList = this.dataList.concat(curPageData);
					
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					//mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
					//console.log("page.num="+page.num+", page.size="+page.size+", curPageData.length="+curPageData.length+", self.dataList.length==" + self.dataList.length);
					
					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					//self.mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)
					
					//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
					//self.mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)
					
					//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
					//self.mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)
					
					//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据,如果传了hasNext,则翻到第二页即可显示无更多数据.
					this.mescroll.endSuccess(curPageData.length);
				
				}, ()=> {
					//联网失败的回调,隐藏下拉刷新和上拉加载的状态;
					this.mescroll.endErr();
				});
			},
			/*联网加载列表数据
			 请忽略getListDataFromNet的逻辑,这里仅仅是在本地模拟分页数据,本地演示用
			 实际项目以您服务器接口返回的数据为准,无需本地处理分页.
			 * */
			getListDataFromNet(pageNum,pageSize,successCallback,errorCallback) {
				this.$http.post("/order/data").then(res=>{
			        if("200" == res.status){
			        	successCallback&&successCallback(res.data.dataList);//成功回调
			        }else{
			        	errorCallback&&errorCallback()//失败回调
			        }
			        
			    })
			},
			linkToDetail(){
				this.$router.push({"path":"order/orderDetail"})
			},
			...mapMutations({
		    	setRefreshOrder: 'SET_REFRESH_ORDER'
		    })
		},
		mounted() {
			//创建MeScroll对象,down可以不用配置,因为内部已默认开启下拉刷新,重置列表数据为第一页
			//解析: 下拉回调默认调用mescroll.resetUpScroll(); 而resetUpScroll会将page.num=1,再执行up.callback,从而实现刷新列表数据为第一页;
			var self = this;
			this.mescroll = new MeScroll("orderMescroll", { //请至少在vue的mounted生命周期初始化mescroll,以确保您配置的id能够被找到
				up: {
					callback: this.upCallback, //上拉回调
					isLock:false,
					//以下参数可删除,不配置
					isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
					//page:{size:8}, //可配置每页8条数据,默认10
					toTop:{ //配置回到顶部按钮
						//src : require("../../images/order/mescroll-totop.png"), //默认滚动到1000px显示,可配置offset修改
						//html: null, //html标签内容,默认null; 如果同时设置了src,则优先取src
						//offset : 1000
					},
					empty:{ //配置列表无任何数据的提示
						warpId:"dataList",
						icon : require("../../images/order/mescroll-empty.png") , 
//						  	tip : "亲,暂无相关数据哦~" , 
//						  	btntext : "去逛逛 >" , 
//						  	btnClick : function() {
//						  		alert("点击了去逛逛按钮");
//						  	} 
					},
					htmlNodata:'<p class="upwarp-nodata">暂无数据</p>',
					//htmlLoading:'<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中666..</p>'
				},
				down:{
					offset:52
				}
			});
			
		},
		watch:{
			refreshOrder(newVal, oldVal){
				if(newVal){
					this.reGetOrderDatas()
					this.setRefreshOrder(false)
					
				}
			}
		}
	}	
	

</script>

<style scoped lang="less">
	@import '../../styles/transition.less';
	.searchBox{
		position: absolute;
		top:0;
		left:0;
		width:100%;
    	background-color: #4F4C53;
    	height: 50px;
    	z-index: 100;
    	display:flex;
    	display:-webkit-flex;
    	.letf-item{
    		flex: 1;
    		display:flex;
    		display:-webkit-flex;
    		align-items:center;
    		position:relative;
    		.similar-search{
    			flex: 1;
    			background:#fff;
    			height:34px;
    			border-radius: 4px;
    			margin-left:8px;
    			text-align: center;
			    line-height: 33px;
			    font-size: 14px;
			    color: #999;
			    .icon-search{
			    	vertical-align: middle;
			    	fill: #999;
			    }
    		}
    		.icon-msg{
    			 width: 50px;
    			 img{
    			 	width:28px;
    			 	height:28px;
    			 	vertical-align: middle;
    			 }
    			 .myBadge{
    			 	position: absolute;
    			 	right:2px;
    			 	top:2px;
    			 }
    		}
    	}
    	.right-item{
		    width: 85px;
		    color: #fff;
		    background: #202020;
		    font-size: 14px;
		    line-height: 50px;
		    padding: 0 10px;
    	}
    }	
    .nav-item{
    	position:absolute;
    	top:50px;
    	width:100%;
    	z-index:100;
    	font-size:15px;
    }
    .vux-1px-r:after{
    	height: 50%;
	    top: 25%;
	    border-right: 2px solid #C7C7C7;
    }
    
    .content{
    	position:absolute;
    	width:100%;
    	top:94px;
    	bottom:50px;
    	.item-list{
    		.order-item{
	    		.item-top{
	    			height: 28px;
				    background: #f5f5f5;
				    line-height: 28px;
				    color: #aaa;
				    font-size: 13px;
				    padding: 0 10px;
	    		}
	    		.item-bottom{
	    			.item-content-top {
					    padding: 10px 15px 5px;
					    p.section-one{
			    			font-size: 16px;
		    				width: 100%;
	    				}
	    				p.section-two{
	    					font-size: 13px;
						    text-align: left;
						    color: #7B7B7B;
						    overflow: hidden;
						    margin: 12px 0 6px;
						    position: relative;
						    .user-icon {
							    width: 80px;
							    position: absolute;
							    left: 0;
							    right: 0;
							    background: url("../../images/order/order-user.png") no-repeat left 0px;
							    background-size: 1.45em 1.45em;
							    padding-left: 1.6em;
							    margin: 0 auto;
							    white-space: nowrap;
							    overflow: hidden;
							    text-overflow: ellipsis;
							}    
	    				}
					}
					
	    		} 
	    		
    		}
    	}
    	
    }

</style>