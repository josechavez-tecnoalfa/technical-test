import React from 'react'
import MainLayout from 'layouts/MainLayout'
import { useModels } from 'hooks/useModels'
import MainLoading from 'components/MainLoading'
import RecentList from './RecentList'

const RecentScreen = () => {
  const [recent, recentLoading, recentError] = useModels({ name: 'tv/airing_today' })

  React.useEffect(() => {
    if (recentError) alert(recentError)
  }, [recentError])

  if (recentLoading) return <MainLoading />

  return (
    <MainLayout>
        {/* @ts-expect-error TS(2322) */}
        <RecentList list={recent?.results} />
    </MainLayout>
  )
}

export default RecentScreen
