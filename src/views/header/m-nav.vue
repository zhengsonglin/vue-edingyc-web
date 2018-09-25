<template>
	<div id="nav" class="w750">
		<ul>
			<li class="nav-li" :class="[item.className, {'line':item.hasLine}]" v-for="(item, index) in navList">
				<div @click="setNavPanel(item, index)" :class="{'active':item.isActive}">
					<p class="wrapNav text-overellipsis" :test="item.iconActive">{{item.value || item.text}}
						<x-icon type="ios-arrow-down" class="icon-nav"  size="16" v-show="!item.iconActive"></x-icon>
						<x-icon type="ios-arrow-up" class="icon-nav active" size="16" v-show="item.iconActive"></x-icon>
					</p>
				</div>
			</li>
			
		</ul>
		
		<div class="content w750" :class="{'active':show}">
			<!--<transition-group name="slideDefine" tag="div"></transition-group>-->
				<div key="brand" class="panel-nav brandGroup" :class="{'active':brandPanel.showSub}" v-show="brandPanel.show || brandPanel.showSub">
			    	<scroll ref="brandScroll"  class="list-content" :data="brandList.sortData" >
			    		<ul>
			    			<li class="first" v-show="brandList.sortData.length">
			    				<p class="active" @click="clearSelect(0)">全部品牌</p>
			    			</li>
			    			<li class="title" v-show="brandList.sortData.length"><p>常用品牌</p></li>
			    			<li class="normal-item">
			    				<p class="single-item" v-for="(item, index) in brandList.commonData" @click="getSamllBrandlInfo(item)">
			    					<img :src="getImage(item.logo)"/><span>{{item.name}}</span>
			    				</p>
			    			</li>
			    			<template v-for="(data, index) in brandList.sortData">
			    				<li class="title"><p>{{data.title}}</p></li>
			    				<li class="normal-item">
				    				<p class="single-item" v-for="(item, n) in data.items" @click="getSamllBrandlInfo(item)">
				    					<img :src="getImage(item.logo)"/><span>{{item.name}}</span>
				    				</p>
				    			</li>
			    			</template>
			    		</ul>
			    		<loading v-if="!brandList.sortData.length"></loading>
			    	</scroll>
			    	<scroll ref="subBrand"  class="list-content list-model" :data="subBrandList">
			    		<ul>
			    			<template v-for="(obj, index) in subBrandList">
				    			<li class="title"><p>{{obj.title}}</p></li>
				    			<li class="normal-item">
				    				<p class="single-item" v-for="(item, n) in obj.items" @click="checkedSubBrand(item)"><span>{{item.name}}</span></p>
				    			</li>
			    			</template>
			    		</ul>
			    		<loading v-if="!subBrandList.length"></loading>
			    	</scroll>
			    	
			    </div>
			
			    <div class="panel-nav modelPanel" v-show="ModelPanelShow">
			    	<scroll ref="modelScroll"  class="list-content" :data="modelList" >
			    		<ul>
			    			<li class="first" v-show="modelList.length">
			    				<p @click="clearSelect(1)">
			    					<x-icon type="ios-checkmark-empty" class="icon-checked" size="42" v-show="!navList[1].isActive"></x-icon>全部车型
			    				</p>
			    			</li>
			    			<template v-for="(obj, index) in modelList">
				    			<li class="title"><p>{{obj.title}}款</p></li>
				    			<li class="normal-item">
				    				<p class="single-item" v-for="(item, n) in obj.items" @click="checkedModel(item)">
				    					<x-icon type="ios-checkmark-empty" class="icon-checked" size="42" v-show="initLastChecked(1, item.desc)"></x-icon><span>{{item.brand}} {{item.year}}款 {{item.desc}}</span>
				    				</p>
				    			</li>
			    			</template>
			    		</ul>
			    		<loading v-if="!modelList.length"></loading>
			    	</scroll>	
			    </div>
			    
			    <div class="panel-nav colorPanel" v-show="colorPanelShow">
			    	
			    	<scroll ref="listContent"  class="list-content" :click="false">
			    		<div >
					    	<ul>
					    		<li class="first">
					    			<p @click="clearSelect(2)">
					    				<x-icon type="ios-checkmark-empty" class="icon-checked" size="42" v-show="!navList[2].isActive"></x-icon>全部颜色
					    			</p>
					    		</li>
					    		<li class="normal-item">
					    			<p @click="showPopupPicker = true">
					    				<x-icon type="ios-checkmark-empty" class="icon-checked" size="42" v-show="navList[2].isActive"></x-icon>其它颜色
					    			</p>
					    		</li>
					    	</ul>
					    	<popup-picker  :data="colorList" :columns="2" show-name :show.sync="showPopupPicker" @on-change="checkedColor"></popup-picker>
					    </div>
				    </scroll>
			    	
			    	
			    </div>
			    
			    <div class="panel-nav morePanel" v-show="morePanelShow">
			    	
			    	<scroll ref="listContent"  class="list-content" :click="false">
			    		<div>	
				    		<ul>
					    		<li class="title"><p>保险</p></li>
					    		<li class="normal-item">
					    			<checker v-model="insurance" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
								        <checker-item :value="item" v-for="(item, index) in insuranceList" :key="index">{{item.value}}</checker-item>
								    </checker>
					    		</li>
					    		<li class="title"><p>特价车</p></li>
					    		<li class="normal-item">
					    			<checker v-model="specialPrice" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
								        <checker-item :value="item" v-for="(item, index) in specialPriceList" :key="index">{{item.value}}</checker-item>
								    </checker>
					    		</li>
					    	</ul>
					    	<x-button mini type="primary" class="more-panel-ok" @click.native="checkedMore">确定</x-button>
				    	</div>
			    	</scroll>
			    	
			    </div>	
		</div>
	</div>
