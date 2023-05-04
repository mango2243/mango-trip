import { createApp, normalizeClass } from 'vue'
import App from './App.vue'

// 初始化css样式 normalize+自定义rest.css
import "normalize.css"
import "./assets/css/index.css"

// 引入vue路由
import router from './router'

// 引入pinia
import pinia from './stores'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
