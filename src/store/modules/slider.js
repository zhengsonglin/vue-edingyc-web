const slider = {
	state : {
	  direction: 'forward',
	},
	getters : {
 
	},
	mutations : {
	  UPDATE_DIRECTION(state,payload) {
	    state.direction = payload.direction
	  },
	}
}

export default slider
