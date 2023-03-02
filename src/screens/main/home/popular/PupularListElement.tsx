import React from 'react'
import { Image } from 'react-native'
// @ts-expect-error TS(2322)
import { IMAGES_BASE_URL } from '@env'
import { Box, FavouriteIcon, Pressable, Text } from 'native-base'
import { useNavigation } from '@react-navigation/native'

interface IProps {
  item: any;
  index: number;
  list: any[];
}

const PopularListElement = ({ item, index, list }: IProps) => {
  const navigation = useNavigation()
  const rating = Number((item?.vote_average / 2).toFixed(0))
  return (
    <Pressable flexDirection={'column'} width={150} alignItems={'center'} onPress={() => navigation.navigate('Modals' as never, { screen: 'Popular', params: { item, list } } as never)}>
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
    </Pressable>
  )
}

export default PopularListElement
