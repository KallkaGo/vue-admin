import {App } from 'vue'
import formatFn from './format'
export default function globalProperties(app:App){
    app.use(formatFn)
}