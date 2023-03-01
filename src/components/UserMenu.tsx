import React from 'react'
import { Pressable } from 'react-native'
import { HamburgerIcon, Menu } from 'native-base'
import { useAuth } from 'hooks/useAuth'

function UserMenu () {
  const { signOut } = useAuth()

  const onSignOutPressed = async () => {
    await signOut()
  }

  return (
    <Menu trigger={triggerProps => {
      return <Pressable style={{ marginRight: '10%' }} accessibilityLabel="More options menu" {...triggerProps}>
                <HamburgerIcon />
              </Pressable>
    }}>
      <Menu.Item onPress={onSignOutPressed}>Sign out</Menu.Item>
    </Menu>
  )
}

export default UserMenu
