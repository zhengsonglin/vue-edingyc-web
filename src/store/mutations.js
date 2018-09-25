import * as types from './mutation-types'

const matutations = {
	[types.SET_REFRESH_RESOURCE](state, isFresh) {
		state.refreshResource = isFresh		//车源
	},
	[types.SET_REFRESH_QUOTATION](state, isFresh) {
		state.refreshQuotation = isFresh			//行情
	},
	[types.SET_REFRESH_ORDER](state, isFresh) {
		state.refreshOrder = isFresh			//订单
	},
	

}


export default matutations