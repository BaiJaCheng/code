<template>
  <n-modal v-model:show="props.showModal"
  @update:show="$emit('checkShowModal',false)"
  :mask-closable="true"
  >
    <n-card
        style="width: 600px"
        title="添加轮播图"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <template #header-extra>
       <span @click="$emit('checkShowModal',false)">x</span>
      </template>
         <n-form ref="formRef" :model="model" :rules="rules">
            <n-form-item path="title" label="标题">
         <n-input v-model:value="model.title" placeholder="请输入标题" />
           </n-form-item>
         <n-form-item path="url" label="跳转url">
            <n-input
            v-model:value="model.url" placeholder="请输入跳转url"
            type="url"
      />
          </n-form-item>

              <n-form-item label="是否启用" path="status">
                <n-radio-group v-model:value="model.status" name="status">
                  <n-space>
                    <n-radio :value=" 0">
                      否
                    </n-radio>
                    <n-radio :value="1">
                      是
                    </n-radio>
                  </n-space>
                </n-radio-group>
              </n-form-item>

               <n-form-item label="图片上传" path="img">
              <upload @backKey="backKey"></upload>


              </n-form-item>

       
            <n-row :gutter="[0, 24]">
            <n-col :span="24">
                <div style="display: flex; justify-content: flex-end">
                <n-button
                 
                    @click="slideSubmit"
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
    </n-card>
  </n-modal>
</template>

<script setup>
import {h,ref,defineProps,defineEmits} from "vue";
import { addUser } from '@/api/user';
import {uploadToken} from "@/api/base";
import {addSlides} from "@/api/slide";
import axios from "axios";

const props = defineProps({
    showModal:{
        type:Boolean,
        default:false
    }
})

const emit = defineEmits(['checkShowModal',])

 const model = ref({
      title: null,
      img: null,
      url: null,
      status: null
    })
 const rules = {
        title: [
                  {
                    required: true,
                    message: '请输入标题', 
                  },
                ],

            img:[
                  {
                    required: true,
                    message: '请上传图片',
                  },
                ],

            url:[
                  {
                    required: true,
                    message: '请输入跳转链接',
                  },
                ],

           status:[
                  {
                    required: true,
                    message: '请选择状态',
                  },
                ]
              }

const formRef = ref();
const showModal = ref(false)


const slideSubmit =(e)=> {
    e.preventDefault()
     console.log(model.value);
    formRef.value.validate(errors=>{
        if(errors){
            console.log(errors);
        }else{
          //请求api 添加数据
        addSlides(model.value).then(res=>{
            console.log(res);
            window.$message.success('添加成功');
            //刷新表格和关闭弹框
            emit('checkShowModal',false);
            emit('reloadTable')
        })
         console.log(model.value);
        }
    })
}

const backKey =(key)=>{
  model.value.img= key;
}



//路由的验证规则
</script>

<style scoped>

</style>