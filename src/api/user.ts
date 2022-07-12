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
