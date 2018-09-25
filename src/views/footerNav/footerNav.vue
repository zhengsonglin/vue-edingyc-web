<template>
	<div class="footer w750">
		<tabbar  v-model="currIndex">
	      <tabbar-item :link="{path:'/main/resource'}" >
	        <img slot="icon" :src="getNavPic('price', 0)">
	        <span slot="label">明码标价</span>
	      </tabbar-item>
	      <tabbar-item :link="{path:'/main/quotation'}">
	        <img slot="icon" :src="getNavPic('quotation', 1)">
	        <span slot="label">历史行情</span>
	      </tabbar-item>
	      <tabbar-item  badge="2"  :link="{path:'/main/order'}">
	        <img slot="icon" :src="getNavPic('price', 2)">
	        <span slot="label">订单</span>
	      </tabbar-item>
	      <tabbar-item  show-dot :link="{path:'/main/setting'}">
	        <img slot="icon" :src="getNavPic('setting', 3)">
	        <span slot="label">设置</span>
	      </tabbar-item>
	    </tabbar>
	</div>
</template>

<script>
	import {Tabbar, TabbarItem} from 'vux'
	export default {
	  name: 'footerNav',
	  components:{
	  	Tabbar,
    	TabbarItem
	  },
	  data(){
	  	return {
	  		currIndex:''
	  	}
	  },
	  computed:{
	  	
	  },
	  methods:{
	  	getNavPic(pic, num){
	  		if(this.currIndex == num){
	  			return require('../../images/home/nav/'+pic+'-active.png')
	  		}
	  		return require("../../images/home/nav/"+pic+"-default.png")
	  	},
	  	setIndex(){
	  		let path = this.$route.path;
		  	if(path.includes("resource")){
		  		this.currIndex = 0
		  	}else if(path.includes("quotation")){
		  		this.currIndex = 1
		  	}else if(path.includes("order")){
		  		this.currIndex = 2
		  	}else if(path.includes("setting")){
		  		this.currIndex = 3
		  	}else{
		  		this.currIndex = 0
		  	}
	  	}
	  	
	  },
	  created(){
	  	this.setIndex()
	  },
	  watch:{
	  	'$route':'setIndex'
	  }
	}
</script>

<style lang="less" scoped>
	.footer{
		position:fixed;
		width:100%;
		bottom:0;
		z-index:100;
	}
</style>