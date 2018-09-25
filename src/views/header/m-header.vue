<template>
	<div class="m-header w750">
	    <div class="bg-logo">
	    	<div class="searchBox">
	    		<input ref="query" class="box" placeholder="快速搜车源" readonly @click="goToSearch"/>
	    		<x-icon type="ios-search" size="20" class="icon-search"></x-icon>
	    	</div>
	    </div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			goToSearch(){
				this.$emit("resourceSearch")
			}
		}
	}
</script>

<style lang="less" scoped>
	.m-header{
		width:100%;
  		height:50px;
  		position:absolute;
  		top:0;
  		left:0;
  		right: 0;
  		.bg-logo{
  			height: 100%;
		    padding-left: 100px;
		    background-color: #4F4C53;
  			background-image: url("../../images/home/logo.png");
  			background-repeat: no-repeat;
		    background-size: 100px 100%;
		    background-position: left center;
		    .searchBox{
		    	height:100%;
		    	margin: 0 24px 0 10px;
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
	}
</style>