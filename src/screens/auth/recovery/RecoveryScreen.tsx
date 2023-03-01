import React from 'react'
import { StyleSheet } from 'react-native'
import RecoveryForm from './RecoveryForm'
import AuthLayout from 'layouts/AuthLayout'
import { Card } from 'native-base'

const RecoveryScreen = () => {
  return (
    <AuthLayout backgroundName={'background-detail'} title={'Recovery'}>
      <Card style={styles.formCard}>
        <RecoveryForm/>
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
    opacity: 0.7,
    position: 'absolute',
    bottom: 0
  }
})

export default RecoveryScreen
