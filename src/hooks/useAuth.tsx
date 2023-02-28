import React from 'react'
import auth from '@react-native-firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useApp } from './useApp'
import { IAuth } from 'interfaces/IAuth'

// @ts-expect-error TS(2322)
const AuthContext = React.createContext<IAuth>()

export function AuthProvider (props: any) {
  const { setToken } = useApp()

  const [uid, setUid] = React.useState<string>('')
  const [isAnonymous, setIsAnonymous] = React.useState<Boolean>(false)
  const [authLoading, setAuthLoading] = React.useState<Boolean>(false)

  const [session, sessionLoading] = useAuthState(auth())

  const signUp = async (email: string, password: string) => {
    try {
      setAuthLoading(true)
      const res = await auth().createUserWithEmailAndPassword(email, password)
      if (res && res.user && !res.user.emailVerified) {
        await res.user.sendEmailVerification()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setAuthLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setAuthLoading(true)
      await auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
      console.log(error)
    } finally {
      setAuthLoading(false)
    }
  }

  const signInAnonymously = async () => {
    try {
      setAuthLoading(true)
      await auth().signInAnonymously()
    } catch (error) {
      console.log(error)
    } finally {
      setAuthLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setAuthLoading(true)
      await auth().signOut()
    } catch (error) {
      console.log(error)
    } finally {
      setAuthLoading(false)
    }
  }

  const onTokenChange = (userCredential: any) => {
    if (userCredential) {
      userCredential.getIdToken().then((newToken: any) => {
        setToken(newToken)
      })
    }
  }

  React.useEffect(() => {
    if (session?.uid && !session?.isAnonymous) {
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
