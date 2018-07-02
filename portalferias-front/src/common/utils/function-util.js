import jwtDecode from 'jwt-decode'

function storageToken (token) {
  window.localStorage.setItem('token', token)
  if (isTokenExpired(token)) {
    console.log('ja expirou :(')
    const exp = new Date()
    exp.setUTCSeconds(exp.getUTCSeconds() + 60)
    window.localStorage.setItem('exp', exp.getTime())
  }
}

function getToken () {
  return window.localStorage.getItem('token')
}

function getTokenExpirationDate (token) {
  const decoded = jwtDecode(token)

  if (!decoded.exp) {
    return null
  }
  const date = new Date(0)
  date.setUTCSeconds(decoded.exp)

  return date
}

function isTokenExpired (token, offsetSeconds) {
  if (!token) {
    return true
  }

  const exp = window.localStorage.getItem('exp')

  const date = exp ? new Date(Number(exp)) : getTokenExpirationDate(token)
  offsetSeconds = offsetSeconds || 0

  if (date === null) {
    return true
  }

  return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000)
}

export {
  storageToken,
  getTokenExpirationDate,
  isTokenExpired,
  getToken
}
