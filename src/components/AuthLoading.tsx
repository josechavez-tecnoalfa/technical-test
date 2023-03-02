import React from 'react'
import { HStack, Spinner } from 'native-base'
import AuthLayout from 'layouts/AuthLayout'

const AuthLoading = () => {
  return (
    <AuthLayout title={'Loading...'} showCard={false}>
    <HStack space={3} alignSelf={'center'}>
      <Spinner size={'lg'} color={'#FFD233'} />
    </HStack>;
    </AuthLayout>
  )
}

export default AuthLoading
