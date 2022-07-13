import request from "@/utils/request"   //引入request;

export function  slides(params: any) {
    return request(
        {
            url:'/api/admin/slides',
            method:'GET',
            params 
        }
    )
}


export function addSlides(data){
    return request({
        url:'/api/admin/slides',
        method:'POST',
        data
    })
}