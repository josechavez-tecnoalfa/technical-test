import React from 'react'
import { Image } from 'react-native'
// @ts-expect-error TS(2322)
import { IMAGES_BASE_URL } from '@env'
import { Box, FavouriteIcon, Text } from 'native-base'

interface IProps {
  item: any;
  index: number;
}

const PopularListElement = ({ item, index }: IProps) => {
  const rating = Number((item?.vote_average / 2).toFixed(0))
  return (
    <Box flexDirection={'column'} width={150} alignItems={'center'}>
      <Image
        key={item}
        style={{ width: 120, height: 200, borderRadius: 20 }}
        resizeMode="cover"
        source={{ uri: `${IMAGES_BASE_URL}${item.poster_path}` }}
      />
      <Text color={'#fff'}>{item?.name || 'No Name'}</Text>
      <Box flexDirection={'row'}>
        {Array(rating).fill('').map((_, i) => <FavouriteIcon color={'#FFD233'} key={i} style={{ margin: 2 }} />)}
      </Box>
    </Box>
  )
}

export default PopularListElement
