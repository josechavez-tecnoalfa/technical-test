import React from 'react'
import { StyleSheet } from 'react-native'
import { Card } from 'native-base'
import RegisterForm from './RegisterForm'
import AuthLayout from 'layouts/AuthLayout'

const RegisterScreen = () => {
  return (
    <AuthLayout backgroundName={'background-detail'} title={'Sign up'}>
      <Card style={styles.formCard}>
        <RegisterForm/>
      </Card>
    </AuthLayout>
  )
}

const styles = StyleSheet.create({
  formCard: {
    height: '50%',
    width: '100%',
    backgroundColor: '#000',
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
    opacity: 0.7
  }
})

export default RegisterScreen
