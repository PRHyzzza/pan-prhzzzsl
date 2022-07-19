import axios from 'axios'

import { type UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
  app.config.globalProperties.$http = axios
}
