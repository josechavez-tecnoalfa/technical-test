import React from 'react'
import { Image, StyleSheet } from 'react-native'
// @ts-expect-error TS(2322)
import { IMAGES_BASE_URL } from '@env'
import { Box, Text, View } from 'native-base'

interface IProps {
  item: any;
  index: number;
}

const RecentListElement = ({ item, index }: IProps) => {
  return (
    <Box flexDirection={'column'} width={'100%'} alignItems={'center'} padding={4}>
      <Text color={'#fff'} fontSize={30} fontWeight={'bold'}>{item?.name || 'No Name'}</Text>
      {item?.poster_path
        ? <Image
        key={item}
        style={styles.posterImage}
        resizeMode="cover"
        source={{ uri: `${IMAGES_BASE_URL}${item.poster_path}` }}
      />
        : <View style={styles.posterImage}><Text alignSelf={'center'} fontSize={20} color={'#fff'} marginTop={5}>Sin imágen</Text></View>}
      <Text color={'#8C8C8C'}>Fecha de lanzamiento: {item?.air_date}</Text>
      <Text color={'#FFD233'} alignSelf={'flex-end'} marginTop={5}>{'Watch now  >'}</Text>
      <View height={0.25} width={'96%'} backgroundColor={'#8C8C8C'} alignSelf={'center'} marginTop={5}/>
    </Box>
  )
}

const styles = StyleSheet.create({
  posterImage: { width: '100%', height: 300, borderRadius: 10, backgroundColor: '#8C8C8C' },
  ratingIcon: { margin: 2, marginTop: 10 }
})

export default RecentListElement
