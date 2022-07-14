import { NIcon } from "naive-ui"
import { h } from "vue"
import {Component} from '@vue/runtime-core'
 
 export const renderIcon = (icon:Component) : Component =>{
    return ()=>h(NIcon,null,{default:()=> h(icon)  })
 }


 //递归数组菜单模式
 export function generatorMenu(routerMap:Array<any>) {
    //routerMap 按照 sort 排序
     routerMap.sort((a,b) => a.meta.sort - b.meta.sort)
     // let permission = ['users','goods','dashboard','order']
    console.log(routerMap);
    //处理数据结构   map代表里面的数据 有几个循环几次
    let result = routerMap.map((item)=>{
        //判断 item.name是否存在permission中,如果不存在就跳过
        // if(!permission.includes(item.name)){
        //     console.log(123123123);
        //     console.log(item.name);
        //     console.log(123213213)
        //     return null
        // }

        //定义一个新的数据结构
        let menu = {
            label:item?.meta?.title,
            key:item?.name,
            icon:item?.meta?.icon
        }   //判断是否有子路由 有的话就进行递归
        if(item.children && item.children.length > 1) {
            //递归  返回一个children
            menu.children = generatorMenu(item.children);
            //在判断如果有children但是只有一个就让他的name
        }else if (item.children &&item.children.length === 1) {
            menu.key = item?.children[0].name;
        }

        return menu
    })
     // 取出result null
     return  result = result.filter(item=>item)



    

    //result就是处理后的数据结构
    // console.log(result);
    
 }