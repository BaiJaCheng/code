//引入axios
import axios from "axios";
//创建axios对象
const request = axios.create({
    baseURL:'https://api.shop.eduwork.cn/', //后台要使用的接口
    timeout:8000//超时时间

})

/*request.post('/api/auth/login',{
    //如果是propms，会在url后面进行拼接
    data:{
        email:'super@a.com',
        password:'123123'
    }
})*/


//请求拦截 定义前置拦截器 在请求发送之前触发
request.interceptors.request.use((config)=>{
    //接口请求的配置信息
    let token:string = localStorage.getItem('token') || '';
    //帶著token過去請求
    if(token) {
        //接口请求的配置信息
        config.headers['Authorization']='Bearer ' + token;
    }
    return config
},(error)=>{
    //报错的时候抛出一个错误信息
    return Promise.reject(error)
})



//响应拦截
request.interceptors.response.use((response)=>{
 
    return response.data ? response.data : response;
},(error)=>{
    //
    const {response} = error;
    //根据响应状态码进行处理 肯定不是200
    switch(response.status) {

        case 401 : 
        window.$message.error('登陆失败，请重新登录')
        //清除token
        localStorage.removeItem('token');
        //延迟跳转到登录页面
        setTimeout(()=>{
            window.location.href = '/login';
        },500);
            break;

        case 404:
            window.$message.error('接口不存在')
            break;

        case 500:
            window.$message.error('网络异常')
            break;

        case 502:
            window.$message.error('网络异常')
            break;

        case 422:
            //422错误处理
            //获取错误信息 
            let msg = response.data.errors[Object.keys(response.data.errors)[0]][0]

            //显示具体错误
            window.$message.error(msg)

            // window.$message.error('参数不存在')
            break;

    }
    
    
    return Promise.reject(error)
})


//抛出request
export default request



// 获取  get
// 添加  post
// 修改  put   小范围的修改  patch
// 删除  delete

// get /api/admin/users 获取用户列表
// get /api/admin/users/：id 获取用户详情
// post /api/admin/users 添加用户
// put /api/admin/users/:id 修改用户
// delete /api/admin/users/:id 删除用户