import firebase from '@react-native-firebase/app'
// @ts-expect-error TS(2322)
import { BASE_URL, ACCESS_TOKEN, API_KEY } from '@env'

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
  Authorization: `Bearer ${ACCESS_TOKEN}`
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
    const response = await fetch(BASE_URL + url + `?api_key=${API_KEY}`, {
      method: 'GET',
      headers: auth ? getHeaders(token) : getHeadersWithoutToken()
    })

    return response.json()
  },
  post: async (url: any, data: any, auth = true) => {
    let token = null
    if (auth) token = await getCurrentToken()
    const response = await fetch(BASE_URL + url + `?api_key=${API_KEY}`, {
      method: 'POST',
      headers: auth ? getHeaders(token) : getHeadersWithoutToken(),
      body: JSON.stringify(data)
    })
    return response.json()
  },
  patch: async (url: any, data: any, auth = true) => {
    let token = null
    if (auth) token = await getCurrentToken()
    const response = await fetch(BASE_URL + url + `?api_key=${API_KEY}`, {
      method: 'PATCH',
      headers: auth ? getHeaders(token) : getHeadersWithoutToken(),
      body: JSON.stringify(data)
    })
    return response.json()
  },
  delete: async (url: any, params: any, auth = true) => {
    let token = null
    if (auth) token = await getCurrentToken()
    const str = `${BASE_URL}${url}${
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
