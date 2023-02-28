import React from 'react'
import { emptyRequest, getRequest, deleteRequest } from 'constants/request'
import { useHttp } from './useHttp'

const empty = emptyRequest()

export function useModels ({
  name,
  fields = null,
  expand = null,
  ordenar = null,
  limite = null,
  pagina = null,
  extraParams = null
}: any) {
  const [modelRequest, setModelsRequest] = React.useState(empty)
  const [modelsPage, setModelsPage] = React.useState(null)
  const [models, modelsLoading, modelsError, refreshModels] =
    useHttp(modelRequest)

  const [delRequest, setDelRequest] = React.useState(empty)
  const [deleteResult, deleteResultLoading] = useHttp(delRequest)

  const deleteModel = React.useCallback(
    async (id: any) => {
      if (!deleteResultLoading) {
        const deleteReq = deleteRequest(name, id);
        (deleteReq as any).alert = true
        // @ts-expect-error TS(2322)
        setDelRequest(deleteReq)
      }
    },
    [name, deleteResultLoading]
  )

  React.useEffect(() => {
    if (!name) {
      setModelsRequest(empty)
      return
    }
    let params = {}
    const expandParser = (e: any) => e.replace(/,/g, '&expand=')
    if (fields) params = { ...params, fields }
    if (expand) {
      params = {
        ...params,
        expand: typeof expand === 'string' ? expandParser(expand) : ''
      }
    }
    if (ordenar) params = { ...params, ordenar }
    if (limite) params = { ...params, limite }
    if (pagina) params = { ...params, pagina }
    if (extraParams) params = { ...params, ...extraParams }
    const modelReq = getRequest(name, params)
    // @ts-expect-error TS(2322)
    setModelsRequest(modelReq)
  }, [name, fields, expand, ordenar, limite, pagina, extraParams])

  React.useEffect(() => {
    if (!modelsLoading && !modelsError && models) {
      // @ts-expect-error TS(2322)
      const { pagination } = models
      setModelsPage(pagination)
    }
  }, [models, modelsLoading, modelsError])

  React.useEffect(() => {
    if (!deleteResultLoading && deleteResult) {
      // @ts-expect-error TS(2322)
      refreshModels()
    }
  }, [deleteResult, deleteResultLoading, refreshModels])

  return React.useMemo(() => {
    const modelsLoadingFinal = modelsLoading || deleteResultLoading
    return [
      models,
      modelsLoadingFinal,
      modelsError,
      modelsPage,
      refreshModels,
      deleteModel
    ]
  }, [
    models,
    modelsLoading,
    modelsError,
    modelsPage,
    refreshModels,
    deleteResultLoading,
    deleteModel
  ])
}
