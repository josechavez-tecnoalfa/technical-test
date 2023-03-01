import React from 'react'
import { HStack, Spinner } from 'native-base'
import AuthLayout from 'layouts/AuthLayout'

const Loading = () => {
  return (
    <AuthLayout title={'Loading...'}>
    <HStack space={3} alignSelf={'center'}>
      <Spinner size={'lg'} color={'#FFD233'} />
    </HStack>;
    </AuthLayout>
  )
}

export default Loading