</template>

<script>
	import Scroll from 'base/scroll/scroll'
	import Loading from 'base/loading/loading'
	import {PopupPicker, Checker, CheckerItem} from 'vux'
	
	import {imageMixin} from '@/libs/mixin'
	export default{
		mixins:[imageMixin],
		data(){
			return {
				navList:[
					{index:'0', text:'品牌', isActive:false, iconActive:false, hasLine:true, value:'', className:'brand'},
					{index:'1', text:'车型', isActive:false, iconActive:false, hasLine:true, value:'', className:'model'},	
					{index:'2', text:'颜色', isActive:false, iconActive:false, hasLine:true, value:'', className:'color'},	
					{index:'3', text:'更多筛选', isActive:false, iconActive:false, hasLine:false, value:'', className:'more'}	
				],
				show:false,
				brandPanel:{
					show:false,
					showSub:false,
				},
				ModelPanelShow:false,	//车型面板
				colorPanelShow:false,	//颜色面板
				morePanelShow:false,	//更多筛选
				brandList:{
					commonData:[],
					sortData:[]
				},		//原生品牌列表
				subBrandList:[],		//车辆品牌
				modelList:[],		//车型列表
				colorList:[],	//颜色列表
				showPopupPicker:false,
				insurance:{key: '0',value: '全部'},	//保险
				insuranceList:[
					{key: '0',value: '全部'},
					{key: '1',value: '不看带保险'},
					{key: '2',value: '只看带保险'}
				],
				specialPrice:{key: '0',value: '全部'},	//特价
				specialPriceList:[
					{key: '0',value: '全部'},
					{key: '1',value: '不看特价车'},
					{key: '2',value: '只看特价车'}
				]
			}          
		},
		computed:{
			brandIconAction(){
				return this.navList[0].iconActive
			},
			modelIconActive(){
				return this.navList[1].iconActive
			},
			colorIconActive(){
				return this.navList[2].iconActive
			},
			moreIconActive(){
				return this.navList[3].iconActive
			}
		},
		components:{
			Scroll,
			Loading,
			PopupPicker,
			Checker, 
			CheckerItem
		},
		methods:{
			setNavPanel(item, index){
				let lastClickIndex, continueRun = true;
				if(!this.show){
					console.log("由关到开")
					this.navList.forEach((curNav, num, navList)=>{
						if(index ==1){
							if(!navList[0].isActive){
								this.$vux.alert.show({
								  title: '提示',
								  content: '请选择品牌',
								})
								continueRun = false
							}
							
						}else if(index >1){
							if(!navList[1].isActive){
								this.$vux.alert.show({
								  title: '提示',
								  content: '请选择品牌,车型',
								})
								continueRun = false
							}
						}
						navList[num].iconActive = (continueRun && index == num)
					})
					if(!continueRun) return continueRun
				}else{
					console.log("由开到关")
					let openNav = this.navList.filter((curNav, num, navList)=>{
						return curNav.iconActive == true
					})
					let lastOpenIndex = openNav[0].index
						lastClickIndex = lastOpenIndex
					
					if(index == lastOpenIndex){
						this.navList.forEach((curNav, num, navList)=>{
							navList[num].iconActive = false
						})
						
					}else{
						this.navList.forEach((curNav, num, navList)=>{
							navList[num].iconActive = num == index
						})
					}
				}
				if(!this.show){	//由关到开
					this.show = true
				}else{	
					if(index == lastClickIndex){//由开到关
						this.show = false
					}else{//由开到开
						
					}
	
				}
				
			},
			getBrandList(){
				this.$http.post("/resource/brandList").then(res=>{
					this.brandList.commonData = res.data.dataList.commonData
					this.brandList.sortData = this._normalizeBrand(res.data.dataList.sortData, "groupName", "asc")
					this.$nextTick(()=>{
						this.$refs.brandScroll.scrollTo(0, 0)
					})
				})
			},
			getSubBrandList(){
				this.$http.post("/resource/suBrandList").then(res=>{
					this.subBrandList = res.data.dataList.slice(0)
				})
			},
			getModelList(){
				this.modelList = []
				this.$http.post("/resource/modelList").then(res=>{
					this.modelList = this._normalizeBrand(res.data.dataList.slice(0), 'year', "desc")
					this.$nextTick(()=>{
						this.$refs.modelScroll.scrollTo(0, 0)
					})
				})
			},
			getColorList(){
				
				this.$http.post("/resource/colorList").then(res=>{
					let datas = res.data.dataList.slice(), result = []
					datas.forEach((item, index, arrs)=>{
						let excolor = arrs[index].excolor, len = excolor.length
						
						arrs[index].excolor = this.util.getRandomFromArray(excolor, Math.max(1,Math.floor( Math.random()*len)) , false)
						let pMap = {
							name : item.incolor,
							value : item.incolor,
							parent : '0'
						}
						result.push(pMap)
						
						arrs[index].excolor.forEach((sItem)=>{
							let map ={
								name : sItem,
								value : sItem,
								parent : item.incolor
							}
							result.push(map)
						})
					})
					this.colorList = result
				})
			},
			getSamllBrandlInfo(item){
				this.subBrandList = []
				this.brandPanel.showSub = true
				this.getSubBrandList()
			},
			initLastChecked(num, desc){
				let val = this.navList[num].value
				if(val.length){
					return val.substring(val.length-3, val.length-1) == desc.substring(desc.length-3, desc.length-1)
				}
				return false
			},
			baseChecked(n){
				this.navList[n].iconActive = false
				this.navList[n].isActive = true
				this.show = false	
			},
			checkedSubBrand(item){
				this.navList[0].value = item.name
				this.baseChecked(0)
				this.$emit("reGetDatas")
			},
			checkedModel(item){
				this.navList[1].value = item.year +"款"+ item.desc
				this.baseChecked(1)	
				this.$emit("reGetDatas")
			},
			checkedColor(item){
				this.navList[2].value = item.join("/")
				this.baseChecked(2)	
				this.$emit("reGetDatas")
			},
			checkedMore(){
				this.baseChecked(3)
				if(this.insurance.key =='0' && this.specialPrice.key =='0'){
					this.navList[3].isActive = false
				}
				this.$emit("reGetDatas")
			},
			clearSelect(n){
				if(this.navList[n].isActive){
					this.$emit("reGetDatas")
				}
				this.navList.forEach((item, index, arrNav)=>{
					if(index >= n){
						if(n !=2){
							arrNav[index].iconActive = false
							arrNav[index].isActive = false
							arrNav[index].value = ''
							if(index == 3){
								this.insurance = {key: '0',value: '全部'}		//保险 
								this.specialPrice = {key: '0',value: '全部'}	//特价
							}
						}else{
							arrNav[n].iconActive = false
							arrNav[n].isActive = false
							arrNav[n].value = ''
						}
					}
				})
				this.show = false	
				
			},
			_normalizeBrand(list, groupKey, sortType = "asc") {//数据列表, 分组的key值, 升序或降序
				let map = {}
		        list.forEach((item, index) => {
		          const key = item[groupKey]
		          if (!map[key]) {
		            map[key] = {
		              title: key,
		              items: []
		            }
		          }
		          map[key].items.push(item)
		        })
		       
		        // 为了得到有序列表，需要处理 map
		        let ret = []
		        for (let key in map) {
		            ret.push(map[key])
		        }
		        ret.sort((a, b) => {
		        	if(sortType == "asc"){
		        		return a.title.charCodeAt(0) - b.title.charCodeAt(0)
		        	}else if(sortType == "desc"){
		        		return true //b.title.charCodeAt(0) - a.title.charCodeAt(0)
		        	}
		          
		        })
		        return ret
		    },
		  
		},
		watch:{
			brandIconAction(newVal, oldVal){
				if(!newVal){
					this.brandPanel.show = false
					this.brandPanel.showSub = false
				}else{
					this.brandPanel.show = true
					this.$refs.brandScroll.scrollTo(0, 0)
					if(this.brandList.sortData.length == 0){
						this.getBrandList()
					}
				}
			},
			modelIconActive(newVal, oldVal){
				this.ModelPanelShow = newVal
				if(newVal){
					this.getModelList()
				}
			}, 
			colorIconActive(newVal, oldVal){
				this.colorPanelShow = newVal
				if(newVal){
					this.getColorList()
				}
			}, 
			moreIconActive(newVal, oldVal){
				this.morePanelShow = newVal
			}
		},
		mounted(){
			
		}
	}
