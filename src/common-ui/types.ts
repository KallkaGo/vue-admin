import { type } from "os"

type Fromtype = 'input' | 'password' | 'select' | 'datepicker'

type Fromitem = {
    field: string
    type: Fromtype
    label: string,
    rules?: any[]
    placeholder?: any,
    options?: any[],
    otherOptions?: any,
    isHide?:boolean

}

type CmFormConfig = {
    formItems: Fromitem[]
    labelwidth?: string
    colLayput?: object,
    
}

type CmTableConfig = {
    label: string
    prop?: string
    minwidth?: string
    slotName?: string


}

type CmTableprop = {
   
    propList: CmTableConfig[]
    title?: string
    showIndex?: boolean
    showSelect?: boolean
    showfooter?:boolean
    childrenProps?:Object
}

export {
    Fromitem,
    CmFormConfig,
    CmTableprop,
    CmTableConfig
}