import React from 'react'
import { HStack, Spinner } from 'native-base'
import MainLayout from 'layouts/MainLayout'

const MainLoading = () => {
  return (
    <MainLayout>
    <HStack space={3} alignSelf={'center'}>
      <Spinner size={'lg'} color={'#FFD233'} />
    </HStack>;
    </MainLayout>
  )
}

export default MainLoading
