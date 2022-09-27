import type { ILoginState } from '@/store/login/types'
import type { IsystemState } from '@/store/system/types'
import type {IDashboardState} from '@/store/dashboard/type'

type IRootState = {
    entireDeaprtment: any[]
    entireRole: any[]
    entireMenu:any[],
    IsFold:boolean

}



type IRootwithModule = {
    login: ILoginState
    system: IsystemState
    dashboard:IDashboardState
}



export type IStoreType = IRootwithModule & IRootState

export {
    IRootState,
    IRootwithModule,



}