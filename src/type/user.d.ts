interface login {
  userCode: string,
  password: string,
  captcha?: string,
  nonceStr?: string,
}

interface userInfo {
  userCode: string,
  uty: number,
  token: string,
  userName: string,
  avatar: string
}
