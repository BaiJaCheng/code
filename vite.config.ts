import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

//将路径变成一个变量
import {resolve} from 'path'
function pathResolve(dir:string) {
  return resolve(process.cwd(),'.',dir)
}


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ],
  //配置路径 @
  resolve:{
    alias:[
      {
          find:'@',
        //绝对路径 从根路径开始找
        // replacement:'D:/code/ewshopadmin/src',
        replacement:pathResolve('src')
      }
    ]
  },
  //修改端口
})
