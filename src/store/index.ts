
import { type } from 'os'
import { createStore, useStore as VuexStore, Store } from 'vuex'
import login from './login/login'
import system from './system/system'
import dashboard from './dashboard/dashboard'
import type { IStoreType } from './types'
import { getPageListData } from '@/request/data/system'


const store = createStore({

  state: {
    entireDeaprtment: [],
    entireRole: [],
    entireMenu: [],
    IsFold: false

  },
  getters: {
  },
  mutations: {
    changeEntireDepartment(state, List) {
      state.entireDeaprtment = List
    },
    changeEntireRole(state, List) {
      state.entireRole = List
    },
    changeEntireMenu(state, List) {
      state.entireMenu = List
    },
    changeIsFold(state, value) {
      state.IsFold = value
    }
  },
  actions: {
    async GetInitAction({ commit }) {
      const Dpresult = await getPageListData('/department/list', {
        offset: 0,
        size: 100
      })
      const { list: departmentList } = Dpresult.data
      const Roresult = await getPageListData('/role/list', {
        offset: 0,
        size: 100
      })
      const { list: roleList } = Roresult.data
      const MenuList = await getPageListData('/menu/list', {})
      const { list: menuList } = MenuList.data
      //
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    },
    FoldAction({ commit }, payload) {
      commit('changeIsFold', payload)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  // store.dispatch('GetInitAction')
}

export function useStore(): Store<IStoreType> {
  return VuexStore()
}

export default store