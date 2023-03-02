import React from 'react'
import MainLayout from 'layouts/MainLayout'
import { useModels } from 'hooks/useModels'
import MainLoading from 'components/MainLoading'
import FavoriteList from './RecentList'

const RecentScreen = () => {
  const [favorite, favoriteLoading, favoriteError] = useModels({ name: 'tv/airing_today' })

  React.useEffect(() => {
    if (favoriteError) alert(favoriteError)
  }, [favoriteError])

  if (favoriteLoading) return <MainLoading />

  return (
    <MainLayout>
        {/* @ts-expect-error TS(2322) */}
        <FavoriteList list={favorite?.results} />
    </MainLayout>
  )
}

export default RecentScreen
