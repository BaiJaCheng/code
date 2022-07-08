<template>
  <div class="view-account">
    <div class="view-account-header"></div>
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-logo m-0">
          <img class="m-auto" src="~@/assets/images/logo.png" alt="" />
        </div>
      </div>
      <div class="view-account-form">

<!-- 组件-->
        <n-form
            ref="formRef"
            label-placement="left"
            size="large"
            :model="formInline"
            :rules="rules"
        >
          <n-form-item path="username">
            <n-input v-model:value="formInline.username" placeholder="请输入用户名">
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <PersonOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
                v-model:value="formInline.password"
                type="password"
                showPasswordOn="click"
                placeholder="请输入密码"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <LockClosedOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item>
<!--            loading 显示加载状态 就是我们点击登录了以后他会进入加载状态 不可以再次进行点击了-->
            <n-button type="primary"  @click="handleSubmit" size="large" :loading="loading" block>
              登录
            </n-button>
          </n-form-item>

        </n-form>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
  import {reactive,ref,onMounted} from "vue";
  import { PersonOutline,LockClosedOutline  } from "@vicons/ionicons5";
  import {useUserStore} from "../../store/user";
  import { useRouter,useRoute } from "vue-router";





  const loading=ref(false)
  // const formInline=reactive({
  //   username:'',
  //   password:''
  // })
  const userStore = useUserStore();
  const router = useRouter()
  const route = useRoute()
  //数据结构
  interface FormState {
    email:string;
    password :string;
  }

  const formInline = reactive({
    username:'super@a.com',
    password:'123123'
  })
  const formRef = ref()
  //验证表单规则
  const rules = {
      username:{required:true, message:'请输入正确的用户名',trigger:'blur'},
      password:{required:true, message:'密码不正确',trigger:'blur'}
  };

//进行表单验证     
  const handleSubmit = (e:Event)=>{
    //阻止默认事件
    e.preventDefault();
    //判断表单是否验证通过
    formRef.value.validate(async (errors:any)=>{
      //如果error存在的话return出去
     if (errors){
       return ;
     }
     //接收数据
      const {username, password} =formInline

      // 显示登录中 将按钮的加载状态打开
      loading.value=true

      //调整数据结构
      const data :FormState ={
        email: username,
        password,
     }
     

      //发送请求 执行登录操作
    userStore.login(data).then(res=>{
     //关闭登录中
     loading.value = false;
      console.log(res);
     //弹出登录成功的提示
     alert('登陆成功');
     //跳转到首页(导航页) 两种方式

      // router.push({name:'dashboard'})
      window.location.href='/dashboard'



      //如果登陆失败
    }).catch(err=>{
      //关闭登录中
      loading.value = false;
      //弹出登录失败的提示
      alert('登陆失败');
    });

    })
  }
</script>

<style lang="less" scoped>
.view-account{
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;

  &-container{
    flex: 1;
    padding: 32px 12px;
    max-width: 384px;
    min-width: 320px;
    margin: 0 auto;
  }
  &-top{
    padding: 32px 0 ;
    text-align: center;

    &-desc{
      font-size: 14px;
      color: #808695;
    }
  }

  &-other{
    width: 100%;
  }

  .default-color{
    color: #515a6e;

    .ant-checkbox-wrapper{
      color: #515a6e;
    }
  }
}

@media (min-width: 768px) {
  .view-account{
    background-image: url("../../assets/images/login.svg") ;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100%;
  }

  .page-account-container {
    padding: 32px 0 24px 0;
  }
}
</style>