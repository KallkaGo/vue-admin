import { Module } from 'vuex'
import { IsystemState } from './types'
import { IRootState } from '../types'
import { deletePageData, getPageListData, createPageDate, editPageDate } from '@/request/data/system'
import { ElMessage } from 'element-plus'
const systemModule: Module<IsystemState, IRootState> = {
    namespaced: true,
    state: () => ({
        roleList: [],
        usersList: [],
        goodsList: [],
        menuList: [],
        usersCount: 0,
        rolecount: 0,
        goodsCount: 0,
        menuCount: 0

    }),
    mutations: {
        changeUsersList(state, List) {
            state.usersList = List
        },
        changeUsersCount(state, Count) {
            state.usersCount = Count
        },
        changeRoleList(state, List) {
            state.roleList = List
        },
        changeRoleCount(state, Count) {
            state.rolecount = Count
        },
        changeGoodsList(state, List) {
            state.goodsList = List
        },
        changeGoodsCount(state, Count) {
            state.goodsCount = Count
        },
        changeMenuList(state, List) {
            state.menuList = List
        },
        changeMenuCount(state, Count) {
            state.menuCount = Count
        },



    },
    actions: {

        async getPageListAction({ commit }, payload: any) {
            // 1.获取pageUrl
            const pageName = payload.pageName
            const pageUrl = `/${pageName}/list`

            // 2.对页面发送请求
            const pageResult = await getPageListData(pageUrl, payload.queryInfo)

            // 3.将数据存储到state中
            const { list, totalCount } = pageResult.data

            const changePageName =
                pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
            commit(`change${changePageName}List`, list)
            commit(`change${changePageName}Count`, totalCount)
        },

        async deletePageDataAction({ dispatch }, payload: any) {
            //获取pagename和id 用于拼接
            const { pageName, id } = payload
            const pageUrl = `/${pageName}/${id}`

            //删除数据
            await deletePageData(pageUrl)
            ElMessage({
                showClose: true,
                message: '成功',
                type: 'success',
              })

            dispatch('getPageListAction', {
                pageName,
                queryinfo: {
                    offset: 0,
                    size: 10
                }
            })


        },
        async createPageDate({ dispatch }, payload: any) {
            const { pageName, queryInfo } = payload
            const pageUrl = `/${pageName}`
            await createPageDate(pageUrl, queryInfo)
            ElMessage({
                showClose: true,
                message: '成功',
                type: 'success',
              })
            dispatch('getPageListAction', {
                pageName,
                queryinfo: {
                    offset: 0,
                    size: 10
                }
            })
        },
        async editPageDate({ dispatch }, payload: any) {
            const { pageName, queryInfo, id } = payload
            const pageUrl = `/${pageName}/${id}`
            await editPageDate(pageUrl, queryInfo)
            ElMessage({
                showClose: true,
                message: '成功',
                type: 'success',
              })
            dispatch('getPageListAction', {
                pageName,
                queryinfo: {
                    offset: 0,
                    size: 10
                }
            })
        }

    },
    getters: {
        pageListData(state) {
            return (pageName: string) => {
                return (state as any)[`${pageName}List`]
            }
        },
        pageListCount(state) {
            return (pageName: string) => {
                return (state as any)[`${pageName}Count`]
            }
        }
    }
}


export default systemModule