import React from 'react'
import auth from '@react-native-firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useApp } from './useApp'

const AuthContext = React.createContext(null)

export function AuthProvider (props: any) {
  const { token, setToken, setRole } = useApp()

  const [uid, setUid] = React.useState<string>('')
  const [isAnonymous, setIsAnonymous] = React.useState<Boolean>(false)

  const [authLoading, setAuthLoading] = React.useState<Boolean>(false)

  const [session, sessionLoading] = useAuthState(auth())

  const signUp = async () => {}

  const signIn = async () => {}

  const signInAnonymously = async () => {}

  const signOut = async () => {}

  const onTokenChange = async () => {}

  React.useEffect(() => {
    if ( session?.uid && !session?.isAnonymous ) {
      setUid(session.uid)
    } else {
      setUid('')
    }
    if (session?.isAnonymous) {
      setIsAnonymous(true)
    } else {
      setIsAnonymous(false)
    }
  }, [session])

  React.useEffect(() => {
    let validated = false
    let unsub: any = null

    if (session && session.emailVerified && !session.isAnonymous) {
      validated = true
    } else if (session && session.isAnonymous) {
      validated = true
    }

    if (validated) {
      unsub = auth().onIdTokenChanged(onTokenChange)
    }
    return () => {
      if (unsub) unsub()
    }
  }, [session, onTokenChange])

  const memData = React.useMemo(() => {
    return {
      uid,
      session,
      sessionLoading,
      isAnonymous,
      signUp,
      signIn,
      signInAnonymously,
      authLoading,
      signOut
    }
  }, [
    uid,
    session,
    sessionLoading,
    isAnonymous,
    signUp,
    signIn,
    signInAnonymously,
    authLoading,
    signOut
  ])

  return <AuthContext.Provider value={memData} {...props} />
}

export function useAuth () {
  const context = React.useContext(AuthContext)
  if (!context) {
    console.error('error: auth context not defined.')
  }
  return context
}
