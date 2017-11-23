import Vue from 'vue'
// es5的写法=>var Router = require("vue-router")
// es6的写法；先到当前目录去找，如果找不到，就去node_modules中找
import Router from 'vue-router'
// 导入自己封装的组件
import layout from '../components/layout.vue';
import login from '../components/account/login.vue';
import goodslist from '../components/goods/goodslist.vue';

import goodsadd from '../components/goods/goodsadd.vue';

Vue.use(Router)
// es5的写法
// module.exports={};
// es6的写法
export default new Router({
	routes: [
		// 默认跳转的路由规则
		{ name: 'default', path: '/', redirect: '/admin' },
		// 登录
		{ name: 'login', path: '/login', component: login,meta:{nologin:true} },
		// 布局
		{
			name: 'layout', path: '/admin', component: layout,
			children: [
				// 商品列表
				{ name: 'goodslist', path: 'goodslist', component: goodslist },
				{ name: 'goodsadd', path: 'goodsadd', component: goodsadd }
			]
		}
	]
})
