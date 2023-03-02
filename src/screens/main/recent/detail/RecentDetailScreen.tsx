import React from 'react'
import MainLayout from 'layouts/MainLayout'
import { useModels } from 'hooks/useModels'
import MainLoading from 'components/MainLoading'
import RecentDetailList from './RecentDetailList'

interface IProps {
  route: any;
}

const RecentDetailScreen = ({ route }: IProps) => {
  const { item } = route.params

  const [recentDetail, recentDetailLoading, recentDetailError] = useModels({ name: `tv/${item?.id}/season/1` })

  React.useEffect(() => {
    if (recentDetailError) alert(recentDetailError)
  }, [recentDetailError])

  if (recentDetailLoading) return <MainLoading />

  return (
    <MainLayout>
        {/* @ts-expect-error TS(2322) */}
        <RecentDetailList list={recentDetail?.episodes} />
    </MainLayout>
  )
}

export default RecentDetailScreen
