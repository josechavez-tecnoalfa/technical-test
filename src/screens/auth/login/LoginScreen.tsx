import React from 'react'

import LoginForm from './LoginForm'
import AuthLayout from 'layouts/AuthLayout'

const RegisterScreen = () => {
  return (
    <AuthLayout backgroundName={'background-detail'} title={'Log in'}>
      <LoginForm />
    </AuthLayout>
  )
}

export default RegisterScreen
