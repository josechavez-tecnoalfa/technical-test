import React from 'react'
import RecoveryForm from './RecoveryForm'
import AuthLayout from 'layouts/AuthLayout'

const RecoveryScreen = () => {
  return (
    <AuthLayout backgroundName={'background-detail'} title={'Recovery'}>
        <RecoveryForm/>
    </AuthLayout>
  )
}
export default RecoveryScreen
