
import Vue from 'vue'
import App from './App.vue'
import router from './router'
//  导入vue的一个组件库:element-ui
import elementUI from 'element-ui';

// import 'element-ui/lib/theme-chalk/index.css';
// import 'element-ui/lib/theme-default/index.css'
// 导入默认样式(由于咱们自己修改了样式所以要替换默认样式)
import '../static/theme_rms/index.css';
import '../static/css/site.css';
// 绑定到vue中
Vue.use(elementUI);

import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

// 引入axios文件
import axios from 'axios';
// 让axios成为共有 文件--组件中的所有ajax请求都可以使用
Vue.prototype.$ajax = axios;
// 设置路径 ---组件中的所有ajax请求的路径都可以使用
axios.defaults.baseURL = 'http://127.0.0.1:8899';
// 配置axios在请求数据服务接口的时候，允许cookie凭证
axios.defaults.withCredentials = true;
// 6 在vue-router对象上添加一个全局守卫，在任何组件渲染出来之前都需要先执行这个守卫函数
router.beforeEach((to, from, next) => {
    // to和from的格式：{
    //     name:  代表的是当前路由规则对象的名字
    //     path:  代表的是当前路由规则对象的路径
    //     meta: 代表程序员在定义路由规则对象的时候，手动添加的  meta:{} 对象
    // console.log(to);
    // console.log(from);
    // 判断如果进入的是登录页面，由于登录的路由规则上有一个  meta:{nologin:true} 而其他规则上没有
    // 所以可以判断 to.meta.nologin 的值如果是为true则跳过登录检查，否则进入登录检查
    if (to.meta.nologin) {
        next();
    } else {
        axios.get(" /admin/account/islogin").then(res => {
            if(res.data.code == "nologin"){
                /* 表示没有登录，则跳转登录页面 */
                router.push({name:'login'})
            }else{
                next();//一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用来渲染结果。
            }
        })
    }
})


//设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    //1--调用函数的方式创建  一步到位 
    render: create => create(App),
    // 2---调用组件的方式创建 
    // template: '<App/>',
    // components: { App }
})
