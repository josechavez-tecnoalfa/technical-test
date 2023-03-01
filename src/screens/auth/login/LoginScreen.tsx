import React from 'react'
import { Card } from 'native-base'
import { StyleSheet } from 'react-native'

import AuthLayout from 'layouts/AuthLayout'
import LoginForm from './LoginForm'

const LoginScreen = () => {
  return (
    <AuthLayout backgroundName={'background-detail'} title={'Log in'}>
      <Card style={styles.formCard}>
        <LoginForm />
      </Card>
    </AuthLayout>
  )
}

const styles = StyleSheet.create({
  formCard: {
    height: '50%',
    width: '100%',
    backgroundColor: '#191919',
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
    opacity: 0.7
  }
})

export default LoginScreen
