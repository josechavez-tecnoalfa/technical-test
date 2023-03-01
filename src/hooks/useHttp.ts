import React from 'react'
import firebase from '@react-native-firebase/app'
// @ts-expect-error TS(2322)
import { BASE_URL, ACCESS_TOKEN, API_KEY } from '@env'

const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

const makeHeaders = (token: any) => token
  ? {
      ...defaultHeaders,
      Authorization: `Bearer ${ACCESS_TOKEN}`
    }
  : defaultHeaders

const paramsToQuery = (params: any) => Object.keys(params)
  .map((key) => encodeURIComponent(key) + '=' + encodeURI(params[key]))
  .join('&')

const httpStatusCodes = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  SERVER_ERROR: 500
}

const capitalize = (s: any) => s.charAt(0).toUpperCase() + s.slice(1)

export function useHttp ({ req = 'GET', url = null, params = {}, body = {} }) {
  const [response, setResponse] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState<Boolean>(true)

  const refresh = React.useCallback(
    async (inlineParams = {}) => {
      try {
        if (!url || !params) {
          setResponse(null)
          setError(null)
          setLoading(true)
          return
        }
        if ((inlineParams as any).isCargando === false) {
          setLoading(() => false)
        } else {
          setLoading(() => true)
        }
        let token = null
        if (firebase.auth().currentUser) {
          token = await firebase?.auth()?.currentUser?.getIdToken()
        }

        let fetchReq = {
          method: req,
          headers: makeHeaders(token)
        }
        if (body) {
          // @ts-expect-error TS(2322) FIXME: Type '{ body: string; method: string; headers: { '... Remove this comment to see the full error message
          fetchReq = { ...fetchReq, body: JSON.stringify(body) }
        }

        const paramsFinal = { ...params, ...inlineParams }
        const str = `${BASE_URL}${url}${
          params && Object.keys(paramsFinal).length > 0
            ? `?${paramsToQuery(paramsFinal)}&api_key=${API_KEY}`
            : `?api_key=${API_KEY}`
        }`
        const httpRes = await fetch(str, fetchReq)
        const resBody = await httpRes.json()
        switch (httpRes.status) {
          case httpStatusCodes.OK:
            setResponse(resBody)
            setError(null)
            break
          case httpStatusCodes.BAD_REQUEST:
          case httpStatusCodes.UNAUTHORIZED:
            setError(resBody.errores)
            break
          case httpStatusCodes.SERVER_ERROR:
          default:
            console.log(
              resBody.mensaje
                ? capitalize(resBody.mensaje)
                : 'Ocurrió un error en el servidor.'
            )
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    },
    [body, params, req, url]
  )

  React.useEffect(() => {
    let mounted = true
    if (mounted) {
      refresh()
    }
    return () => {
      mounted = false
    }
  }, [refresh])

  return React.useMemo(
    () => [response, loading, error, refresh],
    [response, loading, error, refresh]
  )
}
