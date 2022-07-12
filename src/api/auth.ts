import request from "../utils/request"



export function login(data:Object){
    return request(
        {
            url:'/api/auth/login',
            method:'post',
            data,
        }
    )
}


//得到用户信息
export function user(){
    return request(
        {
            url:'/api/admin/user',
            method:'GET'
        }
    )
}

//退出登录
export function logout(){
    return request(
        {
            url:'/api/auth/logout',
            method:'post'
        }
    )

}
