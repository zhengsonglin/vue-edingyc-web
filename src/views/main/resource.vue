<template>
	<div class="resource">
		<m-header @resourceSearch="goToSearch"></m-header>
		<m-nav @reGetDatas="reGetDatas"></m-nav>
		<div class="resource-content w750">
			<div class="guide">
					<div class="item-left fl"><span class="cell-unit">(单位：万元)</span></div>
					<div class="item-right fr">
						<span class="cell-price text-right">指导价</span><span class="cell-discount text-center">优惠</span>
					</div>
			</div>
			
			<div id="dataList" class="w750">
				<div id="resourceMescroll" class="mescroll"> 
					<div class="item-list">
					<div class="item-cell" v-for="(item, index) in dataList" @click="goToDetail(item)">
						<div class="item-top" >
							<div class="cell-left">
								<img :src="getImage(item.logo)" alt="" />
							</div>
							<div class="cell-content">
								<p class="item-logo" :class="item.isTeJia?'tj-price':''"><img src="../../images/home/buins2.png" alt="" /></p>
								<p class="item-desc text-overellipsis"><span>{{item.brandName}}</span><span>{{item.modelName}}</span></p>
								<p class="item-color"><span class="inline-text">{{item.inColor}}/{{item.exColor}}</span><span class="province">省外车</span></p>
							</div>
							<div class="cell-right" :class="item.offPrice>0?'down':'up'" @click.stop="toggleShow(index)">
								<div class="guidePrice">{{item.guidePrice}}</div>
								<div class="offPrice fr offPrice-low" :class="item.offPrice>0?'':''">
									<span :class="item.offPrice>0?'down':'up'">
										<x-icon type="ios-arrow-thin-down" class="price-icon dwon" size="24" v-if="item.offPrice>0"></x-icon>
										<x-icon type="ios-arrow-thin-up" class="price-icon up" size="24" v-if="item.offPrice<0"></x-icon>{{item.offPrice}}</span>
								</div>
							</div>
						</div>
						<div class="item-bottom" :class="activeItem.index ==index && activeItem.isShow?'animate':''">
							<div class="bottom-wrap">
								<div class="item-price-left charterToSend">
									<p class="item-title">
										<span class="item-price price-up">1.67</span>
									</p>
									<p class="item-text">送到<span class="province">天津</span></p>
								</div>
								<div class="item-price-center oPrivilege">
									<p class="item-title"><span class="item-price price-up">1.67</span></p>
									<p class="item-text"><span class="cityName">天津</span>物流自提</p>
								</div>
								<div class="item-price-right handChoose">
									<p class="item-title"><span class="item-price price-up">1.95</span></p>
									<p class="item-text">店里自提(<span class="distance">2150</span>km)</p>
								</div>
							</div>		
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
	import mHeader from '@/views/header/m-header'
	import mNav from '@/views/header/m-nav'
	import 'mescroll.js/mescroll.min.css'
	import {mapGetters, mapMutations} from 'vuex'
	let MeScroll = require("mescroll")
	
	import {imageMixin} from '@/libs/mixin'
	export default {
	  mixins:[imageMixin],
	  name: 'App',
	  components:{
	  	mHeader,
	  	mNav
	  },
	  computed:{
		...mapGetters([
	    	'refreshResource'
	    ])
	  },
	  data(){
	  	return {
	  		activeItem:{
	  			isShow:false,
	  			index:''
	  		},
	  		dataList: [],
		    mescroll: null,
	  	}
	  },
	  methods:{
	  	goToSearch(){
	  		this.$router.push({"path":"resource/search"})
	  	},
	  	goToDetail(item){
	  		this.$router.push({"path":"resource/detail"})
	  	},
	  	toggleShow(num){
	  		let index = this.activeItem.index
	  		let isShow = this.activeItem.isShow
	  		
	  		if(isShow){
	  			this.activeItem.index = ''
	  			this.activeItem.isShow = false
	  		}else{
	  			this.activeItem.index = num
	  			this.activeItem.isShow = true
	  		}
	  	},
	  	reGetDatas(){
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
			this.getListDataFromNet(page.num, page.size, (curPageData)=> {
				//如果是第一页需手动制空列表 (代替clearId和clearEmptyId的配置)
				if(page.num == 1) this.dataList = [];
				
				//更新列表数据
				this.dataList = this.dataList.concat(curPageData);
				
				//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据,如果传了hasNext,则翻到第二页即可显示无更多数据.
				this.mescroll.endSuccess(curPageData.length);
			
			},()=> {
				//联网失败的回调,隐藏下拉刷新和上拉加载的状态;
				this.mescroll.endErr();
			});
		},
		getListDataFromNet(pageNum,pageSize,successCallback,errorCallback) {
			this.$http.post("/resource/data").then(res=>{
		        if("200" == res.status){
		        	successCallback&&successCallback(res.data.dataList);//成功回调
		        }else{
		        	errorCallback&&errorCallback()//失败回调
		        }
		        
		    })
		},
		...mapMutations({
	    	setRefreshResource: 'SET_REFRESH_RESOURCE'
	    })
	  },
	  mounted(){
		
		//创建MeScroll对象,down可以不用配置,因为内部已默认开启下拉刷新,重置列表数据为第一页
		//解析: 下拉回调默认调用mescroll.resetUpScroll(); 而resetUpScroll会将page.num=1,再执行up.callback,从而实现刷新列表数据为第一页;
		this.mescroll = new MeScroll("resourceMescroll", { //请至少在vue的mounted生命周期初始化mescroll,以确保您配置的id能够被找到
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
		refreshResource(newVal, oldVal){
			if(newVal){
				this.reGetDatas()
				this.setRefreshResource(false)
				
			}
		}
	  }
	}
	

</script>

<style scoped lang="less">
	@import '../../styles/transition.less';
	.resource-content{
		position:absolute;
		top:90px;
		bottom:50px;
		width:100%;
		.guide{
			line-height: 21px;
		    padding: 3px 0;
		    overflow: hidden;
		    background: #f5f5f5;
		    color: #ccc;
		    font-size: 12px;
	    	.item-left {
			  padding-left: 0.45rem;
			}
			.item-right {
		    width: 30%;
		    span {
			    width: 50%;
			    display: inline-block;
			    float: left;
				}
			} 
		}
		#dataList{
			position: absolute;
		    top: 27px;
		    bottom: 0;
		    width: 100%;
		    overflow: hidden;
			#resourceMescroll{
				overflow-x: hidden;
			}
			.item-cell:first-child {
			    border-top: 1px solid #ddd;
			}
			.item-cell{
				height:auto;
				border-bottom:1px solid #ddd;
				.item-top{
					height:3rem;
					>div{
						float: left;
						height:100%;
						display: flex;
						display: -webkit-flex;
					}
					.cell-left{
						width: 13%;
						align-items: center;
						justify-content: center;
						img{
							width: 1.46rem;
		    			height: 1.46rem;
		    			margin: 0;
		    			padding: 0;
						}
					}
					.cell-content{
						flex-direction: column;
						justify-content:space-around;
						width: 57%;
	    				color: #7B7B7B;
	    				.item-logo{
	    					height: 0.7rem;
	    					padding-left: 2rem;
	    					&.tj-price{
		    					background-image: url(../../images/home/specialPrice.png);
							    background-repeat: no-repeat;
							    background-size: auto 16px;
							    background-position: left 3px;
						    }
	    					img{
		    					height:0.7rem;
		    				}
	    				} 
	    				.item-desc{
	    					font-size: 0.65rem;
	    					color: #333;
	    				}
	    				.item-color{
	    					font-size: 0.5rem;
	    					display: flex;
	    					.inline-text{
	    						flex: 1;
	    					}
	    					.province{
	    						width:50px;
	    						display: flex;
	    						text-align: right;
							    background-size: 16px;
							    background-position: left center;
							    background-repeat: no-repeat;
							    padding-left: 20px;
							    background-image: url(../../images/home/small_car.png);
	    					}
	    				}
					}
					.cell-right{
						width: 30%;
						align-items: center;
						justify-content: center;
						font-size:.7rem;
						background-position: right bottom;
						background-repeat: no-repeat;
						background-size: 0.5rem;
						&.down{
							background-image: url(../../images/home/Shape12.png);
						}
						&.up{
							background-image: url(../../images/home/ShapeCopy9.png);
						}
						>div{
							flex: 1;
							text-align: right;
							span{
								position:relative;
								padding-left:18px;
								&.down{
									color:#03b40a;
									.price-icon {
							  		fill: #03b40a;
							  	}
								}
								&.up{
									color:#ff6757;
									.price-icon {
							  		fill: #ff6757;
							  	}
								}	
								.price-icon {
								  display: inline-block;
								  position: absolute;
								  left:0;
								  top:0;
								}
							}
							
						}
					}
				}
				.item-bottom{
					color:#03b40a;
					background: #f9f9f9;
					height: 0px;
					overflow: hidden;
					transition: height 0.8s;
					transition-delay: 0s;
					/*border-top: solid 1px #e9e9e9;*/
					&.animate{
  					height:2.5rem;
  					transition: height 0.8s;
  					border-top: solid 1px #e9e9e9;
					}
					.bottom-wrap{
						display: flex;
						justify-content:space-between;
						text-align: center;
						height: 100%;
						>div{
							flex: 1;
							display: flex;
					    flex-direction: column;
					    justify-content: center;
							.item-title{
								font-size: 0.7rem;
							}
							.item-text{
								font-size: 12px;
							}
						}
					}
				}
			}
		}
	}
	
	
</style>