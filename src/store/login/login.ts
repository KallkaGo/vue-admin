import { Module } from 'vuex'
import { ILoginState } from './types'
import { IRootState } from '../types'
import { accountFn, accUserinfo, QueryUserMenu } from '@/request/data/user'
import type { IAccount } from '@/request/data/type'
import LocalCache from '@/utils/cache'
import { mapMenusToRoutes, mapMenusToPermission } from '@/utils/map-menus'
import router from '@/router'
const LoginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state: () => ({
    token: '',
    userinfo: {},
    userMenu: [],
    permission: []
  }),
  mutations: {
    setToken(state, token: string) {
      state.token = token
    },
    setUserInfo(state, info) {
      state.userinfo = info
    },
    setUserMenu(state, menu) {
      state.userMenu = menu

      const routes = mapMenusToRoutes(menu)
      //添加路由
      routes.forEach((item) => {
        router.addRoute('main', item)
      })

      const permission = mapMenusToPermission(menu)
      state.permission = permission

    }
  },
  actions: {
    async accountLoginAction({ commit,dispatch }, payload: IAccount) {
      /* 实现登录逻辑 */
      const result = await accountFn(payload)
      const { id, token } = result.data
      commit('setToken', token)
      LocalCache.setCache('token', token)
      /* 发送初始化请求（完整的role/department */

      dispatch('GetInitAction',null,{root:true})
      /* 请求用户信息 */

      const userinfoResult = await accUserinfo(id)
      const userinfo = userinfoResult.data
      commit('setUserInfo', userinfo)
      LocalCache.setCache('userinfo', userinfo)
      /* 权限列表 */
      const userMenu = await QueryUserMenu(userinfo.role.id)
      const Menus = userMenu.data
      console.log('Menus', Menus);

      commit('setUserMenu', Menus)
      LocalCache.setCache('usermenu', Menus)
      /* 跳转到首页 */
      router.push('/main')

    },
    loadLocalLogin({ commit ,dispatch}) {
      const token = LocalCache.getCache('token')
      if (token) {
        commit('setToken', token)
        dispatch('GetInitAction',null,{root:true})
      }
      const userinfo = LocalCache.getCache('userinfo')
      if (userinfo) {
        commit('setUserInfo', userinfo)
      }
      const userMenu = LocalCache.getCache('usermenu')

      if (userMenu) {
        commit('setUserMenu', userMenu)
      }
    }
  },
  getters: {

  }
}

export default LoginModule