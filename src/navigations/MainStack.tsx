import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import MainTabs from './MainTabs'
import ModalStack from './ModalStack'

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
        name="Main"
        component={MainTabs}
        options={options}
      />
      <Stack.Screen
        name="Modals"
        component={ModalStack}
        options={options}
      />
    </Stack.Navigator>
  )
}

export default MainStack
