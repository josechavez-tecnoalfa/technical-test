import React from 'react'
import { FavouriteIcon, HamburgerIcon, PlayIcon, SearchIcon } from 'native-base'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen, FavoriteScreen, RecentScreen, SearchScreen } from 'screens/main'

const Tabs = createBottomTabNavigator()

const tabOptions = {
  tabBarActiveBackgroundColor: '#000',
  tabBarInactiveBackgroundColor: '#000',
  tabBarActiveTintColor: '#FFD233',
  tabBarInactiveTintColor: '#8C8C8C'
}

const MainTabs = () => {
  return (
    <Tabs.Navigator
      initialRouteName='Home'
      screenOptions={tabOptions}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color }) => <HamburgerIcon color={color} />
        }}
        component={HomeScreen}
      />
      <Tabs.Screen
        name="Favorites"
        options={{
          tabBarIcon: ({ color }) => <FavouriteIcon color={color} />
        }}
        component={FavoriteScreen}
      />
      <Tabs.Screen
        name="Recent"
        options={{
          tabBarIcon: ({ color }) => <PlayIcon color={color} />
        }}
        component={RecentScreen}
      />
      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ color }) => <SearchIcon color={color} />
        }}
        component={SearchScreen}
      />

    </Tabs.Navigator>
  )
}

export default MainTabs
