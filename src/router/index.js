import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import utils from 'utils'

Vue.use(Router);

const router = new Router({
    // mode: 'history',
    base: '',
    routes: [
        {
            path: '/',
            redirect: '/dashboard',
        },
        {
            path: '/',
            component: resolve => require(['../components/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    name: 'index',
                    path: '/dashboard',
                    component: resolve => require(['../page/Dashboard.vue'], resolve),
                    meta: { title: '首页' }
                },
                
            ]
        },
        {
            // 权限页面
            path: '/permission',
            component: resolve => require(['../page/Permission.vue'], resolve),
            meta: { title: '权限测试', permission: true }
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['../page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    NProgress.start();
    if(to.meta.title) utils.setTitle(to.meta.title)
    if(to.meta.permission){
            // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
            // role === 'admin' ? next() : next('/403');
    }else{
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor'){
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        }else{
            next();
        }
    }
})

router.afterEach(() => {
    NProgress.done();
});

export default router