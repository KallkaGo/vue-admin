import type { AxiosRequestConfig, AxiosResponse } from 'axios'

type Requesthook<T = AxiosResponse> = {
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
    requestInterceptorCatch?: (err: any) => any
    responseInterceptor?: (res: T) => T
    responseInterceptorCatch?: (err: any) => any
}


interface zhRequestconfig<T = AxiosResponse> extends AxiosRequestConfig {
    interceptor?: Requesthook<T>
}


export {
    Requesthook,
    zhRequestconfig
}