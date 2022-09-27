import moment from 'moment'
import { type } from 'os'

import { App } from 'vue'

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export type Filter = {
    formatTime:(str1:string,str2?:string) => string
}

export default function formatFn(app:App) {

    app.config.globalProperties.$filter = {
        formatTime (time:string,type:string = DATE_FORMAT){
           return moment(time).format(type)
        }
    }

}