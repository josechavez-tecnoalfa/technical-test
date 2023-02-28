import React from 'react'
import { AppContextType } from 'interfaces/IApp'

// @ts-expect-error TS(2322)
const AppContext = React.createContext<AppContextType>()

export function AppProvider (props: any) {
  const [token, setToken] = React.useState<string | null>(null)

  const memData = React.useMemo(() => {
    return { token, setToken }
  }, [token, setToken])

  return <AppContext.Provider value={memData} {...props} />
}

export function useApp () {
  const context = React.useContext(AppContext)
  if (!context) {
    console.error('error: app context not defined.')
  }
  return context
}
