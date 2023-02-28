import React from 'react'
import { Platform } from 'react-native'
import notifee, { AndroidColor, AndroidImportance, AndroidVisibility } from '@notifee/react-native'

import firestore from '@react-native-firebase/firestore'
import { useDocumentData } from 'react-firebase-hooks/firestore'

import { useAuth } from './useAuth'

const ProfileContext = React.createContext()

export function ProfileProvider (props: any) {
  const { uid, isAnonymous } = useAuth()

  const profileRef = uid ? firestore().collection('profiles').doc(uid) : undefined
  const notificationsRef = uid ? firestore().collection('profiles').doc(uid).collection('notifications') : undefined

  const [profile, profileLoading, profileError] = useDocumentData(profileRef)

  const [position, setPosition] = React.useState(null)
  const [search, setSearch] = React.useState(null)

  const profileFilters = React.useMemo(() => {
    let body = {}
    if (search) body = { ...body, search }
    return body
  }, [location, search])

  const cleanFcm = React.useCallback(() => {
    if (!isAnonymous) {
      profileRef?.update({ fcm: [] })
    }
  }, [profileRef, isAnonymous])

  const profileFiltersRefresh = React.useCallback((params: any) => {
    if (typeof params.search === 'string') setSearch(params.search)
  }, [])

  const requestUserMessaging = React.useCallback(async () => {
    try {
      const authStatus = await messaging().requestPermission({
        announcement: true
      })
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL

      if (enabled) {
        const fcmToken = await messaging().getToken()
        if (fcmToken &&
          profile &&
           Array.isArray(profile.fcm) &&
           !profile.fcm.includes(fcmToken)) {
          await profileRef.update({
            fcm: [...profile.fcm, fcmToken]
          })
        } else if (fcmToken && profile && !profile.fcm) {
          await profileRef.update({
            fcm: [fcmToken]
          })
        }
      }
    } catch (e) {
      console.log(e)
    }
  }, [profile, profileRef])

  const onNotificationReceived = React.useCallback(async (message: any) => {
    if (message) {
      try {
        let obj = { platform: Platform.OS }
        let shown = {}

        const channelId = await notifee.createChannel({
          id: 'android',
          name: 'Android Notifications',
          sound: 'notification',
          vibration: true,
          vibrationPattern: [300, 500],
          lights: true,
          lightColor: AndroidColor.RED,
          visibility: AndroidVisibility.PUBLIC,
          importance: AndroidImportance.HIGH
        })

        if (message?.messageId) obj = { ...obj, messageId: message.messageId }

        if (message?.notification?.title) obj = { ...obj, title: message.notification.title }

        if (message?.notification?.body) obj = { ...obj, body: message.notification.body }

        if (message?.data?.navigateTo) obj = { ...obj, navigateTo: message.data.navigateTo }
        obj = {
          ...obj,

          imageUrl: Platform.OS === 'ios'
            ? message.data.fcm_options.image
            : message?.notification?.android?.imageUrl || ''
        }
        obj = {
          ...obj,

          sentTime: Platform.OS === 'ios'
            ? firestore.FieldValue.serverTimestamp()
            : firestore.FieldValue.serverTimestamp(message.sentTime)
        }

        shown = Platform.OS === 'ios'
          ? { title: (obj as any).title, body: (obj as any).body }
          : {
              title: (obj as any).title,
              body: (obj as any).body,
              android: {
                channelId,
                name: 'Android Notifications',
                sound: 'notification',
                vibrationPattern: [300, 500],
                lights: [AndroidColor.RED, 300, 600],
                visibility: AndroidVisibility.PUBLIC,
                importance: AndroidImportance.HIGH
              }
            }
        await notificationsRef.add(obj)
        await profileRef.update({ notifications: firestore.FieldValue.increment(1) })
        await notifee.displayNotification(shown)
      } catch (e) {
        console.log(e)
      }
    }
  }, [notificationsRef, profileRef])

  React.useEffect(() => {
    let mounted = true
    if (mounted) {
      setTimeout(cleanFcm, 10000)
    }
    return () => {
      mounted = false
    }
  }, [])

  React.useEffect(() => {
    let mounted = true
    if (mounted) {
      requestUserMessaging()
    }
    return () => {
      mounted = false
    }
  }, [requestUserMessaging])

  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(onNotificationReceived)
    if (Platform.OS === 'android') {
      notifee.registerForegroundService(onNotificationReceived)
    }
    messaging().setBackgroundMessageHandler(onNotificationReceived)

    return () => {
      unsubscribe()
    }
  }, [onNotificationReceived])

  const memData = React.useMemo(() => {
    return [profile, profileLoading, profileError, profileFilters, profileFiltersRefresh]
  }, [profile, profileLoading, profileError, profileFilters, profileFiltersRefresh])

  return <ProfileContext.Provider value={memData} {...props} />
}

export function useProfile () {
  const context = React.useContext(ProfileContext)
  if (!context) {
    console.error('error: profile context not defined.')
  }
  return context
}
