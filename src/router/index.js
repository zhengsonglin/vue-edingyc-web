import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/Login'
import {routers} from './router'
import Cookies from 'js-cookie'
import Util from '../libs/util'
import store from '../store/'

Vue.use(Router)

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};
export const router = new Router(RouterConfig);

const history = window.sessionStorage;
let historyCount = history.getItem('count') * 1;

router.beforeEach((to, from, next) => {
  	const toIndex = history.getItem(to.path);
  	const fromIndex = history.getItem(from.path);

  	if (toIndex) {
	    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
	      store.commit('UPDATE_DIRECTION', {direction: 'forward'})
	    } else {
	      store.commit('UPDATE_DIRECTION', {direction: 'reverse'})
	    }
	} else {
	    ++historyCount;
	    history.setItem('count', historyCount);
	    to.path !== '/' && history.setItem(to.path, historyCount);
	    store.commit('UPDATE_DIRECTION', {direction: 'forward'})
	}

    Util.title(to.meta.title);

    //console.log(to)
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限

	   if(Cookies.get('userInfo')){	//已经登录
	   		if(to.name === 'login'){
	   			next({
		            name: 'main'
		        });
	   		}else{
	   			next()
	   		}
	   }else{
		   	next({
	            name: 'login'
	        });
	   }
    }else{	//不需要登录
    	if (to.matched.length ===0) {                                        //如果未匹配到路由
		    from.name ? next({ name:from.name }) : next('/login');   //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
		} else {
		    next();              //如果匹配到正确跳转
		}
    }
})
