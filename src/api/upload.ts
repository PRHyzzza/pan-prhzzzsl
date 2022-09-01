import type { AxiosPromise } from 'axios'

export const uploadFile = (formData: FormData): AxiosPromise<any> => {
  return axios({
    method: 'post',
    url: 'public/upload/file',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  })
}
