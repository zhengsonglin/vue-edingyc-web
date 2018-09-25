<template>
	<!--车源搜索-->
	<div class="resource-search w750">
		<div class="searchBox w750">
			<div class="centerbox">
				<x-icon type="ios-arrow-back" size="36" class="icon-back" @click="$router.back()"></x-icon>
				<input ref="query" class="box" placeholder="1198 或卡罗拉1198" v-model="rSearchKey"/>
				<x-icon type="ios-close" size="26" class="icon-clear" @click="clearSearch" v-show="rSearchKey.length"></x-icon>
			</div>
		</div>
		
		<div class="content">
			<div class="lastSearch">
				<div class="item-title"><p>近期搜索过</p></div>
				<div class="history-items">
					<span class="item-search-tag" v-for="item in search" @click="reSetResource">{{item}}</span>
				</div>
			</div>
			<div class="recommend">
				<div class="item-title"><p>你还可以搜索</p></div>
				<div class="recommend-items">
					<span class="item-tag" v-for="item in recommend" @click="reSetResource">{{item}}</span>
				</div>
			</div>
			
			<div class="search-result" v-show="rSearchKey.length">
				<scroll ref="listContent"  class="list-content"  :data="dataList">
					<ul>
						<li v-for="(item, index) in dataList" class="item-cell" @click="reSetResource">
							<span class="fl">{{item.brandName + " "  + item.modelName}}</span>
							<span class="fr">{{item.guidePrice}}</span>
						</li>
					</ul>
					<loading v-if="!dataList.length" title="搜索中..."></loading>
				</scroll>	
			</div>
		</div>
	</div>
	
</template>

<script>
	import Scroll from 'base/scroll/scroll'
	import Loading from 'base/loading/loading'
	import {mapMutations} from 'vuex'
	
	export default{
		components:{
			Scroll,
			Loading
		},
		data(){
			return {
				search:['威朗 18款 1.5L 三厢自动进取型 14.69', '卡罗拉 17款 1.2T 改款 11.98', 'IX25 17款 1.4T 自动智能型 14.28'],
				recommend:['1198', 'GS4', '卡罗拉1198', '轩逸1378', '雅阁'],
				rSearchKey:'',
				dataList:[]
			}
		},
		methods:{
			getResourceSearch(rSearchKey){
				if(rSearchKey.length){
					this.dataList = []
					this.$http.post("/resource/search").then(res=>{
			          	console.log(res);
				       this.dataList = res.data.dataList
				    }).catch(res=>{
				    	this.dataList = []
				        console.log("err")
				    });
			    }
			},
			clearSearch(){
				this.rSearchKey = ''
				this.dataList = []
			},
			reSetResource(){
				this.setRefreshResource(true)	//刷新行情
				this.$router.back()
			},
			...mapMutations({
		    	setRefreshResource: 'SET_REFRESH_RESOURCE'
		    })
		},
		created(){
			setTimeout(()=>{
				this.$refs.query.focus()
			},100)
			this.$watch('rSearchKey', this.util.debounce((newQuery) => { // 节流
		        this.getResourceSearch(newQuery) // 将 query 暴露给外部
		    }, 400))
		}
	}
</script>

<style scoped lang="less">
	.resource-search{
		position: absolute;
	    z-index: 500;
	    top: 0;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    background: #fff;
		width: 100%;
		height: 100%;
		.searchBox{
			position: absolute;
			top:0;
			left:0;
			right:0;
			width:100%;
	    	background-color: #4F4C53;
	    	height: 50px;
	    	z-index: 100;
	    	.centerbox{
	    		margin: 0 15px 0 5px;
			    display: flex;
			    display: -webkit-flex;
			    justify-content: center;
			    align-items: center;
			    height: 100%;
		    	.box{
		    		width: 100%;
				    padding: 6px 12px;
				    font-size: 14px;
				    line-height: 1.42857143;
				    color: #555;
				    background-color: #fff;
				    background-image: none;
				    border: 1px solid #ccc;
				    border-radius: 4px;
				    outline:none;
		    	}
		    	.icon-clear{
		    		position: absolute;
				    right: 22px;
				    top: 0px;
				    bottom: 0px;
				    margin: auto;
				    fill: #ccc;
		    	}
	    	}
	    }
	    .content{
	    	width: 100%;
    		position: absolute;
    		top:50px;
    		bottom:0;
    		font-size: 14px;
    		.item-title(){
				color: #999;
				padding:0 15px;
				p{
					border-bottom: 1px solid #ddd;
					line-height: 45px;
					height: 36px;
				}
			}
    		.lastSearch{
    			.item-title();
    			.history-items{
    				display: flex;
				    flex-wrap: wrap;
				    padding: 10px 0;
	    			.item-search-tag {
					    max-width: 100%;
					    height: 35px;
					    background: #f2f2f2;
					    color: #6a6f7b !important;
					    font-size: 13px;
					    border-radius: 2px;
					    text-align: center;
					    line-height: 36px;
					    display: block;
					    float: left;
					    margin: 0 10px 10px 0;
					    padding: 0 10px;
					}
				}
    		}
    		.recommend{
			    margin-top: .77em;
			    margin-bottom: .3em;
			    padding-left: 15px;
			    padding-right: 15px;
			    color: #999;
			    font-size: 14px;
				.item-title{
					border-bottom: 1px solid #ddd;
					line-height: 30px;
				}  
				.recommend-items{
					padding:15px 0;
					display: flex;
				    -ms-flex-wrap: wrap;
				    flex-wrap: wrap;
					.item-tag{
    					background: #5ACDB5;
    					padding:5px 10px;
    					margin:0 20px 20px 0;
    					color:#fff;
					}
				} 
    		}
    		.search-result{
    			position: absolute;
    			top:0;
    			bottom: 0;
    			width: 100%;
    			background: #fff;
    			.list-content{
    				height:100%;
    				overflow:hidden;
    				li.item-cell{
	    				height: 2rem;
	    				line-height: 2rem;
	    				padding:0 15px;
	    				font-size:14px;
	    				border-bottom: 1px solid #ddd;
	    				list-style: none;
	    			}
    			}
    			
    		}
	    }
	}
</style>