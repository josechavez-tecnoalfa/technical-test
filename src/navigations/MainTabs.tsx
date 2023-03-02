import React from 'react'
import { FavouriteIcon, HamburgerIcon, PlayIcon, SearchIcon } from 'native-base'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen, FavoriteScreen, RecentScreen, SearchScreen } from 'screens/main'
import UserMenu from 'components/UserMenu'

const Tabs = createBottomTabNavigator()

const tabOptions = {
  tabBarActiveBackgroundColor: '#191919',
  tabBarInactiveBackgroundColor: '#191919',
  tabBarActiveTintColor: '#FFD233',
  tabBarInactiveTintColor: '#8C8C8C'
}

const options = {
  headerTitleStyle: { color: '#fff', fontWeight: '200' },
  headerRight: () => <UserMenu />,
  headerStyle: { backgroundColor: '#191919' }
}

const MainTabs = () => {
  return (
    <Tabs.Navigator
      initialRouteName='Home'
      screenOptions={tabOptions}
    >
      <Tabs.Screen
        name="Home"
        // @ts-expect-error TS(2322)
        options={{
          ...options,
          tabBarIcon: ({ color }) => <HamburgerIcon color={color} />
        }}
        component={HomeScreen}
      />
      <Tabs.Screen
        name="Favorites"
        // @ts-expect-error TS(2322)
        options={{
          ...options,
          tabBarIcon: ({ color }) => <FavouriteIcon color={color} />
        }}
        component={FavoriteScreen}
      />
      <Tabs.Screen
        name="Recent"
        // @ts-expect-error TS(2322)
        options={{
          ...options,
          tabBarIcon: ({ color }) => <PlayIcon color={color} />
        }}
        component={RecentScreen}
      />
      <Tabs.Screen
        name="Search"
        // @ts-expect-error TS(2322)
        options={{
          ...options,
          tabBarIcon: ({ color }) => <SearchIcon color={color} />
        }}
        component={SearchScreen}
      />

    </Tabs.Navigator>
  )
}

export default MainTabs
