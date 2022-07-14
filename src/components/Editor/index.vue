<template>
  <QuillEditor theme="snow" @update:content="updateContent"  ref="editor" />
</template>

<script setup>
import {ref} from "vue";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const emit = defineEmits(['backContent',])
const editor = ref()
const updateContent= (e) => {
  emit('backContent',editor.value.getHTML())
  // console.log(e)
  // model.value.detailds = editor.value.getHTML()
}
</script>
<style scoped>

</style>