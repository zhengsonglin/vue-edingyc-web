
import * as types from './mutation-types'

// 用户名登录
export const LoginByUsername = function({ commit }, userInfo) {
  const username = userInfo.phone.trim()
  
  return new Promise((resolve, reject) => {
    /*loginByUsername(username, userInfo.pass).then(response => {
      const data = response.data
      commit('SET_TOKEN', data.token)
      setToken(response.data.token)
      resolve()
    }).catch(error => {
      reject(error)
    })*/
    resolve()
  })
  commit('SET_USERNAME', userInfo.phone)
}

// 登出
export const LogOut = function({ commit, state }) {
      /*return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })*/
    // commit('SET_USERNAME', '')
}
	
    
    
    
