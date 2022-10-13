export const uploadFile = (formData: FormData) => {
  return axios({
    method: 'post',
    url: 'public/upload/file',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  })
}
