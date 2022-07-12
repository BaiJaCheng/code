import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/login/index.vue";



//相当于我们把他们合并成了一个大的数组 
// 创建路由器实例，并且配置路由规则 
const modules = import.meta.globEager('./modules/**/*.ts');
// console.log(modules);
const routeModuleList : RouteRecordRaw[] = [];
//遍历路由模块
Object.keys(modules).forEach((key)=>{
    const mod = modules[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routeModuleList.push(...modList);
})
console.log(routeModuleList,'routeModuleList');



// import dashboard from "@/router/modules/dashboard";
// import user from "@/router/modules/user";
// import order from "@/router/modules/order";
//
export const routes = [
    { path: '/',
     component: Home
    },

    { path: '/login',
     component: Login,
     name:'login',
     meta:{
        title:'登录'
     }
    },


]

//解构路由
const baseRoutes = [...routes,...routeModuleList]
console.log(baseRoutes);


//逐个抛出
 const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes:baseRoutes, // short for `routes: routes`
})

//設置導航首位
router.beforeEach((to,from,next)=>{
    console.log(to,from);
    console.log(to.meta.title);
    //修改頁面標題  判断是否有title 如果有就修改 沒有就
    document.title = (to?.meta?.title as string) || document.title;
    //進行判斷如果进入的不是登录页面并且还没有token 就强制让他进入登录页面
    //如果进入的不是登陆页面
    if(to.name !== 'login'){
        //并且还没有toke
        if(!localStorage.getItem('token')){
            next({
                //跳转到login页面
                path:'/login',
                query:{
                    redirect:to.fullPath,
                }
            })
        }
    }
    next();
})

//判断如果地址栏的参数里面存在redirect 就跳转到redirect，如果不存在就跳转到首页

//判断如果存在redirect

//将routeModuleList抛出去
export {routeModuleList}
export default router
