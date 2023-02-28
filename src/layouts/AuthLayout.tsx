import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { Box } from 'native-base'

import assets from 'assets'

interface IProps {
  backgroundName: string,
  children: any
}

const AuthLayout = ({ backgroundName, children }: IProps) => {
  return (
    <Box style={styles.container}>
        <Image
          style={styles.image}
          source={backgroundName === 'authBackground' ? assets.authBackground : assets.authBackgroundDetail}
          resizeMode="contain"
        />
        <Box style={styles.content}>
          {children}
        </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  image: {
    alignSelf: 'center',
    height: '100%',
    position: 'absolute',
    opacity: 0.5,
    zIndex: -1
  },
  content: {
    flex: 1,
    justifyContent: 'center'
  }
})

export default AuthLayout
