import { createApp } from 'vue'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'
import store from './store'
import { setupStore } from './store'
import 'normalize.css'
import './assets/css/idnex.less'
import globalProperties from '@/global/index'
import type { Filter } from '@/global/format'
import Commondailog from '@/components/commondialog/index'


const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}



declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $filter: Filter
  }
}
console.log('@@@@@',Commondailog);

app.component('Commondailog',Commondailog)
app.use(store)
setupStore()
app.use(router)
// app.use(ElementPlus, {
//   locale: zhCn,
// })
app.use(globalProperties)

app.mount('#app')


