import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import './styles/tailwindcss.css'
import './styles/index.less'
import {createPinia} from "pinia";


const app = createApp(App)
//引入路由器
app.use(router)
//引入pinia
app.use(createPinia())
app.mount('#app')

