<template>
  <n-upload
      :custom-request="customRequest"
  >
    <n-button v-if="!imgurl">上传文件</n-button>
    <n-image
        v-else
        width="100"
        :src="imgurl"
        preview-disabled="true"
    />
  </n-upload>
</template>

<script setup>
import {ref} from "vue";
import {uploadToken} from "../../api/base";
import axios from "axios";
import Upload from '@/components/Upload/index.vue';

const imgurl = ref(null)
const key = "upload-token";
const emit = defineEmits(['backKey'])
const customRequest = ({file,action,heider,onFinish,onError})=>{
  //首先拿到钥匙 在手册ossToken中
  uploadToken().then(res=>{
    //图片上传逻辑
    console.log(res);

    //组装上传的参数
    const formData = new FormData();
    //随机生成图片名称 带有时间戳 根据 file.name 来获取文件的后缀名
    const fileName = `${Date.now()}${Math.floor(Math.random()*1000)}.${file.name.split('.').pop()}`;
    // let fileName =  Math.random().toString(36).substr(2, 5) + file.name;

    //把文件和钥匙传给formData
    formData.append('key',fileName);
    formData.append('policy',res.policy);
    formData.append('OSSAccessKeyId',res.accessid);
    formData.append('signature',res.signature);
    formData.append('file',file.file);
    //发送请求
    console.log(FormData);
    //进行上传通过axios发送请求
    axios.post(res.host,formData,{
      headers:{
        'Content-Type':'multipart/form-data'
      }
    }).then(()=>{
      //图片显示
      console.log(res.host+'123123123123')
      imgurl.value = `${res.host}/${fileName}`;
      //上传成功后的回调
      emit('backKey',fileName);
      //上传成功后调用onFinish
      onFinish(fileName);
    }).catch(err=>{
      onError(err);
    })
  })

}
</script>

<style scoped>

</style>