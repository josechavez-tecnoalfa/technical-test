import React from 'react'
import { Icon } from 'native-base'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen, ProfileScreen } from 'screens/main'

const Tabs = createBottomTabNavigator()

const tabBarOpts = {
  tabBarActiveTintColor: '#1dbfa4',
  tabBarInactiveTintColor: 'gray',
  showLabel: true
}

const MainTabs = () => {
  const getTabBarIcon = ({
    color
  }: any) => (
    <Icon
      type="MaterialIcons"
      name="home-repair-service"
        // @ts-expect-error TS(2322)
      style={{ color }}
    />
  )

  return (
    <Tabs.Navigator
      initialRouteName='Home'
      screenOptions={tabBarOpts}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: getTabBarIcon,
          title: 'Inicio'
        }}
        component={HomeScreen}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: getTabBarIcon,
          title: 'Cuenta'
        }}
        component={ProfileScreen}
      />
    </Tabs.Navigator>
  )
}

export default MainTabs
