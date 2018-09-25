<template>
	<div class="message pageHeader">
		<x-header class="myHeader">
			<x-icon slot="overwrite-left" type="ios-arrow-back" size="32" class="icon-back" @click="$router.back()"></x-icon>
			<span slot="left" class="back-text">消息中心</span>
		</x-header>
		
		<div class="content w750">
			<div id="msgMescroll" class="mescroll"> 
            	<div class="item-list">
            		<div class="msg-item" v-for="item in msgDataList">
            			<div class="msg-item-top"><p class="brandInfo text-overellipsis">{{item.brand +" " +item.year +"款 " + item.desc}}</p><span class="right-price">{{item.price}}</span></div>
            			<div class="msg-item-center"><span class="left-tips fl">{{item.tips1}}</span><span class="right-date fr">{{item.time}}</span></div>
            			<div class="msg-item-bottom"><p class="left-content text-overellipsis">{{item.tips2}}</p><span class="right-text">{{item.linkText}}</span></div>
            		</div>	
            	</div>
            </div>	
		</div>
	</div>	
</template>

<script>
	import { XHeader} from 'vux'
	import 'mescroll.js/mescroll.min.css'
	
	let MeScroll = require("mescroll")
	
	export default{
		data(){
			return {
		        msgMescroll: null,
				msgDataList:[]
			}
		},
		components:{
			XHeader
		},
		methods:{
			 //上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
			upCallback: function(page) {
				//联网加载数据
				let self = this;
				this.getMsgListDataFromNet(page.num, page.size, (curPageData)=> {
					//curPageData=[]; //打开本行注释,可演示列表无任何数据empty的配置
					
					//如果是第一页需手动制空列表 (代替clearId和clearEmptyId的配置)
					if(page.num == 1) this.msgDataList = [];
					
					//更新列表数据
					this.msgDataList = this.msgDataList.concat(curPageData);
					
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					//mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
					//console.log("page.num="+page.num+", page.size="+page.size+", curPageData.length="+curPageData.length+", self.msgDataList.length==" + self.msgDataList.length);
					
					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					//self.mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)
					
					//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
					//self.mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)
					
					//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
					//self.mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)
					
					//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据,如果传了hasNext,则翻到第二页即可显示无更多数据.
					this.msgMescroll.endSuccess(curPageData.length);
				
				}, ()=> {
					//联网失败的回调,隐藏下拉刷新和上拉加载的状态;
					this.msgMescroll.endErr();
				});
			},
			/*联网加载列表数据
			 请忽略getMsgListDataFromNet的逻辑,这里仅仅是在本地模拟分页数据,本地演示用
			 实际项目以您服务器接口返回的数据为准,无需本地处理分页.
			 * */
			getMsgListDataFromNet(pageNum,pageSize,successCallback,errorCallback) {
				this.$http.post("/order/messageData").then(res=>{
			        if("200" == res.status){
			        	successCallback&&successCallback(res.data.dataList);//成功回调
			        }else{
			        	errorCallback&&errorCallback()//失败回调
			        }
			        
			    })
			}
		},
		mounted: function() {
			//创建MeScroll对象,down可以不用配置,因为内部已默认开启下拉刷新,重置列表数据为第一页
			//解析: 下拉回调默认调用mescroll.resetUpScroll(); 而resetUpScroll会将page.num=1,再执行up.callback,从而实现刷新列表数据为第一页;
			let self = this;
			self.msgMescroll = new MeScroll("msgMescroll", { //请至少在vue的mounted生命周期初始化mescroll,以确保您配置的id能够被找到
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
						warpId:"msgDataList",
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
		position: fixed;
	    width: 100%;
	    top: 50px;
	    bottom: 0px;
	    .item-list{
	    	.msg-item{
	    		padding: 15px;
    			position: relative;
    			border-bottom: 1px solid #ddd;
    			.msg-item-top{
    				display:flex;
    				display:-webkit-flex;
    				margin-bottom: 5px;
    				.brandInfo{
    					flex: 1;
    				}
    				.right-price{
    					display:flex;
    					display:-webkit-flex;
    					width:76px;
    					justify-content: flex-end;
    				}
    			}
    			.msg-item-center, .msg-item-bottom{
    				color:#999;
    				overflow:hidden;
    				font-size:13px;
    			}
    			.msg-item-bottom{
    				display:flex;
    				display:-webkit-flex;
    				margin-top: 5px;
    				.left-content{
    					flex: 1;
    				}
    				.right-text{
    					display:flex;
    					display:-webkit-flex;
    					width:76px;
    					justify-content: flex-end;
    				}
    			}
	    	}
	    }
	}
</style>