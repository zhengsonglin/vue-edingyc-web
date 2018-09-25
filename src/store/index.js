
import Vue from 'vue';
import  Vuex from 'vuex';

Vue.use(Vuex);

import state from './state'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'
import slider from './modules/slider'

export default new Vuex.Store({
	state,
  	actions,
  	getters,
  	mutations,
	modules:{
	    slider: slider
	},
});
