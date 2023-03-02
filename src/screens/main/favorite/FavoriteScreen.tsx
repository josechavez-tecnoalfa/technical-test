import React from 'react'
import MainLayout from 'layouts/MainLayout'
import { useModels } from 'hooks/useModels'
import MainLoading from 'components/MainLoading'
import ScrollableView from 'components/ScrollableView'
import FavoriteList from './FavoriteList'

const FavoriteScreen = () => {
  const [favorite, favoriteLoading, favoriteError] = useModels({ name: 'tv/top_rated' })

  React.useEffect(() => {
    if (favoriteError) alert(favoriteError)
  }, [favoriteError])

  if (favoriteLoading) return <MainLoading />

  return (
    <MainLayout>
      <ScrollableView style={{ flex: 1 }} >
          {/* @ts-expect-error TS(2322) */}
          <FavoriteList list={favorite?.results} />
      </ScrollableView>
    </MainLayout>
  )
}

export default FavoriteScreen
