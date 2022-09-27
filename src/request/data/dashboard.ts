import zhRequest from "../request";
import type { UserInfo } from "./type";
enum BoardAPI{
    goodsCount='/goods/category/count',
    goodsSale='/goods/category/sale',
    goodsFavor='/goods/category/favor',
    addressGoodsSale='/goods/address/sale'
}
export function GetgoodsCount(){
    return zhRequest.get<UserInfo>({
        url:BoardAPI.goodsCount
    })
}

export function GetggoodsSale(){
    return zhRequest.get<UserInfo>({
        url:BoardAPI.goodsSale
    })
}
export function GetgoodsFavor(){
    return zhRequest.get<UserInfo>({
        url:BoardAPI.goodsFavor
    })
}
export function GetaddressGoodsSale(){
    return zhRequest.get<UserInfo>({
        url:BoardAPI.addressGoodsSale
    })
}