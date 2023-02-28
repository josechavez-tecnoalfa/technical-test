import React from 'react'
import RecoveryForm from './RecoveryForm'
import AuthLayout from 'layouts/AuthLayout'

interface Props {
  navigation: any
}

const RecoveryScreen = (props: Props) => {
  return (
    <AuthLayout backgroundName={'background-detail'}>
      <RecoveryForm navigation={props.navigation} />
    </AuthLayout>
  )
}

export default RecoveryScreen
