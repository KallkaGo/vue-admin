import { Module } from "vuex";
import type { IRootState } from '@/store/types'
import type { IDashboardState } from './type'
import {GetgoodsCount,GetggoodsSale,GetgoodsFavor,GetaddressGoodsSale} from '@/request/data/dashboard'
const DashboardModule: Module<IDashboardState, IRootState> = {
    namespaced:true,
    state: {
        goodsCount:[],
        goodsSale:[],
        goodsFavor:[],
        addressGoodsSale:[]
    },
    mutations: {
        changegoodsCount(state,List){
            state.goodsCount = List
        },
        changegoodsSale(state,List){
            state.goodsSale = List
        },
        changegoodsFavor(state,List){
            state.goodsFavor = List
        },
        changeaddressGoodsSale(state,List){
            state.addressGoodsSale = List
        }
    },
    actions: {
         async getDashboardDataAction({commit}){
         const  goodsCountResult =await GetgoodsCount()
         commit('changegoodsCount',goodsCountResult.data)

         const  goodsSaleResult =await GetggoodsSale()
         commit('changegoodsSale',goodsSaleResult.data)

         const  goodsFavorResult =await GetgoodsFavor()
         commit('changegoodsFavor',goodsFavorResult.data)

         const  addressGoodsSaleResult =await GetaddressGoodsSale()
         commit('changeaddressGoodsSale',addressGoodsSaleResult.data)
        
         
        }
    }
}

export default DashboardModule