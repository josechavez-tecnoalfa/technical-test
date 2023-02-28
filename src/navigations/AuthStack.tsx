import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {
  WelcomeScreen,
  LoginScreen,
  RegisterScreen,
  RecoveryScreen
} from 'screens/auth'

const Stack = createStackNavigator()

const screenOptions = { headerShown: false }

const AuthStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={screenOptions}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={screenOptions}
      />
      <Stack.Screen
        name="Signup"
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
