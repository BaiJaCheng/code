<template>
  <n-modal v-model:show="props.showModal"
  @update:show="$emit('checkShowModal',false)"
  :mask-closable="true"
  >
    <n-card
        style="width: 600px"
        title="编辑用户"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <template #header-extra>
       <span @click="$emit('checkShowModal',false)">x</span>
      </template>
         <n-form v-if="showForm" ref="formRef" :model="model" :rules="rules">
            <n-form-item path="name" label="姓名">
         <n-input v-model:value="model.name" placeholder="请输入姓名" />
           </n-form-item>
         <n-form-item path="email" label="邮箱">
            <n-input
            v-model:value="model.email" placeholder="请输入邮箱"
            type="email"
      />
          </n-form-item>

        
            <n-row :gutter="[0, 24]">
            <n-col :span="24">
                <div style="display: flex; justify-content: flex-end">
                <n-button
                 
                    @click="userSubmit"
                >
                <template #description>
                    提交中...
                </template>
                    提交
                </n-button>
                </div>
            </n-col>
            </n-row>
  </n-form>
      <n-skeleton v-else text :repeat="2" />
    </n-card>
  </n-modal>
</template>

<script setup>
import {h,ref,defineProps,defineEmits,onMounted} from "vue";
import { addUser ,getUserInfo,updateUser} from '@/api/user';

const props = defineProps({
    showModal:{
        type:Boolean,
        default:false
    },
    user_id:{
      type:String,
      default:''
    }
})

const emit = defineEmits(['checkShowModal','shuaxin'])
const showForm = ref(false)
onMounted(()=>{
   
  if(props.user_id){
    getUserInfo(props.user_id).then(res=>{
      model.value.name = res.name;
      model.value.email = res.email;
      showForm.value = true;
    })
  }
})

 const model = ref({
      name: null,
      email: null,

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
      
    }

const formRef = ref();
const showModal = ref(false)

const userSubmit =(e)=> {
    e.preventDefault()
    formRef.value.validate(errors=>{
        if(errors){
            console.log(errors);
        }else{
            updateUser(props.user_id,model.value).then(res=>{
              window.$message.success('修改成功')
            //将修改用户添加到用户列表中 并关闭弹窗
              emit('checkShowModal',false)
              //修改完成后自动刷新页面 因为我们在user/index下面已经写入了这个方法，在这里写入emit中一调用即可
              emit('reloadTable')
            })
        }
    })
}

//路由的验证规则
</script>

<style scoped>

</style>