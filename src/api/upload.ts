import type { AxiosPromise } from 'axios'

export const chunkFile = (formData: FormData): AxiosPromise<any> => {
  return axios({
    method: 'post',
    url: 'public/chunk',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  })
}

export const mergeFile = (data: any): AxiosPromise<any> => {
  return axios({
    method: 'post',
    url: 'public/merge',
    data,
  })
}
