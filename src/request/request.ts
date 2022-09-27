import MyHTTP from './index'
import {AxiosRequestHeaders} from 'axios'
import { BASE_URL, TIME_OUT } from './config'
import LocalCache from '@/utils/cache'
const zhRequest = new MyHTTP({
    baseURL: BASE_URL, interceptor: {
        requestInterceptor(config) {
            // console.log('请求的拦截');
            const token = LocalCache.getCache('token')
            if (token) {
                (<AxiosRequestHeaders>config.headers).Authorization = token
            }
            return config
        },
        requestInterceptorCatch(err) {
            // console.log('请求失败的拦截');

            return err
        },
        responseInterceptor(conifg) {
            // console.log('响应成功的拦截');

            return conifg
        },
        responseInterceptorCatch(err) {
            // console.log('响应失败的拦截');

            return err
        },
    }
})



export default zhRequest