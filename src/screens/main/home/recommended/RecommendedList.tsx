import React from 'react'
import { FlatList } from 'native-base'

import RecommendedListElement from './RecommendedListElement'

interface IProps {
  list: any[];
}

const RecommendedList = ({ list }: IProps) => {
  return (
    <FlatList
      data={list || []}
      renderItem={({ item, index }) => <RecommendedListElement item={item} index={index} />}
      scrollEnabled={false}
    />
  )
}

export default RecommendedList
