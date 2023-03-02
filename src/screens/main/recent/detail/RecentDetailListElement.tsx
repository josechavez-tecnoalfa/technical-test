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
    <Box flexDirection={'column'} width={'100%'} alignItems={'center'} padding={10}>
      <Image
        key={item}
        style={styles.posterImage}
        resizeMode="cover"
        source={{ uri: `${IMAGES_BASE_URL}${item.poster_path}` }}
      />
      <Text color={'#fff'} fontSize={30} fontWeight={'bold'}>{item?.name || 'No Name'}</Text>
      <Text color={'#8C8C8C'} >{'3 episodes of 20'}</Text>
      <Text color={'#FFD233'} alignSelf={'flex-end'} marginTop={5}>{'Go to view  >'}</Text>
      <View height={0.25} width={'96%'} backgroundColor={'#8C8C8C'} alignSelf={'center'} marginTop={5}/>
    </Box>
  )
}

const styles = StyleSheet.create({
  posterImage: { width: '100%', height: 300, borderRadius: 10 },
  ratingIcon: { margin: 2, marginTop: 10 }
})

export default RecentListElement
