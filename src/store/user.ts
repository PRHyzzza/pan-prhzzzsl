import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  /**
   * 储存用户信息
   */
  const userInfo = ref('')

  const saveUserInfo = (user: string) => {
    userInfo.value = user
  }
  return {
    userInfo,
    saveUserInfo,
  }
}, {
  persist: {
    enabled: true,
    strategies: [
      {
        // 自定义key
        key: 'user',
        // 自定义存储方式，默认sessionStorage
        storage: localStorage,
      },
    ],
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
