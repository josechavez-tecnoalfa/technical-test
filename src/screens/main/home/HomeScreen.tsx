import React from 'react'
import MainLayout from 'layouts/MainLayout'
import { useModels } from 'hooks/useModels'

const popularBaseReq = {
  name: 'tv/popular'
}

const recommendationsBaseReq = {
  name: 'tv/top_rated'
}

const HomeScreen = () => {
  const [popular, popularLoading, popularError, popularPage, popularRefresh] = useModels(popularBaseReq)
  const [recommendations, recommendationsLoading, recommendationsError, recommendationsPage, recommendationsRefresh] = useModels(recommendationsBaseReq)

  return (
    <MainLayout><></></MainLayout>
  )
}

export default HomeScreen
