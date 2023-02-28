import React from 'react'

import LoginForm from './LoginForm'
import AuthLayout from 'layouts/AuthLayout'

const RegisterScreen = () => {
  return (
    <AuthLayout backgroundName={'background-detail'}>
      <LoginForm />
    </AuthLayout>
  )
}

export default RegisterScreen
