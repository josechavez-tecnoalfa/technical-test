import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { useApp } from 'hooks/useApp'

const Tabs = createBottomTabNavigator()

const tabBarOpts = {
  tabBarActiveTintColor: '#1dbfa4',
  tabBarInactiveTintColor: 'gray',
  showLabel: true
}

const MainTabs = () => {

  // @ts-expect-error TS(2339) FIXME: Property 'role' does not exist on type 'unknown'.
  const { role } = useApp()

  const [isVisible, setIsVisible] = React.useState(false)

  React.useLayoutEffect(() => {
    if (role === 'subscriber') setIsVisible(true)
  }, [role])

  const getTabBarIcon = ({
    color
  }: any) => (
    <Icon
      type="MaterialIcons"
      name="home-repair-service"
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
          headerShown: false,
          tabBarIcon: getTabBarIcon,
          tabBarStyle: { display: isVisible ? 'flex' : 'none' },
          title: 'Inicio'
        }}
        component={HomeScreen}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarIcon: getTabBarIcon,
          title: 'Cuenta'
        }}
        component={ProfileScreen}
      />
    </Tabs.Navigator>
  )
}

export default MainTabs
