import * as Api from '@/values/api'
import * as Request from '@/utils/request'

const state = () => ({
  id: '',
  name: '',
  username: '',
  email: '',
  role: '',
  token: null
})

const mutations = {
  setId (state, param) {
    state.id = param
  },

  setName (state, param) {
    state.name = param
  },

  setUsername (state, param) {
    state.username = param
  },

  setEmail (state, param) {
    state.email = param
  },

  setRole (state, param) {
    state.role = param
  },

  setToken (state, param) {
    state.token = param
  }
}

const actions = {
  async login (store, param) {
    return await Request.post({
      url: Api.loginUser,
      data: {
        email: param.email,
        password: param.password
      }
    }).then((response) => {
      const result = response.data
      store.commit('setId', result.data.id)
      store.commit('setName', result.data.fullname)
      store.commit('setUsername', result.data.username)
      store.commit('setEmail', result.data.email)
      store.commit('setRole', result.data.role)
      store.commit('setToken', result.data.token)
      return response
    }).catch((err) => {
      return err.response
    })
  },

  async logout (store) {
    await store.commit('setId', '')
    await store.commit('setName', '')
    await store.commit('setUsername', '')
    await store.commit('setEmail', '')
    await store.commit('setRole', '')
    await store.commit('setToken', null)
  }

  // async updateUser (store, params) {
  //   await store.commit('setName', params.name)
  //   await store.commit('setEmail', params.email)
  // }
}

export { state, mutations, actions }
