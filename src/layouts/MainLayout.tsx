import React from 'react'
import { StyleSheet } from 'react-native'
import { Box } from 'native-base'

interface IProps {
  children: any
}

const MainLayout = ({ children }: IProps) => {
  return (
    <Box style={styles.container}>
        {/* <Image
          style={styles.image}
          source={backgroundName === 'authBackground' ? assets.authBackground : assets.authBackgroundDetail}
          resizeMode="contain"
        /> */}
        <Box style={styles.content}>
          {children}
        </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919'
  },
  content: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    color: '#fff',
    alignSelf: 'center',
    position: 'absolute',
    top: '10%'
  }
})

export default MainLayout
