import { type UserModule } from '~/types'

export const install: UserModule = () => {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
}
