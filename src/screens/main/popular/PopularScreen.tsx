import React from 'react'
import MainLayout from 'layouts/MainLayout'
// import PopularCarousel from './PopularCarousel'

interface IProps {
  route: any;
}

const PopularScreen = ({ route }: IProps) => {
  const { item, list } = route.params

  console.log(item, list)

  return (
    <MainLayout>
      {/* <PopularCarousel list={list} item={item}/> */}
    </MainLayout>
  )
}

export default PopularScreen
