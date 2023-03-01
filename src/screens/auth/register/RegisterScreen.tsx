import React from 'react'
import RegisterForm from './RegisterForm'
import AuthLayout from 'layouts/AuthLayout'

const RegisterScreen = () => {
  return (
    <AuthLayout backgroundName={'background-detail'} title={'Sign up'}>
        <RegisterForm/>
    </AuthLayout>
  )
}

export default RegisterScreen
