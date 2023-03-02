import React from 'react'
import { Box, Text, View } from 'native-base'
import { StyleSheet } from 'react-native'
import MainLayout from 'layouts/MainLayout'
import { useModels } from 'hooks/useModels'
import MainLoading from 'components/MainLoading'
import ScrollableView from 'components/ScrollableView'
import PopularList from './popular/PopularList'
import RecommendedList from './recommended/RecommendedList'

const HomeScreen = () => {
  const [popular, popularLoading, popularError] = useModels({ name: 'tv/popular' })
  const [recommended, recommendedLoading, recommendedError] = useModels({ name: 'tv/top_rated' })

  React.useEffect(() => {
    if (popularError) alert(popularError)
    if (recommendedError) alert(recommendedError)
  }, [popularError, recommendedError])

  if (popularLoading || recommendedLoading) return <MainLoading />

  return (
    <MainLayout>
      <ScrollableView style={{ flex: 1 }} >
        <Box height={380}>
            <Text style={styles.heading}>Popular</Text>
            {/* @ts-expect-error TS(2322) */}
            <PopularList list={popular?.results} />
            <Text style={styles.seeAllText}>{'See All  >'}</Text>
        </Box>
        <View height={0.25} width={'96%'} backgroundColor={'#8C8C8C'} alignSelf={'center'}/>
        <Box>
            <Text style={styles.heading}>Recommended</Text>
            {/* @ts-expect-error TS(2322) */}
            <RecommendedList list={recommended?.results} />
        </Box>
      </ScrollableView>
    </MainLayout>
  )
}

const styles = StyleSheet.create({
  heading: { color: '#fff', margin: 20, fontSize: 20, fontWeight: 'bold' },
  seeAllText: { color: '#FFD233', margin: 20, fontSize: 14, alignSelf: 'flex-end' }
})

export default HomeScreen
