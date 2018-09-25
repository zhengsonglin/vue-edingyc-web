<template>
	<div class="searchResult pageHeader">
		<x-header class="myHeader">
			<x-icon slot="overwrite-left" type="ios-arrow-back" size="32" class="icon-back" @click="$router.back()"></x-icon>
			<span slot="left" class="back-text">搜索结果</span>
		</x-header>
		
		<div class="content">
			<div id="searchMescroll" class="mescroll"> 
            	<div class="item-list">
					<div class="order-item" v-for="item in dataList" @click="linkToDetail">
						<div class="item-top">
		          			<span class="fl">{{item.time}}</span>
		          			<span class="fr">{{item.logistics}}</span>
		          		</div>
		          		<div class="item-bottom">
		          			<div class="item-content-top">
		           				<p class="section-one">
		           					<span class="resorce-title">{{item.brand +" "+item.year +"款" + item.desc}}</span>
		           					<span class="fr price">{{item.price}}</span> 
		           				</p>
		           				<p class="section-two">
		           					<span class="fl">{{item.inColor + "/" + item.exColor}}</span>
		           					<span class="user-icon">{{item.cusName}}</span>
		           					<span class="fr">{{item.state}}</span>
		           				</p>
		           			</div>
		          		</div>
					</div>
				</div>
        	</div>  
		</div>
	</div>	
</template>

<script>
	import { XHeader} from 'vux'
	import Scroll from 'base/scroll/scroll'
	let MeScroll = require("mescroll")
	
	export default{
		data(){
			return {
				dataList:[],
				mescroll: null
			}
		},
		methods:{
			upCallback(page) { //上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
				//联网加载数据
				var self = this;
				this.getListDataFromNet(page.num, page.size, (curPageData)=> {
					//curPageData=[]; //打开本行注释,可演示列表无任何数据empty的配置
					
					//如果是第一页需手动制空列表 (代替clearId和clearEmptyId的配置)
					if(page.num == 1) this.dataList = [];
					
					//更新列表数据
					this.dataList = this.dataList.concat(curPageData);
					
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
			 	this.$http.post("/order/searchDatas").then(res=>{
		          	console.log(res);
			        successCallback&&successCallback(res.data.dataList);//成功回调
			    }).catch(res=>{
			        errorCallback&&errorCallback()//失败回调
			    });
			},
			linkToDetail(){
				this.$router.push({"path":"/main/order/orderDetail"})
				//this.$router.back(-2)
			}
		},
		components:{
			XHeader,
			Scroll
		},
		mounted(){
			//创建MeScroll对象,down可以不用配置,因为内部已默认开启下拉刷新,重置列表数据为第一页
			//解析: 下拉回调默认调用mescroll.resetUpScroll(); 而resetUpScroll会将page.num=1,再执行up.callback,从而实现刷新列表数据为第一页;
			var self = this;
			self.mescroll = new MeScroll("searchMescroll", { //请至少在vue的mounted生命周期初始化mescroll,以确保您配置的id能够被找到
				up: {
					callback: self.upCallback, //上拉回调
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
			
		}
	}	
</script>

<style scoped lang="less">
	@import '../../styles/myHeader.less';
	.content{
    	position:fixed;
    	width:100%;
    	top:50px;
    	bottom:0px;
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