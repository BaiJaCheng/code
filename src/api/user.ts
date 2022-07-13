import request from "@/utils/request";

/**
 * 
 * @description: 用户列表
 * @params: params
 */
export function users(params: any) {
    return request(
        {
            url:'/api/admin/users',
            method:'GET',
           params 
        }
    )
}

//添加用户
export function addUser(data){
    return request({
        url:'/api/admin/users',
        method:'POST',
        data
    })
}


//编辑用户id
export function getUserInfo(userid){
    return request({
        url:`/api/admin/users/${userid}`,
        method:'GET'

    })
}



export function updateUser(userid,data){
    return request({
        url:`/api/admin/users/${userid}`,
        method:'PUT',
        data
    })
}