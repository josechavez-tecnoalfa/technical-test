const emptyRequest = () => ({
  req: undefined,
  url: undefined,
  params: undefined,
  body: undefined
})

const getRequest = (url: string, params = {}) => ({
  req: 'GET',
  url,
  params,
  body: null
})

const postRequest = (url: string, body: any, params = {}) => ({
  req: 'POST',
  url,
  params,
  body
})

const deleteRequest = (url: string, id: string, params = {}) => ({
  req: 'DELETE',
  url,

  params: {
    ...params,
    id
  }
})

export { emptyRequest, getRequest, postRequest, deleteRequest }
