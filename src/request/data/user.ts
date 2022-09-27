import zhRequest from "../request";
import type {IAccount,UserInfo,RootObject} from './type'


enum LoginAPI{
    Login= "/login",
    Userinfo="/users/",
    UserMenu = '/role/',
   
}

export function accountFn (account:IAccount){
    return zhRequest.post<UserInfo>({
        url:LoginAPI.Login,
        data:account
    })
} 

export function accUserinfo (id:number){
    return zhRequest.get<RootObject>({
        url:LoginAPI.Userinfo + id,
        
    })
} 


export function QueryUserMenu(id:number){
    return zhRequest.get<UserInfo>({
        url:LoginAPI.UserMenu + id +'/menu'
    })

}


