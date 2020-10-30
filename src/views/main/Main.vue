<template>
	<div class="wrap">
		<footer-nav></footer-nav>
		<router-view></router-view>
	</div>
</template>

<script>
	import FooterNav from '../footerNav/footerNav'
	export default {
	  name: 'main',
	  components:{
	  	FooterNav
	  }
	}
</script>

<style>
	.wrap{
		width:100%;
	}
</style>
