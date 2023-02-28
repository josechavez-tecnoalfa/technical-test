import React from 'react'
import { StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import {
  Box,
  Icon,
  Text,
  Card,
  HStack
} from 'native-base'
import ScrollableView from 'components/ScrollableView'

interface Props {
  title: string
  subtitle?: string
  goBackTo?: string
  isActiveColor?: string
  children: any
  refreshControl?: any
  goBack?: boolean
}

const CardLayout = ({ title, subtitle, goBackTo, children, refreshControl, isActiveColor = '#1dbfa4', goBack = true }: Props) => {
  const navigation = useNavigation()

  return (

    <Box style={styles.root}>
      <HStack
        style={styles.header}>
        <HStack style={styles.headerLeft}>
          {goBack &&
          <Pressable
            onPress={() => {
              if (goBackTo) navigation.navigate(goBackTo as never)
              else navigation.goBack()
            }}>
            <Icon
              name="arrow-back"
              style={[styles.headerIcon, { color: isActiveColor }] as any}
            />
          </Pressable>
          }
        </HStack>

        <HStack style={styles.headerBody}>

          <Text style={styles.headerTitle}>
            {title}
          </Text>
          <Text style={styles.headerSubtitle}>{subtitle}</Text>
        </HStack>
      </HStack>
      <ScrollableView
        style={styles.content}
          // @ts-expect-error TS(2322)
        refreshControl={refreshControl}
      >
        <Card style={styles.card}>
          {children}
        </Card>
      </ScrollableView>
    </Box>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
    opacity: 0.5
  },
  header: { backgroundColor: 'white', padding: 10 },
  headerLeft: { flex: 1 },
  headerIcon: { color: '#1dbfa4' },
  headerBody: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    color: '#1dbfa4',
    fontWeight: 'bold'
  },
  headerSubtitle: {
    color: '#9e9e9e'
  },
  content: {
    flex: 1,
    paddingHorizontal: '2%'
  },
  card: {
    borderRadius: 20,
    padding: 10
  }
})

export default CardLayout
