import React from 'react'

import RNBootSplash from 'react-native-bootsplash'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { AuthStack, MainTabs } from 'navigations'

import { AppProvider, useApp } from 'hooks/useApp'
import { AuthProvider } from 'hooks/useAuth'
import { ProfileProvider } from 'hooks/useProfile'

const RootStack = createStackNavigator()

const RootComponent = () => {
  // @ts-expect-error TS(2339) FIXME: Property 'token' does not exist on type 'unknown'.
  const { token } = useApp()

  React.useLayoutEffect(() => {
    RNBootSplash.hide({ fade: true })
  }, [])

  if (token) {
    return (
      <ProfileProvider>
          <MainTabs />
      </ProfileProvider>
    )
  }

  return <AuthStack />
}

const App = () => {
  return (
    <AppProvider>
      <AuthProvider>
            <NavigationContainer>
              <RootStack.Navigator>
                <RootStack.Screen
                  options={{ headerShown: false }}
                  name={'Root'}
                  component={RootComponent}
                />
              </RootStack.Navigator>
            </NavigationContainer>
      </AuthProvider>
    </AppProvider>
  )
}

export default App
