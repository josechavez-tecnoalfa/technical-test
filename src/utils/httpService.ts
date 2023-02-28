import firebase from '@react-native-firebase/app'

const baseUrl = 'https://api.themoviedb.org/3'

const getCurrentToken = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onIdTokenChanged(async (user) => {
      unsubscribe()
      if (user) {
        const token = await user.getIdToken()
        resolve(token)
      }
    // @ts-expect-error TS(2554) FIXME: Expected 1 arguments, but got 2.
    }, reject)
  })
}

const getHeaders = (token: any) => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${token}`
})

const getHeadersWithoutToken = () => ({
  'Content-Type': 'application/json',
  Accept: 'application/json'
})

const paramsToQuery = (params: any) => Object.keys(params)
  .map(
    (key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
  )
  .join('&')

const httpService = {
  get: async (url: any, auth = true) => {
    let token = null
    if (auth) token = await getCurrentToken()
    const response = await fetch(baseUrl + url, {
      method: 'GET',
      headers: auth ? getHeaders(token) : getHeadersWithoutToken()
    })

    return response.json()
  },
  post: async (url: any, data: any, auth = true) => {
    let token = null
    if (auth) token = await getCurrentToken()
    const response = await fetch(baseUrl + url, {
      method: 'POST',
      headers: auth ? getHeaders(token) : getHeadersWithoutToken(),
      body: JSON.stringify(data)
    })
    return response.json()
  },
  patch: async (url: any, data: any, auth = true) => {
    let token = null
    if (auth) token = await getCurrentToken()
    const response = await fetch(baseUrl + url, {
      method: 'PATCH',
      headers: auth ? getHeaders(token) : getHeadersWithoutToken(),
      body: JSON.stringify(data)
    })
    return response.json()
  },
  delete: async (url: any, params: any, auth = true) => {
    let token = null
    if (auth) token = await getCurrentToken()
    const str = `${baseUrl}${url}${
      params && Object.keys(params).length > 0
        ? `?${paramsToQuery(params)}`
        : ''
    }`
    const response = await fetch(str, {
      method: 'DELETE',
      headers: auth ? getHeaders(token) : getHeadersWithoutToken()
    })

    return response.json()
  }
}

export default httpService
