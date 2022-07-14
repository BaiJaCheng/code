<template>
  <div class="pt-4">
    <div class="m-0">
      <img class="m-auto" src="~@/assets/images/logo.png"  alt="logo"/>
    </div>
      <!--  菜单的数据绑定                           选中时回调   -->
    <n-menu :options="menuOptions" :value="defaultKey" inverted @update:value="handleUpdateValue" />

       <!-- <n-menu
       :inverted="true"
        :collapsed-width="64"
      :collapsed-icon-size="22"
     :options="menuOptions"
        @update:value="selectMenu"
      :value="routeKey"
 /> -->
  </div>
</template>

<script lang="ts" setup>
import {ref,onMounted} from "vue";
const defaultKey = ref('');
import { generatorMenu } from '@/utils'
import { routeModuleList } from '@/router/index'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()


onMounted(()=>{
  const route  = useRoute()
  //获取当前路由的key
const routeKey = route.name
  console.log(routeKey)
  typeof routeKey === "string" ? defaultKey.value = routeKey : defaultKey.value = ''


})



// console.log(routeModuleList,'routeModuleList');

const handleUpdateValue = (key, item) => {
  console.log(key, item);
  defaultKey.value = key;
  router.push({ name: key })
}


const menuOptions =  generatorMenu(routeModuleList);


</script>

<style scoped>

</style>