</script>

<style lang="less">
	li{list-style: none;}
	#nav{
		position: absolute;
	  	top: 50px;
	  	width: 100%;
		height: 40px;
		box-shadow: 0 0 10px 0 rgba(155,143,143,0.6);
	  	-webkit-box-shadow: 0 0 10px 0 rgba(155,143,143,0.6);
	  	background: #fff;
		>ul{
			clear:both;
			li{
				float: left;
				text-align: center;
				font-size: 14px;
				height: 66px;
	  			line-height: 40px;
	  			position:relative;
				&.brand{
					width:16%;
				}
				&.model{
					width:38%;
				}
				&.color{
					width:23%;
				}
				&.more{
					width:23%;
				}
				&.line{
					&:after{
						content: "";
					    position: absolute;
					    right: 0;
					    top: 10px;
						width: 0px;
					    height: 20px;
					    border-right: 1px solid #ccc;
					}
				}
				>div{
					position: relative;
					&.active{
						color:#09BB07;
						.icon-nav{
							fill:#09BB07;
						}
					}
					.wrapNav{
						padding-right: 14px;
    					display: inline-block;
    					position: relative;
    					max-width: 76%;
						.icon-nav{
							position: absolute;
							right: 0;
							top:14px;
							vertical-align: middle;
						    margin-top: -2px;
						    &.active{
						    	fill:#09BB07;
						    }
						}
					}
				}
			}
		} 
		.content{
			position: fixed;
			top:90px;
			width: 100%;
			bottom: 100%;
			z-index: 10;
    		border-top: 1px solid #ddd;
    		overflow:hidden;
    		&.active{
    			bottom: 50px;
    		}
    		.panel-nav{
    			position: absolute;
			    top: 0;
			    left:0;
			    bottom: 0;
			    background: pink;
			    width:100%;
			    .list-content{
			    	height: 100%;
			    	background: #fff;
			    	overflow: hidden;
			    	li{
			    		&.title{
			    			background: #eee;
			    		}
			    		&.normal-item{
			    			padding:0;
			    		}
			    		p{
			    			border-bottom:1px solid #ddd;
			    			height:2rem;
			    			line-height: 2rem;
			    			padding:0 1.4rem;
			    			position: relative;
			    			.icon-checked{
			    				position: absolute;
							    top: 0;
							    left: 0;
							    bottom: 0;
							    margin: auto;
							    fill:#09BB07;
			    			}
			    		}
			    	}	
			    }
    		}
    		.brandGroup{
    			width: 200%;
			    &.active{
			    	left:-100%;
			    	transition: all .2s linear; 
			    }
			    .list-content{
			    	width: 50%;
			    	float: left;
			    	li p img{
		    			width:1.4rem;
		    			vertical-align: middle;
						margin-right:6px;
			    	}
			    }
    		}
    		.modelPanel{
    			.list-content{
			    	width: 100%;
			    }		
    		}
    		.colorPanel li p{
    			
    		}
    		.morePanel{
    			.more-panel-ok{
    				margin:2rem auto 0;
    				display: block;
    			}
    		}
		}
	}
	
	/*单选按钮*/
	.demo1-item {
	    border: 1px solid #09BB07;
	    padding: 2px 10px;
	    margin: 11px 0 12px 20px;
	}
	.demo1-item-selected {
	  background:#09BB07;
	  color:#fff;
	}

	
	.slideDefine-enter-active, .slideDefine-leave-active {
	  transition: all 0.5s;
	  transform: translate3d(0, 0, 0)
	}
	.slideDefine-enter, .slideDefine-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  transform: translate3d(0, -100%, 0)
	}
</style>