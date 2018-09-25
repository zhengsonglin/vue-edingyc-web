export const imageMixin = {
	computed:{
		
	},
	methods:{
		getImage(name){
	  		return require('../images/carLogo/'+name+".jpg")
	  	},
	}
}	