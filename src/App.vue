<template>
  <div id="app">
  	<transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
  		<keep-alive>
    		<router-view></router-view>
    	</keep-alive>
   	</transition>
  </div>
</template>

<script>
	import { mapState} from 'vuex'
	export default {
	  	name: 'App',
			data() {
	　　　　return {
	　　　　　　
	　　　　}
	　　},
			computed:{
	      ...mapState({
	        direction: state => state.slider.direction,
	      })
	    },
	}
</script>

<style lang="less">
	@import './styles/reset.less';
	@import './styles/1px.less';
	
	#app{
		width:100%;
    height: 100%;
    max-width:750px;
    margin:0 auto;
    position: relative;
    .vux-pop-out-enter-active,
	  .vux-pop-out-leave-active,
	  .vux-pop-in-enter-active,
	  .vux-pop-in-leave-active {
	    will-change: transform;
	    transition: all 300ms;
	    height: 100%;
	    top: 0;
	    position: absolute;
	    backface-visibility: hidden;
	    perspective: 1000;
	  }
	
	  .vux-pop-out-enter {
	    opacity: 0.8;
	    transform: translate3d(-100%, 0, 0);
	  }
	
	  .vux-pop-out-leave-active {
	    opacity: 0.8;
	    transform: translate3d(100%, 0, 0);
	  }
	
	  .vux-pop-in-enter {
	    opacity: 0.8;
	    transform: translate3d(100%, 0, 0);
	  }
	
	  .vux-pop-in-leave-active {
	    opacity:0.8;
	    transform: translate3d(-100%, 0, 0);
	  }
    

	}
	
	  
</style>
