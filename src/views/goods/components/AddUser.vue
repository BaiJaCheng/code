<template>
  <n-modal v-model:show="props.showModal"
  @update:show="$emit('checkShowModal',false)"
  :mask-closable="true"
  >
    <n-card
        style="width: 600px"
        title="添加商品"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <template #header-extra>
       <span @click="$emit('checkShowModal',false)">x</span>
      </template>
         <n-form ref="formRef" :model="model" :rules="rules">
             <Editor @backContent="backContent"></Editor>
            <n-row :gutter="[0, 24]" >
            <n-col :span="24">
                <div style="display: flex; justify-content: flex-end;margin-top:10px;">
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
    </n-card>
  </n-modal>
</template>

<script setup>
import {h,ref,defineProps,defineEmits} from "vue";
import Editor from '@/components/Editor/index.vue';
import { addUser } from '@/api/user';


const props = defineProps({
    showModal:{
        type:Boolean,
        default:false
    }
})

const backContent = (htmlString)=>{
 model.value.detailds = htmlString
}

const emit = defineEmits(['checkShowModal',])

 const model = ref({
      detailds: null,

    })
 const rules = {
   detailds: [
            { required: true,
              message: '请输入详情',
              trigger: 'blur' },
        ],

    }

const formRef = ref();
const showModal = ref(false)

const userSubmit =(e)=> {
    e.preventDefault()
  console.log(model.value)
}

const updateContent= (content) => {
  // console.log(content)
  model.value.detailds = editor.value.getHTML()
}

//路由的验证规则
</script>

<style scoped>

</style>