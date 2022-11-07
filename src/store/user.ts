import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  /**
   * 储存用户信息
   */
  const userInfo = ref<userInfo>()

  const saveUserInfo = (user: userInfo) => {
    userInfo.value = user
  }

  const loginOut = () => {
    userInfo.value = undefined
  }

  return {
    userInfo,
    saveUserInfo,
    loginOut,
  }
}, {
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
