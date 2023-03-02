import React from 'react'
import { NativeBaseProvider } from 'native-base'
import RNBootSplash from 'react-native-bootsplash'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { AuthStack, MainStack } from 'navigations'
import { AppProvider, useApp } from 'hooks/useApp'
import { AuthProvider } from 'hooks/useAuth'

const RootStack = createStackNavigator()

const RootComponent = () => {
  const { token } = useApp()

  React.useLayoutEffect(() => {
    RNBootSplash.hide({ fade: true }).catch(e => console.error(e))
  }, [])

  if (token) return <MainStack />
  return <AuthStack />
}

const App = () => {
  return (
    <AppProvider>
      <AuthProvider>
        <NativeBaseProvider>
              <NavigationContainer>
                <RootStack.Navigator>
                  <RootStack.Screen
                    options={{ headerShown: false }}
                    name={'Root'}
                    component={RootComponent}
                  />
                </RootStack.Navigator>
              </NavigationContainer>
        </NativeBaseProvider>
      </AuthProvider>
    </AppProvider>
  )
}

export default App
