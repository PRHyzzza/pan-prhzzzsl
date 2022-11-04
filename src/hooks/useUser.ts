export default () => {
  const userStore = useUserStore()
  const loginOut = () => {
    userStore.$reset()
  }
  return {
    loginOut,
  }
}
