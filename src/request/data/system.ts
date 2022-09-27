import zhRequest from "../request";
import { UserInfo } from "./type";

export function getPageListData(url: string, queryInfo: any) {
    return zhRequest.post<UserInfo>({
        url: url,
        data: queryInfo
    })
}

export function deletePageData(url:string ){
    return zhRequest.delete<UserInfo>({
        url:url
    })
}

export function createPageDate(url:string,queryInfo:any){
    return zhRequest.post<UserInfo>({
        url,
        data:queryInfo
    })
}

export function editPageDate(url:string,queryInfo:any){
    return zhRequest.patch<UserInfo>({
        url,
        data:queryInfo
    })
}
