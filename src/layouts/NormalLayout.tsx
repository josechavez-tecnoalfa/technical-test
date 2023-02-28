import React from 'react'
import { StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import {
  Body,
  Container,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Title,
  View
} from 'native-base'

type Props = {
    title: string;
    subtitle?: string;
    goBackTo?: string;
    isActiveColor?: string;
    children: any;
    goBack?: boolean;
};

const NormalLayout = ({ title, subtitle, goBackTo, children, isActiveColor = '#1dbfa4', goBack = true }: Props) => {
  const navigation = useNavigation()

  return (
    <Container style={styles.root}>
      <Header
        style={styles.header}
        iosBarStyle="dark-content"
        androidStatusBarColor="#fff">
        <Left style={styles.headerLeft}>
          {goBack &&
          <Pressable
            onPress={() => goBackTo
              ?
            // @ts-expect-error TS(2769) FIXME: No overload matches this call.
              navigation.navigate(goBackTo)
              : navigation.goBack()
            }>
            <Icon
              name="arrow-back"
              style={[
                styles.headerIcon,
                { color: isActiveColor || '#1dbfa4' }
              ]}
            />
          </Pressable>
          }
        </Left>
        <Body style={styles.headerBody}>
          <Title style={styles.headerTitle}>
            {title}
          </Title>
          <Text style={styles.headerSubtitle}>{subtitle}</Text>
        </Body>
        <Right style={{ flex: 1 }}/>
      </Header>
      <View style={styles.content}>
        {children}
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff'
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
    flex: 1
  }
})

export default NormalLayout
