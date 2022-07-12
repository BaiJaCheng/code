import { NIcon } from "naive-ui"
import { h } from "vue"
import {Component} from '@vue/runtime-core'
import { isTemplateNode } from "@vue/compiler-core"
 
 export const renderIcon = (icon:Component) : Component =>{
    return ()=>h(NIcon,null,{default:()=> h(icon)  })
 }


 //递归数组菜单模式
 export function generatorMenu(routerMap:Array<any>) {
    //routerMap 按照 sort 排序
     routerMap.sort((a,b) => a.meta.sort - b.meta.sort)

    console.log(routerMap);
    //处理数据结构   map代表里面的数据 有几个循环几次
    let result = routerMap.map((item)=>{
        console.log(item);
        //定义一个新的数据结构 
        let menu = {
            label:item?.meta?.title,
            key:item?.name,
            icon:item?.meta?.icon
        }   
        if(item.children && item.children.length > 1) {
            //递归
            menu.children = generatorMenu(item.children);
        }
        console.log(menu,'menu');
        return menu
    })
    return result;

    

    //result就是处理后的数据结构
    console.log(result);
    
 }