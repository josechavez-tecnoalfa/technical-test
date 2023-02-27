import React from 'react'

const AppContext = React.createContext(null)

export function AppProvider (props: any) {
  const [token, setToken] = React.useState(null)
  const [role, setRole] = React.useState(null)

  const memData = React.useMemo(() => {
    return { token, setToken, role, setRole }
  }, [token, setToken, role])

  return <AppContext.Provider value={memData} {...props} />
}

export function useApp () {
  const context = React.useContext(AppContext)
  if (!context) {
    console.error('error: app context not defined.')
  }
  return context
}
