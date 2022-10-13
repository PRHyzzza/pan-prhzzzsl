export const wwwLogin = (data: login) => {
  return axios({
    method: 'post',
    url: 'www/user/login',
    data,
  })
}
