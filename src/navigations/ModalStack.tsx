import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { SerieScreen, SerieDetailScreen, RecentDetailScreen } from 'screens/main'

const Stack = createStackNavigator()

const options = {
  headerTitleStyle: { color: '#fff', fontWeight: '200' },
  headerStyle: { backgroundColor: '#191919' },
  headerBackTitleStyle: { color: '#fff', fontWeight: '200' }
}

const ModalStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Serie"
    >
      <Stack.Screen
        name="Serie"
        component={SerieScreen}
        // @ts-expect-error TS(2322)
        options={options}
      />
      <Stack.Screen
        name="SerieDetail"
        component={SerieDetailScreen}
        // @ts-expect-error TS(2322)
        options={options}
      />
      <Stack.Screen
        name="RecentDetail"
        component={RecentDetailScreen}
        // @ts-expect-error TS(2322)
        options={options}
      />
    </Stack.Navigator>
  )
}

export default ModalStack
