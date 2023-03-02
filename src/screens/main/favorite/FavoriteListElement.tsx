import React from 'react'
import { Image, StyleSheet } from 'react-native'
// @ts-expect-error TS(2322)
import { IMAGES_BASE_URL } from '@env'
import { Box, Button, FavouriteIcon, Text } from 'native-base'

interface IProps {
  item: any;
  index: number;
}

const FavoriteListElement = ({ item, index }: IProps) => {
  const rating = Number((item?.vote_average / 2).toFixed(0))
  return (
    <Box flexDirection={'row'} width={150} alignItems={'center'} margin={4}>
      <Image
        key={item}
        style={styles.posterImage}
        resizeMode="cover"
        source={{ uri: `${IMAGES_BASE_URL}${item.poster_path}` }}
      />
      <Box flexDirection={'column'} margin={5} height={'70%'}>
        <Text color={'#fff'} fontSize={18}>{item?.name || 'No Name'}</Text>
        <Box flexDirection={'row'}>
          {Array(rating).fill('').map((_, i) => <FavouriteIcon color={'#FFD233'} key={i} style={styles.ratingIcon} />)}
        </Box>
        <Text color="#8C8C8C" fontSize={10}>{`IMDb: ${item?.vote_average}`}</Text>
        <Box flexDirection={'row'} >
          <Button style={styles.watchNowButton}><Text color={'#000'} fontSize={8}>Watch Now</Text></Button>
          <FavouriteIcon color={'#ff0000'} style={styles.favoriteIcon}/>
        </Box>
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  posterImage: { width: 120, height: 200, borderRadius: 20 },
  ratingIcon: { margin: 2, marginTop: 10 },
  watchNowButton: { width: 140, height: 30, backgroundColor: '#FFD233', borderRadius: 20, marginTop: 20 },
  favoriteIcon: { alignSelf: 'flex-end', marginLeft: 20 }
})

export default FavoriteListElement
