<template>
  <div>
    <div class="h-24 w-full bg-white p-3 mb-6">
      <div>
        <span class="text-slate-400 pr-1">首页</span>/ <span class="pl-1">用户管理</span>
        <div class="pt-3 text-xl text-black font-bold">
          用户管理
        </div>
      </div>
    </div>

    <div class="content px-4">
      <div class="bg-white pt-4  pr-6">
    <n-form
    ref="formRef"
    inline
    :label-width="80"
    :model="formSearch"
    label-placement="left"
  >
        <n-form-item label="姓名" path="user.name">
          <n-input v-model:value="formSearch.name" placeholder="输入姓名" />
        </n-form-item>
        <n-form-item label="邮箱" path="user.email"  >
          <n-input v-model:value="formSearch.age" placeholder="请输入邮箱" />
        </n-form-item>
      
        <n-form-item class="ml-auto">
           <n-button class="mr-4"  attr-type="button" @click="searchReload">
            重置
          </n-button>
          <n-button type="info"  attr-type="button" @click="searchSubmit">
            搜索
          </n-button>
        </n-form-item>
  </n-form>
      </div>
      <div class="mt-4 bg-white">
            <div class="text-xl pl-4 py-4 flex px-6">
              <span>用户列表</span>
              <span class="ml-auto"><NButton type="info" @click="showModal = true">+新建</NButton></span>
            </div>
            <div>
              <n-data-table
              :columns="columns"
              :data="data"
              :pagination="pagination"
              :bordered="false"
            />
            </div>

            <div class="p-4 flex justify-end pr-10">  
               <n-pagination v-model:page="page" @update:page="updatePage" :page-count="totalPage"   />
            </div>
      </div>
      <AddUser :showModal="showModal" @checkShowModal="checkShowModal" @reloadTable="reload"></AddUser>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { h,ref,onMounted, render} from 'vue'
import { NButton, useMessage ,NAvatar,NSwitch, useLoadingBar} from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import {users} from '@/api/user'
import AddUser from './components/AddUser.vue'


const totalPage = ref(0)
const message = useMessage()
const page = ref('')
//添加模态框
const showModal = ref(false)
//编辑模态框
const showEditModal = ref(false)

const user_id = ref('')

const checkEditModal = (show:boolean)=>{
  showEditModal.value = show
}

const loadingBar = useLoadingBar()
const formSearch = ref({
  name:'',
  email:'',

})
const data = ref([])   

const columns =  [
    {
      title: '头像',
      key: 'avatar_url',
      //通过使用 h 来创建一个组件 ,h可以创建一个组件或者一个虚拟节点
      render(row){
        //给h里面的组件传递一个属性
        return h(NAvatar,{round:true,src:row.avatar_url})
      }
    },
    {
      title: '姓名',
      key: 'name'
    },
    {
      title: '邮箱',
      key: 'email'
    },
    {
      title: '是否禁用',
      key: 'is_locked',
      render(row){    //给h里面的组件传递一个属性
        return h(NSwitch,
        {
          size:'medium',
          color:'#1890ff',
          activeColor:'#52c41a',
          inactiveColor:'#d9d9d9',
          activeValue:1,
          inactiveValue:0,
          //值为1时为假否则为true
          value:row.is_locked == 1 ? false : true,
          onClick:()=>{
          //将值更改
          row.is_locked = row.is_locked == 1 ? 0 : 1
          }
        })}
    },
    {
      title:'创建时间',
      key:'created_at'
    },

    {
      title:'操作',
      key:'created_at',
      render(row){
        
        return h(NButton,{
          size:'small',
          color:'#1890ff',
          strong:true,
          onClick:()=>{
            //点击获取一个id 通过id去更改数据
            user_id.value = row.id;
            showEditModal.value = true;
          }
        },'编辑')
      }
    },
  ]



const  pagination =  ref(false as const)

//初始化数据
onMounted(()=>{
 getUserList({})
})

//获取某一页的数据
const updatePage = (pageNum) => {
  //我们点击那一页就会获取到那一页的数据
  // console.log(page)
  getUserList({current:pageNum,
  name:formSearch.value.name,
  email:formSearch.value.email
  })
}

//搜索查询功能
const searchSubmit = (e) => {
  e.preventDefault();
  getUserList({
    name:formSearch.value.name,
    email:formSearch.value.email,
    current:1
  })
}

//重置
const searchReload = ()=>{
  getUserList({})
  //将参数重置为空
  formSearch.value = {
    name:'',
    email:'',
  }
}

const checkShowModal = (status)=>{
  showModal.value = status
}

//整合出来的users 方便维护
const getUserList = (params)=>{
  loadingBar.start()
  users(params).then(users =>{
    // console.log(users);
    data.value = users.data
    totalPage.value = users.meta.pagination.total_pages
    page.value = users.meta.pagination.current_page
    loadingBar.finish()
  }).catch(error=>{
    console.log(error);
  })
}

const reload = ()=>{
  //让页面刷新数据
    getUserList({
      current:page.value,
      name:formSearch.value.name,
      email:formSearch.value.email
  })
}
</script>

<style scoped>

</style>