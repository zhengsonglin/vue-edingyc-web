<template>
	<div class="quotation w750">
		<div class="searchBox w750">
			<div class="centerbox">
				<input ref="query" class="box" placeholder="搜索车型" readonly @click="goToSearch"/>
				<x-icon type="ios-search" size="20" class="icon-search"></x-icon>
			</div>
		</div>
		<div class="content w750">
			<div class="model">
				<p>卡罗拉 17款 1.2T 改款CVT GL</p>
			</div>
			<div class="scroll-box">
				<scroll ref="listContent"  class="list-content"  :data="chartLineSettings.rows" :refreshDelay="1000">
					<loading v-if="!chartLineData.columns " ></loading>
					<div class="chartBox" v-if="chartLineData.columns && chartLineData.columns.length">
						<ve-line :data="chartLineData" :settings="chartLineSettings"></ve-line>
						
						<ve-pie :data="chartPieData" :settings="chartPieSettings"></ve-pie>
					</div>
				</scroll>
			</div>
		</div>
		<transition name="vux-slide">
			<router-view></router-view>
		</transition>
		
	</div>
</template>

<script>
	import VeLine from 'v-charts/lib/line.common'
	import VePie from 'v-charts/lib/pie.common.js'
	import Scroll from 'base/scroll/scroll'
	import Loading from 'base/loading/loading'
	import {mapGetters, mapMutations} from 'vuex'
	
	export default {
		computed:{
			...mapGetters([
		    	'refreshQuotation'
		    ])
		},
		data(){
			this.chartLineSettings = {
		        metrics: ['访问用户', '下单用户'],
		        dimension: ['日期']
		    }
			this.chartPieSettings = {
		        limitShowNum: 5
		    }
			return {
				/*
				chartLineData: {
		          columns: ['日期', '访问用户', '下单用户'],
		          rows: [
		            { '日期': '1', '访问用户': 32371, '下单用户': 19810 },
		            { '日期': '2', '访问用户': 12328, '下单用户': 4398 },
		            { '日期': '3', '访问用户': 92381, '下单用户': 52910 },
		            { '日期': '4', '访问用户': 32371, '下单用户': 19810 },
		            { '日期': '5', '访问用户': 12328, '下单用户': 4398 },
		            { '日期': '6', '访问用户': 92381, '下单用户': 52910 },
		            { '日期': '7', '访问用户': 32371, '下单用户': 19810 },
		            { '日期': '8', '访问用户': 12328, '下单用户': 4398 },
		            { '日期': '9', '访问用户': 92381, '下单用户': 52910 }
		          ]
		       },
		       chartPieData:{
		          columns: ['日期', '访问用户'],
		          rows: [
		            { '日期': '1/1', '访问用户': 1393 },
		            { '日期': '1/2', '访问用户': 3530 },
		            { '日期': '1/3', '访问用户': 2923 },
		            { '日期': '1/4', '访问用户': 1723 },
		            { '日期': '1/5', '访问用户': 3792 },
		            { '日期': '1/6', '访问用户': 4593 }
		          ]
		       }
		       */
		      chartLineData: {},
		      chartPieData: {}
			}
		},
		methods:{
			goToSearch(){
				this.$router.push({"path":"quotation/search"})
			},
			async getQuotationData(){
				this.chartLineData = {}
				this.chartPieData = {}
				await this.$http.post("/quotation/data").then(res=>{
					console.log(res.data.dataObj)
			        this.chartLineData = res.data.dataObj.chartLineData
			        this.chartPieData = res.data.dataObj.chartPieData
			    }).catch(res=>{
			        console.log(res)
			    });
			},
			...mapMutations({
		    	setRefreshQuotation: 'SET_REFRESH_QUOTATION'
		    })
		},
		components:{
			VeLine,
			VePie,
			Scroll,
			Loading
		},
		created(){
			this.getQuotationData()
		},
		watch:{
			refreshQuotation(newVal, oldVal){
				if(newVal){
					this.getQuotationData().then(()=>{
						this.setRefreshQuotation(false)
					})
					
				}
			}
		}
		
	}
</script>

<style lang="less" scoped>
	@import '../../styles/transition.less';
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
    		margin:0 20px 0 10px;
	    	.box{
	    		height:30px;
	    		border-radius: 4px;
	    		margin:9px 0;
	    		background: #fff;
	    		width: 100%;
	    		border: 1px solid #ccc;
	    		outline: none;
	    		padding-left:10px;
	    	}
	    	.icon-search{
	    		position: absolute;
	    		top:16px;
	    		right:15px;
	    		fill: #666;
	    	}
    	}
    }
    .content{
    	width: 100%;
    	position: absolute;
    	top:50px;
    	bottom:50px;
    	.scroll-box{
    		position:absolute;
    		top:50px;
    		bottom:0;
    		width:100%;
    		
    	}
    	.model{
    		background: #f8f8f8;
		    height: 46px;
		    line-height: 46px;
		    padding:0 10px;
		    position: relative;
    		z-index: 10;
    	}
    	.list-content{
    		height:100%;
    	}
    	.chartBox{
    		margin:10px 0;
    	}
    }
</style>