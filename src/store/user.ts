import { defineStore } from "pinia";
import { login,user} from "../api/auth";

//定义一个类型
export interface IUserState {
    //token 类型是string
    token:string;
    username:string;
    avater:string;
    permissions:string[];
    info:Object;
}

//
export const useUserStore = defineStore({
    // 定义数据
    id:'app-user',
    // 定义状态 函数形式
    state: ():IUserState => ({
        //token 请求登录返回的token 如果有token就用，如果没有token就为空
        token:localStorage.getItem('token') || '',
        //用户名
        username:'',
        //头像
        avatar:'',
        //权限
        permissions:[],
        //角色
        info:{} 
    }),
    //获取state的时候调用的方法(getters) 
    getters:{
        //token的时候调用的方法
        getToken():string {
            return this.token;
        },

        //获取头像的时候调用的方法
        getAvatar():string {
            return this.avatar;
        },

        //获取用户名的时候调用的方法
        getUserName():string {
            return this.username;
        },

        //获取权限的时候调用的方法
        getPermissions():string[] {
            return this.permissions;
        },

        //获取角色的时候调用的方法
        getUserInfo():Object{
            return this.info;
        }
    },

    //去对我们的state进行修改的时候调用的方法(actions)
    actions:{
        //
        setToken(token:string){
            //将token存储到本地
            localStorage.setItem('token', token);
            //将token存储到state中
            this.token = token;
        },

        //
        setAvatat(avatar:string){
            this.avatar = avatar;
        },

        //
        setUserInfo(info:object){
            this.info = info;
        },

        //
        setUserName(username:string){
            this.username = username;
        },

        //
        setPermissions(permissions:string[]){
           this.permissions = permissions
         },

        //login方法 
        //接收了一个userInfo是一个对象
        async login(userInfo:Object){
            try{
                //调用login方法传入userInfo，返回的是一个response对象
                const response = await login(userInfo);

                console.log(response);
                //获取response中的token
                if(response.access_token){


                    //去调用一个方法，把token存入到上方state里面的token处中
                    this.setToken(response.access_token);
                    console.log(this.token);
                    
                    //调取getuser
                    this.getUser();
                }
                //
            } catch(error){
                console.log(error);
            }
        },

        async getUser(){
            try {
                //请求user api
                const response = await user();
                //打印用户的详细信息
                console.log(response);
                //用户的信息
                this.setUserInfo(response);
                //用户的头像
                this.setAvatat(response.avatar);
                //用户的名字
                this.setUserName(response.name);
            
            } catch(error){
                console.log(error);
            }
        }
    }
})