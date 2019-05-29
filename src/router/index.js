import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/schmanage'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/schmanage',
                    component: resolve => require(['../components/page/Schmanage.vue'], resolve),
                    meta: { title: '学校管理' }
                },
                {
                    path: '/addschool',
                    component: resolve => require(['../components/page/AddSchool.vue'], resolve),
                    meta: { title: '新增学校' }
                },
                {
                    path: '/articlemanage',
                    component: resolve => require(['../components/page/ArticleManage.vue'], resolve),
                    meta: { title: '文章管理' }
                },
                {
                    path: '/fastencoding',
                    component: resolve => require(['../components/page/FastenCoding.vue'], resolve),
                    meta: { title: '编辑文章' }
                },
                {
                    path: '/videomanage',
                    component: resolve => require(['../components/page/VideoManage.vue'], resolve),
                    meta: { title: '视频管理' }
                },
                {
                    path: '/imgmanage',
                    component: resolve => require(['../components/page/ImgManage.vue'], resolve),
                    meta: { title: '图片管理' }
                },
                {
                    path: '/rightmanage',
                    component: resolve => require(['../components/page/RightManage.vue'], resolve),
                    meta: { title: '权限管理' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
