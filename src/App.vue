
<template>
  <div>
    <n-message-provider>
      <router-view></router-view>
    </n-message-provider>
  </div>

</template>

<script setup lang="ts">
import {NButton} from 'naive-ui'
import Home from "./views/Home.vue";
import Login from "./views/login/index.vue";
</script>


<style>

</style>
