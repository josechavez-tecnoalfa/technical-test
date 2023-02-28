import React from 'react'
import { emptyRequest, getRequest, postRequest } from 'constants/request'
import { util } from 'utils'
import { useHttp } from './useHttp'

const empty = emptyRequest()

export function useModel ({
  name,
  id,
  fields = null,
  expand = null,
  extraParams = null,
  path = 'guardar'
}: any) {
  const [modelRequest, setModelRequest] = React.useState(empty)
  const [model, modelLoading, modelError, refreshModel] = useHttp(modelRequest)
  const [updateRequest, setUpdateRequest] = React.useState(empty)
  const [postResult, postResultLoading, postResultError] =

    useHttp(updateRequest)

  const updateModel = React.useCallback(
    (newModel: any) => {
      if (!postResultLoading) {
        if (newModel.id) {
          newModel = { [`id${util.capitalizeFirst(name)}`]: newModel.id }
          delete newModel.id
        }
        const updateReq = postRequest(`${name}/${path}`, newModel)
        // @ts-expect-error TS(2322)
        setUpdateRequest(updateReq)
      }
    },
    [name, postResultLoading, path]
  )

  React.useEffect(() => {
    if (!name) return
    let params = id ? { id } : {}
    const expandParser = (e: any) => e.replace(/,/g, '&expand=')

    // @ts-expect-error TS(2322)
    if (fields) params = { ...params, fields }
    if (expand) {
      params = {
        ...params,

        // @ts-expect-error TS(2322)
        expand: typeof expand === 'string' ? expandParser(expand) : ''
      }
    }
    if (extraParams) params = { ...params, ...extraParams }
    const modelReq = getRequest(name, params)

    // @ts-expect-error TS(2322)
    setModelRequest(modelReq)
  }, [name, id, fields, expand, extraParams])

  return React.useMemo(() => {
    let finalError = {}
    if (modelError) finalError = { ...modelError }
    if (postResultError) finalError = { ...postResultError }
    return {
      model,
      modelLoading,
      modelError: finalError,
      refreshModel,
      updateModel,
      updateModelResult: postResult,
      updateModelLoading: postResultLoading
    }
  }, [
    model,
    modelLoading,
    modelError,
    refreshModel,
    postResult,
    postResultLoading,
    postResultError,
    updateModel
  ])
}
