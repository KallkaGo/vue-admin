import axios from 'axios'
import type { AxiosInstance, } from 'axios'
import type { Requesthook, zhRequestconfig } from './types'
import { ElLoading } from 'element-plus'

class AxiosRequest {

    instance: AxiosInstance
    interceptor?: Requesthook
    constructor(config: zhRequestconfig) {
        this.instance = axios.create(config)
        /* 添加此实例的拦截器 */
        this.interceptor = config.interceptor
        this.instance.interceptors.request.use(
            this.interceptor?.requestInterceptor,
            this.interceptor?.requestInterceptorCatch
        )
       
        //添加所有实例的拦截器
        this.instance.interceptors.request.use((res) => {

            return res
        }, (err) => {
            return err
        })
        this.instance.interceptors.response.use((res) => {
            return res.data
        }, (err) => {
            return err
            //判断状态码
        })
        this.instance.interceptors.response.use(
            this.interceptor?.responseInterceptor,
            this.interceptor?.responseInterceptorCatch
        )

    }

    request<T>(config: zhRequestconfig<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            if (config.interceptor?.requestInterceptor) {
                config = config.interceptor.requestInterceptor(config)
            }
            const loading = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
              })
            this.instance.request<any, T>(config).then((res) => {
                if (config.interceptor?.responseInterceptor) {
                    res = config.interceptor.responseInterceptor(res)
                }
                loading.close()
                resolve(res)

            }).catch((err) => {
                reject(err)
            })
        })

    }

    get<T>(config: zhRequestconfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: 'GET' })
    }
    post<T>(config: zhRequestconfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: 'POST' })
    }
    delete<T>(config: zhRequestconfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: 'DELETE' })
    }
    patch<T>(config: zhRequestconfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: 'PATCH' })
    }





}

export default AxiosRequest