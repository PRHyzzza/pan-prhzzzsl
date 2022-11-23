import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  /**
   * 储存用户信息
   */
  const userInfo: Ref<userInfo | undefined> = useStorage('userInfo', {})

  const saveUserInfo = (user: userInfo) => {
    userInfo.value = user
  }

  const loginOut = () => {
    userInfo.value = {}
  }

  return {
    userInfo,
    saveUserInfo,
    loginOut,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
