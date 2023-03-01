import React from 'react'
import AuthLayout from 'layouts/AuthLayout'
import LoginForm from './LoginForm'

const LoginScreen = () => {
  return (
    <AuthLayout backgroundName={'background-detail'} title={'Log in'}>
        <LoginForm />
    </AuthLayout>
  )
}

export default LoginScreen
