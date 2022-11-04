import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  /**
   * 储存用户信息
   */
  const userInfo = ref<userInfo>()

  const saveUserInfo = (user: userInfo) => {
    userInfo.value = user
  }

  return {
    userInfo,
    saveUserInfo,
  }
}, {
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
