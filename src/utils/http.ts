import axios from 'axios'

const http = axios

http.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

export default http
