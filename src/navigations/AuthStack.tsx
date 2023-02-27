import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {
  LoginScreen,
  RegisterScreen,
  RecoveryScreen,
} from 'screens/auth'

const Stack = createStackNavigator()

const screenOptions = { headerShown: false }

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ presentation: 'modal' }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={screenOptions}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={screenOptions}
      />
      <Stack.Screen
        name="Recovery"
        component={RecoveryScreen}
        options={screenOptions}
      />
    </Stack.Navigator>
  )
}

export default AuthStack
