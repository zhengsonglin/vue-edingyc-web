<template>
	<div class="wrap">
		<footerNav></footerNav>
		<router-view></router-view>
	</div>
</template>

<script>
	import footerNav from '@/views/footerNav/footerNav'
	export default {
	  name: 'App',
	  components:{
	  	footerNav:footerNav
	  }
	}
</script>
	
<style>
	.wrap{
		width:100%;
	}
</style>