<template>
	<div class="order-search">
		<div class="searchBox w750">
			<div class="centerbox">
				<x-icon type="ios-arrow-back" size="36" class="icon-back" @click="$router.back()"></x-icon>
				<input ref="query" class="box" placeholder="关键字" v-model="searchKey"/>
				<x-icon type="ios-close" size="26" class="icon-clear" @click="searchKey=''" v-show="searchKey.length"></x-icon>
				<span class="search-btn" @click="getOrderSearch">搜索</span>
			</div>
		</div>
		
		<div class="content">
			<div class="search-tips">
				你可以输入<span class="tips-for-key">车型描述</span>
				<span class="tips-for-key">指导价</span>和<span class="tips-for-key">客户名称</span>等信息进行搜索
			</div>
			<div class="lastSearch">
				<div class="item-title"><p>近期搜索过</p></div>
				<div class="history-items">
					<span class="item-search-tag" v-for="item in search" @click="reSetOrder">{{item}}</span>
				</div>
			</div>
		</div>
		<transition name="vux-slide">
			<router-view></router-view>
		</transition>
	</div>
	
</template>

<script>
	import {mapMutations} from 'vuex'
	export default{
		data(){
			return {
				search:['GA6 16款 1.5T', '卡罗拉 17款 1.2T 改款', '帝豪GL', 'GA6 16款 1.5T', 'GA6 16款 1.5T', 'GA7 17款 1.5T'],
				searchKey:'',
			}
		},
		methods:{
			getOrderSearch(){
				console.log(this.searchKey)
				this.$router.push({path:"search/searchResult"})
			},
			reSetOrder(){
				this.setRefreshOrder(true)	//刷新订单
				this.$router.back()
			},
			...mapMutations({
		    	setRefreshOrder: 'SET_REFRESH_ORDER'
		    })
		},
		created(){
			setTimeout(()=>{
				this.$refs.query.focus()
			},100)
		}
	}
</script>

<style scoped lang="less">
	@import '../../styles/transition.less';
	.order-search{
		position: absolute;
	    z-index: 500;
	    top: 0;
	    left: 0;
	    right:0;
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
		    	}
		    	.icon-clear{
		    		position: absolute;
				    right: 68px;
				    top: 0px;
				    bottom: 0px;
				    margin: auto;
				    fill: #ccc;
		    	}
		    	.search-btn{
		    		width: 58px;
				    color: #fff;
				    text-align: right;
		    	}
		    	
	    	}
	    }
	    .content{
	    	width: 100%;
    		position: absolute;
    		top:50px;
    		bottom: 0;
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
    		.search-tips{
			    margin-top: .77em;
			    margin-bottom: .3em;
			    padding-left: 15px;
			    padding-right: 15px;
			    color: #999;
			    font-size: 14px;
				.tips-for-key {
				    color: #1aad19;
				    margin: 0 2px;
				}    
    		}
    		
	    }
	}
</style>