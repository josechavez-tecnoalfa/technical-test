import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { Box, Card, Text } from 'native-base'

import assets from 'assets'

interface IProps {
  title: string,
  children: any,
  showCard?: boolean,
  backgroundName?: string,
}

const AuthLayout = ({ title, children, showCard = true, backgroundName = 'authBackground' }: IProps) => {
  return (
    <Box style={styles.container}>
        <Image
          style={styles.image}
          source={backgroundName === 'authBackground' ? assets.authBackground : assets.authBackgroundDetail}
          resizeMode="contain"
        />
        <Box style={styles.content}>
          <Text fontSize={32} style={styles.title}>{title}</Text>
          {showCard
            ? <Card style={styles.formCard}>
            {children}
          </Card>
            : children }
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
  },
  title: {
    color: '#fff',
    alignSelf: 'center',
    position: 'absolute',
    top: '10%'
  },
  formCard: {
    height: '50%',
    width: '100%',
    backgroundColor: '#000',
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
    opacity: 0.7
  }
})

export default AuthLayout
