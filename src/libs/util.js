let util = {
	getRandomFromArray(arr, len, isRepeat){// 数组，长度， 是否可重复
	    let shuffled = arr.slice(0), l = shuffled.length, result =[]
	
	    for(let n=0;n<len; n++){
	
	        if(isRepeat){   //可重复
	            let r = Math.floor(Math.random(l)*10)
	            result.push(shuffled[r])
	        }else{
	            let r = Math.max(0, Math.floor(Math.random()*shuffled.length) - 1)
	            result.push(shuffled.splice(r, 1).toString())
	        }
	    }
	
	    return result
	},
	isIphoneX: function() {
	  	return /iphone/gi.test(navigator.userAgent) && (screen.height === 812 && screen.width === 375)
	},
	getRandomIntInclusive: function(min, max) {
	  	min = Math.ceil(min)
	  	max = Math.floor(max)
	  	return Math.floor(Math.random() * (max - min + 1) + min)
	},
	shuffle: function(arr) {
		let _arr = arr.slice() // 复制数组
		for (let i = 0; i < _arr.length; i++) {
		    let j = getRandomIntInclusive(0, i)
		    let temp = _arr[i]
		    _arr[i] = _arr[j]
		    _arr[j] = temp
		}
		return _arr
	},
	// debounce 的参数是一个函数，返回的也是一个函数，而 $watch 就是 watch 这个返回后的函数，因为 watch 的回调函数是有参数的，这个参数就是这个 ...args，这样 debounce 的参数函数在通过计时器延时执行的时候，也可以访问到这个 args 了。
	debounce: function (func, delay) {
	  let timer
	  return function (...args) {
	    if (timer) {
	      clearTimeout(timer)
	    }
	    timer = setTimeout(() => {
	      func.apply(this, args)
	    }, delay)
	  }
	},
	
};

util.title = function (title) {
    title = title || '一订有车';
    window.document.title = title;
};

export default util;