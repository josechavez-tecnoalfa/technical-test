import React from 'react'

import RegisterForm from './RegisterForm'
import AuthLayout from 'layouts/AuthLayout'

const RegisterScreen = () => {
  return (
    <AuthLayout backgroundName={'background-detail'}>
      <RegisterForm/>
    </AuthLayout>
  )
}

export default RegisterScreen
