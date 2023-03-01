import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import MainTabs from './MainTabs'
import { DetailScreen } from 'screens/main'

const Stack = createStackNavigator()

const options = {
  headerShown: false
}

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{ presentation: 'transparentModal' }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={options}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={options}
      />
    </Stack.Navigator>
  )
}

export default MainStack
