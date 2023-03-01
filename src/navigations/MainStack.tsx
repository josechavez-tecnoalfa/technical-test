import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import MainTabs from './MainTabs'
import { SerieScreen, SerieDetailScreen, RecentDetailScreen } from 'screens/main'

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
        name="Serie"
        component={SerieScreen}
        options={options}
      />
      <Stack.Screen
        name="SerieDetail"
        component={SerieDetailScreen}
        options={options}
      />
      <Stack.Screen
        name="RecentDetail"
        component={RecentDetailScreen}
        options={options}
      />
    </Stack.Navigator>
  )
}

export default MainStack
