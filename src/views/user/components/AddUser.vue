<template>
  <n-modal v-model:show="props.showModal"
  @update:show="$emit('checkShowModal',false)"
  :mask-closable="true"
  >
    <n-card
        style="width: 600px"
        title="添加用户"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <template #header-extra>
       <span @click="$emit('checkShowModal',false)">x</span>
      </template>
         <n-form ref="formRef" :model="model" :rules="rules">
            <n-form-item path="name" label="姓名">
         <n-input v-model:value="model.name" placeholder="请输入姓名" />
           </n-form-item>
         <n-form-item path="email" label="邮箱">
            <n-input
            v-model:value="model.email" placeholder="请输入邮箱"
            type="email"
      />
          </n-form-item>

            <n-form-item
            path="Password"
            label="密码"
            >
            <n-input
                v-model:value="model.password" placeholder="请输入密码"
                type="password"
            />
            </n-form-item>
            <n-row :gutter="[0, 24]">
            <n-col :span="24">
                <div style="display: flex; justify-content: flex-end">
                <n-button
                 
                    @click="userSubmit"
                >
                    提交
                </n-button>
                </div>
            </n-col>
            </n-row>
  </n-form>
    </n-card>
  </n-modal>
</template>

<script setup>
import {h,ref,defineProps,defineEmits} from "vue";
import { addUser } from '@/api/user';

const props = defineProps({
    showModal:{
        type:Boolean,
        default:false
    }
})

const emit = defineEmits(['checkShowModal',])

 const model = ref({
      name: null,
      email: null,
      password: null
    })
 const rules = {
        name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
      email: [
        {
          required: true,
          message: '请输入邮箱',
        }
      ],
        password: [
        {
          required: true,
          message: '请输入密码',
        },
 
      ]
    }

const formRef = ref();
const showModal = ref(false)

const userSubmit =(e)=> {
    e.preventDefault()
    formRef.value.validate(errors=>{
        if(errors){
            console.log(errors);
        }else{
            addUser(model.value).then(res=>{
            //将新添加的用户添加到用户列表中 并关闭弹窗
              emit('checkShowModal',false)
            })
        }
    })
}

//路由的验证规则
</script>

<style scoped>

</style>